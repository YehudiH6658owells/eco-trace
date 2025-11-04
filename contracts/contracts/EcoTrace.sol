// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {FHE, euint32, externalEuint32} from "@fhevm/solidity/lib/FHE.sol";
import {ZamaEthereumConfig} from "@fhevm/solidity/config/ZamaConfig.sol";

/// @title EcoTrace - Privacy-Preserving Carbon Footprint Tracking DApp
/// @author EcoTrace Team
/// @notice A DApp that tracks carbon footprint using FHEVM technology
contract EcoTrace is ZamaEthereumConfig {
    // Mapping from user address to their encrypted carbon score
    mapping(address => euint32) private _carbonScores;
    
    // Mapping from user address to their encrypted travel distance (in km)
    mapping(address => euint32) private _travelDistances;
    
    // Mapping from user address to their encrypted spend amount
    mapping(address => euint32) private _spendAmounts;

    // Carbon emission factors (multiplied by 1000 to support decimal operations in euint32)
    // Travel modes: 0=walking, 1=bicycle, 2=bus, 3=car, 4=plane
    // Factors in kg CO2 per km: walking=0, bicycle=0, bus=89, car=120, plane=285
    // We'll use: 0, 0, 89, 120, 285 (multiplied by 1000 = 0, 0, 89000, 120000, 285000)
    uint32 private constant WALKING_FACTOR = 0;
    uint32 private constant BICYCLE_FACTOR = 0;
    uint32 private constant BUS_FACTOR = 89000;
    uint32 private constant CAR_FACTOR = 120000;
    uint32 private constant PLANE_FACTOR = 285000;
    
    // Spend category factors (kg CO2 per unit spend, multiplied by 1000)
    // Categories: 0=food, 1=clothing, 2=electronics, 3=energy
    // Factors: food=0.5, clothing=2.0, electronics=10.0, energy=0.8
    // Multiplied by 1000: 500, 2000, 10000, 800
    uint32 private constant FOOD_FACTOR = 500;
    uint32 private constant CLOTHING_FACTOR = 2000;
    uint32 private constant ELECTRONICS_FACTOR = 10000;
    uint32 private constant ENERGY_FACTOR = 800;

    /// @notice Get the current carbon score for a user
    /// @return The encrypted carbon score
    function getCarbonScore() external view returns (euint32) {
        return _carbonScores[msg.sender];
    }

    /// @notice Get the travel distance for a user
    /// @return The encrypted travel distance
    function getTravelDistance() external view returns (euint32) {
        return _travelDistances[msg.sender];
    }

    /// @notice Get the spend amount for a user
    /// @return The encrypted spend amount
    function getSpendAmount() external view returns (euint32) {
        return _spendAmounts[msg.sender];
    }

    /// @notice Submit travel data and calculate carbon footprint
    /// @param distanceEuint32 The encrypted distance in km
    /// @param distanceProof The input proof for distance
    /// @param travelModeEuint32 The encrypted travel mode (0=walking, 1=bicycle, 2=bus, 3=car, 4=plane)
    /// @param travelModeProof The input proof for travel mode
    /// @dev This function calculates carbon footprint based on travel mode and distance
    function submitTravelData(
        externalEuint32 distanceEuint32,
        bytes calldata distanceProof,
        externalEuint32 travelModeEuint32,
        bytes calldata travelModeProof
    ) external {
        euint32 encryptedDistance = FHE.fromExternal(distanceEuint32, distanceProof);
        euint32 encryptedMode = FHE.fromExternal(travelModeEuint32, travelModeProof);

        // Calculate carbon emission based on travel mode using conditional selection
        // Select the appropriate factor based on encrypted mode value
        // Mode: 0=walking, 1=bicycle, 2=bus, 3=car, 4=plane
        
        // Check if mode == 0 (walking)
        euint32 modeFactor = FHE.select(
            FHE.eq(encryptedMode, FHE.asEuint32(0)),
            FHE.asEuint32(WALKING_FACTOR),
            FHE.asEuint32(0) // placeholder
        );
        
        // Check if mode == 1 (bicycle)
        modeFactor = FHE.select(
            FHE.eq(encryptedMode, FHE.asEuint32(1)),
            FHE.asEuint32(BICYCLE_FACTOR),
            modeFactor
        );
        
        // Check if mode == 2 (bus)
        modeFactor = FHE.select(
            FHE.eq(encryptedMode, FHE.asEuint32(2)),
            FHE.asEuint32(BUS_FACTOR),
            modeFactor
        );
        
        // Check if mode == 3 (car)
        modeFactor = FHE.select(
            FHE.eq(encryptedMode, FHE.asEuint32(3)),
            FHE.asEuint32(CAR_FACTOR),
            modeFactor
        );
        
        // Check if mode == 4 (plane)
        modeFactor = FHE.select(
            FHE.eq(encryptedMode, FHE.asEuint32(4)),
            FHE.asEuint32(PLANE_FACTOR),
            modeFactor
        );
        
        // Calculate emission: distance * factor
        euint32 travelEmission = FHE.mul(encryptedDistance, modeFactor);
        
        // Update travel distance
        _travelDistances[msg.sender] = FHE.add(_travelDistances[msg.sender], encryptedDistance);
        
        // Update carbon score
        _carbonScores[msg.sender] = FHE.add(_carbonScores[msg.sender], travelEmission);

        // Allow decryption
        FHE.allowThis(_carbonScores[msg.sender]);
        FHE.allow(_carbonScores[msg.sender], msg.sender);
        FHE.allowThis(_travelDistances[msg.sender]);
        FHE.allow(_travelDistances[msg.sender], msg.sender);
    }

    /// @notice Submit spend data and calculate carbon footprint
    /// @param spendEuint32 The encrypted spend amount
    /// @param spendProof The input proof for spend amount
    /// @param categoryEuint32 The encrypted category (0=food, 1=clothing, 2=electronics, 3=energy)
    /// @param categoryProof The input proof for category
    /// @dev This function calculates carbon footprint based on spend category and amount
    function submitSpendData(
        externalEuint32 spendEuint32,
        bytes calldata spendProof,
        externalEuint32 categoryEuint32,
        bytes calldata categoryProof
    ) external {
        euint32 encryptedSpend = FHE.fromExternal(spendEuint32, spendProof);
        euint32 encryptedCategory = FHE.fromExternal(categoryEuint32, categoryProof);

        // Calculate carbon emission based on spend category using conditional selection
        // Select the appropriate factor based on encrypted category value
        // Category: 0=food, 1=clothing, 2=electronics, 3=energy
        
        // Check if category == 0 (food)
        euint32 categoryFactor = FHE.select(
            FHE.eq(encryptedCategory, FHE.asEuint32(0)),
            FHE.asEuint32(FOOD_FACTOR),
            FHE.asEuint32(0) // placeholder
        );
        
        // Check if category == 1 (clothing)
        categoryFactor = FHE.select(
            FHE.eq(encryptedCategory, FHE.asEuint32(1)),
            FHE.asEuint32(CLOTHING_FACTOR),
            categoryFactor
        );
        
        // Check if category == 2 (electronics)
        categoryFactor = FHE.select(
            FHE.eq(encryptedCategory, FHE.asEuint32(2)),
            FHE.asEuint32(ELECTRONICS_FACTOR),
            categoryFactor
        );
        
        // Check if category == 3 (energy)
        categoryFactor = FHE.select(
            FHE.eq(encryptedCategory, FHE.asEuint32(3)),
            FHE.asEuint32(ENERGY_FACTOR),
            categoryFactor
        );
        
        // Calculate emission: spend * factor
        euint32 spendEmission = FHE.mul(encryptedSpend, categoryFactor);
        
        // Update spend amount
        _spendAmounts[msg.sender] = FHE.add(_spendAmounts[msg.sender], encryptedSpend);
        
        // Update carbon score
        _carbonScores[msg.sender] = FHE.add(_carbonScores[msg.sender], spendEmission);

        // Allow decryption
        FHE.allowThis(_carbonScores[msg.sender]);
        FHE.allow(_carbonScores[msg.sender], msg.sender);
        FHE.allowThis(_spendAmounts[msg.sender]);
        FHE.allow(_spendAmounts[msg.sender], msg.sender);
    }

    /// @notice Calculate total carbon score (combines travel and spend)
    /// @dev This is a view function that returns the current total carbon score
    function calculateTotalCarbonScore() external view returns (euint32) {
        return _carbonScores[msg.sender];
    }
}


