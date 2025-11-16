import { execSync } from "child_process";
import * as fs from "fs";
import * as path from "path";

const CONTRACT_NAME = "EcoTrace";

// <root>/contracts
const rel = "../contracts";

// <root>/frontend/abi
const outdir = path.resolve("./abi");

if (!fs.existsSync(outdir)) {
  fs.mkdirSync(outdir);
}

const dir = path.resolve(rel);
const dirname = path.basename(dir);

const line =
  "\n===================================================================\n";

if (!fs.existsSync(dir)) {
  console.error(
    `${line}Unable to locate ${rel}. Expecting <root>/../${dirname}${line}`
  );
  process.exit(1);
}

if (!fs.existsSync(outdir)) {
  console.error(`${line}Unable to locate ${outdir}.${line}`);
  process.exit(1);
}

const deploymentsDir = path.join(dir, "deployments");

function readDeployment(chainName, chainId, contractName, optional) {
  const chainDeploymentDir = path.join(deploymentsDir, chainName);

  if (!fs.existsSync(chainDeploymentDir)) {
    if (optional) {
      console.log(
        `${line}No deployment found for ${chainName} (chainId: ${chainId}). Skipping...${line}`
      );
      return undefined;
    }
    console.error(
      `${line}Unable to locate '${chainDeploymentDir}' directory.\n\n1. Goto '${dirname}' directory\n2. Run 'npx hardhat deploy --network ${chainName}'.${line}`
    );
    process.exit(1);
  }

  const contractJsonPath = path.join(chainDeploymentDir, `${contractName}.json`);
  if (!fs.existsSync(contractJsonPath)) {
    if (optional) {
      console.log(
        `${line}Contract ${CONTRACT_NAME} not deployed on ${chainName} (chainId: ${chainId}). Skipping...${line}`
      );
      return undefined;
    }
    console.error(
      `${line}Contract ${CONTRACT_NAME} not found in '${chainDeploymentDir}'.\n\n1. Goto '${dirname}' directory\n2. Run 'npx hardhat deploy --network ${chainName}'.${line}`
    );
    process.exit(1);
  }

  const jsonString = fs.readFileSync(contractJsonPath, "utf-8");

  const obj = JSON.parse(jsonString);
  obj.chainId = chainId;

  return obj;
}

// Try to read known networks; all optional and skipped if not found
const deployLocalhost = readDeployment("localhost", 31337, CONTRACT_NAME, true);
const deploySepolia = readDeployment("sepolia", 11155111, CONTRACT_NAME, true);

// Collect all deployments (only those that exist)
const deploymentsList = [];
if (deployLocalhost) {
  deploymentsList.push({
    key: "31337",
    address: deployLocalhost.address,
    chainId: 31337,
    chainName: "hardhat",
    abi: deployLocalhost.abi,
  });
}
if (deploySepolia) {
  deploymentsList.push({
    key: "11155111",
    address: deploySepolia.address,
    chainId: 11155111,
    chainName: "sepolia",
    abi: deploySepolia.abi,
  });
}

// Determine ABI from the first available deployment; warn if ABIs differ
let abi = deploymentsList[0]?.abi;
if (!abi) {
  console.warn(`${line}No deployments found. Generating empty ABI and addresses.${line}`);
  abi = [];
} else if (deploymentsList.length > 1) {
  const mismatch = deploymentsList.some((d) => JSON.stringify(d.abi) !== JSON.stringify(abi));
  if (mismatch) {
    console.warn(
      `${line}ABIs differ across networks. Using the ABI from the first available deployment.${line}`
    );
  }
}

const tsCode = `
/*
  This file is auto-generated.
  Command: 'npm run genabi'
*/
export const ${CONTRACT_NAME}ABI = ${JSON.stringify({ abi: abi }, null, 2)} as const;
\n`;

// Generate addresses file with all available deployments
const deploymentsObj = deploymentsList.reduce((acc, d) => {
  acc[d.key] = { address: d.address, chainId: d.chainId, chainName: d.chainName };
  return acc;
}, {});

const addressesEntries = Object.entries(deploymentsObj)
  .map(([chainId, deployment]) => {
    return `  "${chainId}": { address: "${deployment.address}", chainId: ${deployment.chainId}, chainName: "${deployment.chainName}" }`;
  })
  .join(",\n");

const tsAddresses = `
/*
  This file is auto-generated.
  Command: 'npm run genabi'
*/
export const ${CONTRACT_NAME}Addresses = { 
${addressesEntries}
};
`;

console.log(`Generated ${path.join(outdir, `${CONTRACT_NAME}ABI.ts`)}`);
console.log(`Generated ${path.join(outdir, `${CONTRACT_NAME}Addresses.ts`)}`);

fs.writeFileSync(path.join(outdir, `${CONTRACT_NAME}ABI.ts`), tsCode, "utf-8");
fs.writeFileSync(
  path.join(outdir, `${CONTRACT_NAME}Addresses.ts`),
  tsAddresses,
  "utf-8"
);

