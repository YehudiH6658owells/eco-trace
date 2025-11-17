export type FhevmInstanceConfig = {
  aclContractAddress: `0x${string}`;
  kmsContractAddress: `0x${string}`;
  inputVerifierContractAddress: `0x${string}`;
  chainId: number;
  network?: unknown;
  publicKey?: { id: string | null; data: Uint8Array | null } | null;
  publicParams?: {
    "2048": { publicParamsId: string; publicParams: Uint8Array };
  } | null;
  [key: string]: unknown;
};

export type FhevmInstance = {
  // Encryption
  createEncryptedInput: (
    contractAddress: `0x${string}`,
    userAddress: `0x${string}`
  ) => {
    add32: (value: number) => void;
    encrypt: () => Promise<{
      handles: string[];
      inputProof: string;
    }>;
  };

  // Decryption
  userDecrypt: (
    pairs: { handle: string; contractAddress: `0x${string}` }[],
    privateKey: string,
    publicKey: string,
    signature: string,
    contractAddresses: `0x${string}`[],
    userAddress: `0x${string}`,
    startTimestamp: number,
    durationDays: number
  ) => Promise<Record<string, unknown>>;

  // Keys
  generateKeypair: () => { publicKey: string; privateKey: string };
  getPublicKey: () => { publicKeyId: string; publicKey: Uint8Array };
  getPublicParams: (
    bits: 2048
  ) => { publicParamsId: string; publicParams: Uint8Array };

  // EIP712
  createEIP712: (
    publicKey: string,
    contractAddresses: `0x${string}`[],
    startTimestamp: number,
    durationDays: number
  ) => {
    domain: {
      chainId: number;
      name: string;
      verifyingContract: `0x${string}`;
      version: string;
    };
    message: unknown;
    primaryType: string;
    types: Record<
      string,
      {
        name: string;
        type: string;
      }[]
    >;
  };
};

export type FhevmDecryptionSignatureType = {
  publicKey: string;
  privateKey: string;
  signature: string;
  startTimestamp: number; // Unix timestamp in seconds
  durationDays: number;
  userAddress: `0x${string}`;
  contractAddresses: `0x${string}`[];
  eip712: EIP712Type;
};

export type EIP712Type = {
  domain: {
    chainId: number;
    name: string;
    verifyingContract: `0x${string}`;
    version: string;
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  message: any;
  primaryType: string;
  types: {
    [key: string]: {
      name: string;
      type: string;
    }[];
  };
};

