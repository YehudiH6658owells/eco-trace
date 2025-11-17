import { JsonRpcProvider } from "ethers";

const RPC_URL = "http://localhost:8545";

async function checkHardhatNode() {
  try {
    const provider = new JsonRpcProvider(RPC_URL);
    await provider.getBlockNumber();
    console.log("Hardhat node is running");
    process.exit(0);
  } catch (error) {
    console.log("Hardhat node is not running");
    process.exit(1);
  }
}

checkHardhatNode();

