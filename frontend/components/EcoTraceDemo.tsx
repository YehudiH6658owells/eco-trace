"use client";

import { useState } from "react";
import { useFhevm } from "../fhevm/useFhevm";
import { useInMemoryStorage } from "../hooks/useInMemoryStorage";
import { useMetaMaskEthersSigner } from "../hooks/metamask/useMetaMaskEthersSigner";
import { useEcoTrace } from "@/hooks/useEcoTrace";

export const EcoTraceDemo = () => {
  const { storage: fhevmDecryptionSignatureStorage } = useInMemoryStorage();
  const {
    provider,
    chainId,
    accounts,
    isConnected,
    connect,
    ethersSigner,
    ethersReadonlyProvider,
    sameChain,
    sameSigner,
    initialMockChains,
  } = useMetaMaskEthersSigner();

  const {
    instance: fhevmInstance,
    status: fhevmStatus,
    error: fhevmError,
  } = useFhevm({
    provider,
    chainId,
    initialMockChains,
    enabled: true,
  });

  const ecoTrace = useEcoTrace({
    instance: fhevmInstance,
    fhevmDecryptionSignatureStorage,
    eip1193Provider: provider,
    chainId,
    ethersSigner,
    ethersReadonlyProvider,
    sameChain,
    sameSigner,
  });

  // Form states
  const [travelDistance, setTravelDistance] = useState<string>("");
  const [travelMode, setTravelMode] = useState<number>(0);
  const [spendAmount, setSpendAmount] = useState<string>("");
  const [spendCategory, setSpendCategory] = useState<number>(0);

  const buttonClass =
    "inline-flex items-center justify-center rounded-xl bg-green-600 px-6 py-3 font-semibold text-white shadow-sm " +
    "transition-colors duration-200 hover:bg-green-700 active:bg-green-800 " +
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2 " +
    "disabled:opacity-50 disabled:pointer-events-none";

  const inputClass =
    "w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent";

  const cardClass =
    "rounded-lg bg-white border-2 border-green-200 shadow-md p-6 mb-4";

  if (!isConnected) {
    return (
      <div className="mx-auto text-center">
        <div className="text-6xl mb-6">🌿</div>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Connect to MetaMask
        </h2>
        <p className="text-gray-600 mb-6">
          Please connect your MetaMask wallet to start tracking your carbon
          footprint
        </p>
        <button className={buttonClass} onClick={connect}>
          Connect Wallet
        </button>
      </div>
    );
  }

  if (chainId !== undefined && ecoTrace.isDeployed === false) {
    return (
      <div className="mx-auto text-center">
        <div className="text-6xl mb-6">⚠️</div>
        <h2 className="text-2xl font-bold text-red-600 mb-4">
          Contract Not Deployed
        </h2>
        <p className="text-gray-600">
          The EcoTrace contract is not deployed on chainId={chainId}. Please deploy the contract first.
        </p>
      </div>
    );
  }

  return (
    <div className="grid w-full gap-6">
      {/* Header */}
      <div className="col-span-full mx-4 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl p-6 shadow-lg">
        <h2 className="text-3xl font-bold mb-2">Carbon Footprint Tracker</h2>
        <p className="text-green-100">
          Track your carbon emissions privately using FHEVM technology
        </p>
      </div>

      {/* Status Card */}
      <div className={`${cardClass} mx-4`}>
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          Connection Status
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-600">Chain ID</p>
            <p className="font-mono font-semibold">{chainId}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Account</p>
            <p className="font-mono font-semibold text-xs">
              {accounts?.[0]?.slice(0, 6)}...{accounts?.[0]?.slice(-4)}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600">FHEVM Status</p>
            <p className="font-semibold text-green-600">{fhevmStatus}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Contract</p>
            <p className="font-mono font-semibold text-xs">
              {ecoTrace.contractAddress?.slice(0, 6)}...
              {ecoTrace.contractAddress?.slice(-4)}
            </p>
          </div>
        </div>
      </div>

      {/* Carbon Score Card */}
      <div className={`${cardClass} mx-4`}>
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          Your Carbon Score
        </h3>
        <div className="bg-gray-50 rounded-lg p-4 mb-4">
          <p className="text-sm text-gray-600 mb-2">Encrypted Score Handle</p>
          <p className="font-mono text-xs break-all mb-4">
            {ecoTrace.handle || "Not loaded"}
          </p>
          {ecoTrace.isDecrypted && ecoTrace.clear !== undefined && (
            <div className="bg-green-50 border-2 border-green-300 rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-1">Decrypted Score</p>
              <p className="text-3xl font-bold text-green-700">
                {typeof ecoTrace.clear === "bigint"
                  ? (Number(ecoTrace.clear) / 1000).toFixed(2)
                  : ecoTrace.clear}
              </p>
              <p className="text-xs text-gray-500 mt-1">kg CO₂ (×1000)</p>
            </div>
          )}
        </div>
        <div className="flex gap-2">
          <button
            className={buttonClass + " flex-1"}
            disabled={!ecoTrace.canGetCarbonScore}
            onClick={ecoTrace.refreshCarbonScoreHandle}
          >
            {ecoTrace.isRefreshing
              ? "Loading..."
              : "Refresh Carbon Score"}
          </button>
          <button
            className={buttonClass + " flex-1"}
            disabled={!ecoTrace.canDecrypt}
            onClick={ecoTrace.decryptCarbonScoreHandle}
          >
            {ecoTrace.isDecrypting
              ? "Decrypting..."
              : ecoTrace.isDecrypted
                ? "Decrypted"
                : "Decrypt Score"}
          </button>
        </div>
      </div>

      {/* Submit Travel Data */}
      <div className={`${cardClass} mx-4`}>
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          Submit Travel Data
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Distance (km)
            </label>
            <input
              type="number"
              className={inputClass}
              value={travelDistance}
              onChange={(e) => setTravelDistance(e.target.value)}
              placeholder="Enter distance in kilometers"
              min="0"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Travel Mode
            </label>
            <select
              className={inputClass}
              value={travelMode}
              onChange={(e) => setTravelMode(Number(e.target.value))}
            >
              <option value={0}>Walking (0 g CO₂/km)</option>
              <option value={1}>Bicycle (0 g CO₂/km)</option>
              <option value={2}>Bus (89 g CO₂/km)</option>
              <option value={3}>Car (120 g CO₂/km)</option>
              <option value={4}>Plane (285 g CO₂/km)</option>
            </select>
          </div>
          <button
            className={buttonClass + " w-full"}
            disabled={!ecoTrace.canSubmit || !travelDistance}
            onClick={() => {
              const distance = parseInt(travelDistance);
              if (distance > 0) {
                ecoTrace.submitTravelData(distance, travelMode);
                setTravelDistance("");
              }
            }}
          >
            {ecoTrace.isSubmitting
              ? "Submitting..."
              : "Submit Travel Data"}
          </button>
        </div>
      </div>

      {/* Submit Spend Data */}
      <div className={`${cardClass} mx-4`}>
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          Submit Spend Data
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Spend Amount
            </label>
            <input
              type="number"
              className={inputClass}
              value={spendAmount}
              onChange={(e) => setSpendAmount(e.target.value)}
              placeholder="Enter spend amount"
              min="0"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>
            <select
              className={inputClass}
              value={spendCategory}
              onChange={(e) => setSpendCategory(Number(e.target.value))}
            >
              <option value={0}>Food (0.5 kg CO₂/unit)</option>
              <option value={1}>Clothing (2.0 kg CO₂/unit)</option>
              <option value={2}>Electronics (10.0 kg CO₂/unit)</option>
              <option value={3}>Energy (0.8 kg CO₂/unit)</option>
            </select>
          </div>
          <button
            className={buttonClass + " w-full"}
            disabled={!ecoTrace.canSubmit || !spendAmount}
            onClick={() => {
              const spend = parseInt(spendAmount);
              if (spend > 0) {
                ecoTrace.submitSpendData(spend, spendCategory);
                setSpendAmount("");
              }
            }}
          >
            {ecoTrace.isSubmitting
              ? "Submitting..."
              : "Submit Spend Data"}
          </button>
        </div>
      </div>

      {/* Message Display */}
      {ecoTrace.message && (
        <div className="mx-4 bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-800">{ecoTrace.message}</p>
        </div>
      )}
    </div>
  );
};

