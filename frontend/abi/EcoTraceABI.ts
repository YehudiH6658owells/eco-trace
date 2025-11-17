
/*
  This file is auto-generated.
  Command: 'npm run genabi'
*/
export const EcoTraceABI = {
  "abi": [
    {
      "inputs": [],
      "name": "ZamaProtocolUnsupported",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "calculateTotalCarbonScore",
      "outputs": [
        {
          "internalType": "euint32",
          "name": "",
          "type": "bytes32"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "confidentialProtocolId",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getCarbonScore",
      "outputs": [
        {
          "internalType": "euint32",
          "name": "",
          "type": "bytes32"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getSpendAmount",
      "outputs": [
        {
          "internalType": "euint32",
          "name": "",
          "type": "bytes32"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getTravelDistance",
      "outputs": [
        {
          "internalType": "euint32",
          "name": "",
          "type": "bytes32"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "externalEuint32",
          "name": "spendEuint32",
          "type": "bytes32"
        },
        {
          "internalType": "bytes",
          "name": "spendProof",
          "type": "bytes"
        },
        {
          "internalType": "externalEuint32",
          "name": "categoryEuint32",
          "type": "bytes32"
        },
        {
          "internalType": "bytes",
          "name": "categoryProof",
          "type": "bytes"
        }
      ],
      "name": "submitSpendData",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "externalEuint32",
          "name": "distanceEuint32",
          "type": "bytes32"
        },
        {
          "internalType": "bytes",
          "name": "distanceProof",
          "type": "bytes"
        },
        {
          "internalType": "externalEuint32",
          "name": "travelModeEuint32",
          "type": "bytes32"
        },
        {
          "internalType": "bytes",
          "name": "travelModeProof",
          "type": "bytes"
        }
      ],
      "name": "submitTravelData",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ]
} as const;

