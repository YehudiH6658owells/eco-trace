export default function HowItWorks() {
  return (
    <main className="">
      <div className="flex flex-col gap-8 items-center sm:items-start w-full px-3 md:px-0">
        <div className="w-full max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-green-800 mb-4">
              How Carbon Footprint Calculation Works
            </h1>
            <p className="text-lg text-gray-600">
              Understanding the privacy-preserving carbon footprint tracking system
            </p>
          </div>

          {/* Overview Section */}
          <section className="bg-white rounded-lg border-2 border-green-200 shadow-md p-6 mb-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Overview</h2>
            <p className="text-gray-700 mb-4">
              EcoTrace uses Fully Homomorphic Encryption (FHE) technology to calculate and track
              your carbon footprint while keeping your data private. All calculations are performed
              on encrypted data, ensuring that your personal information remains confidential
              throughout the process.
            </p>
            <p className="text-gray-700">
              The system calculates your total carbon footprint by combining emissions from travel
              and spending activities. Each activity type has a specific emission factor that
              determines how much CO₂ is produced per unit of activity.
            </p>
          </section>

          {/* Travel Calculation Section */}
          <section className="bg-white rounded-lg border-2 border-green-200 shadow-md p-6 mb-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              1. Travel Carbon Footprint Calculation
            </h2>
            <p className="text-gray-700 mb-4">
              Travel emissions are calculated based on the distance traveled and the mode of
              transportation. Different transportation methods have different carbon emission factors
              per kilometer.
            </p>

            <div className="bg-gray-50 rounded-lg p-4 mb-4">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Formula:</h3>
              <div className="bg-white p-4 rounded border border-gray-300 font-mono text-sm">
                Travel Emission = Distance (km) × Emission Factor (kg CO₂/km)
              </div>
            </div>

            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                Emission Factors by Travel Mode:
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-green-100">
                      <th className="border border-gray-300 px-4 py-2 text-left">Travel Mode</th>
                      <th className="border border-gray-300 px-4 py-2 text-left">
                        Emission Factor
                      </th>
                      <th className="border border-gray-300 px-4 py-2 text-left">Example</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2">Walking</td>
                      <td className="border border-gray-300 px-4 py-2">0 kg CO₂/km</td>
                      <td className="border border-gray-300 px-4 py-2">5 km = 0 kg CO₂</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-4 py-2">Bicycle</td>
                      <td className="border border-gray-300 px-4 py-2">0 kg CO₂/km</td>
                      <td className="border border-gray-300 px-4 py-2">10 km = 0 kg CO₂</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2">Bus</td>
                      <td className="border border-gray-300 px-4 py-2">89 g CO₂/km</td>
                      <td className="border border-gray-300 px-4 py-2">
                        20 km = 1.78 kg CO₂
                      </td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-4 py-2">Car</td>
                      <td className="border border-gray-300 px-4 py-2">120 g CO₂/km</td>
                      <td className="border border-gray-300 px-4 py-2">
                        50 km = 6.0 kg CO₂
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2">Plane</td>
                      <td className="border border-gray-300 px-4 py-2">285 g CO₂/km</td>
                      <td className="border border-gray-300 px-4 py-2">
                        1000 km = 285 kg CO₂
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
              <p className="text-sm text-blue-800">
                <strong>Note:</strong> All calculations are performed on encrypted data. The
                system uses FHEVM technology to select the appropriate emission factor based on your
                encrypted travel mode value, ensuring privacy while maintaining calculation
                accuracy.
              </p>
            </div>
          </section>

          {/* Spending Calculation Section */}
          <section className="bg-white rounded-lg border-2 border-green-200 shadow-md p-6 mb-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              2. Spending Carbon Footprint Calculation
            </h2>
            <p className="text-gray-700 mb-4">
              Spending emissions are calculated based on the amount spent and the category of
              purchase. Different product categories have different carbon emission factors per
              unit of spending.
            </p>

            <div className="bg-gray-50 rounded-lg p-4 mb-4">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Formula:</h3>
              <div className="bg-white p-4 rounded border border-gray-300 font-mono text-sm">
                Spending Emission = Amount Spent (units) × Category Factor (kg CO₂/unit)
              </div>
            </div>

            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                Emission Factors by Category:
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-green-100">
                      <th className="border border-gray-300 px-4 py-2 text-left">Category</th>
                      <th className="border border-gray-300 px-4 py-2 text-left">
                        Emission Factor
                      </th>
                      <th className="border border-gray-300 px-4 py-2 text-left">Example</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2">Food</td>
                      <td className="border border-gray-300 px-4 py-2">0.5 kg CO₂/unit</td>
                      <td className="border border-gray-300 px-4 py-2">
                        100 units = 50 kg CO₂
                      </td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-4 py-2">Clothing</td>
                      <td className="border border-gray-300 px-4 py-2">2.0 kg CO₂/unit</td>
                      <td className="border border-gray-300 px-4 py-2">
                        50 units = 100 kg CO₂
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2">Electronics</td>
                      <td className="border border-gray-300 px-4 py-2">10.0 kg CO₂/unit</td>
                      <td className="border border-gray-300 px-4 py-2">
                        10 units = 100 kg CO₂
                      </td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-4 py-2">Energy</td>
                      <td className="border border-gray-300 px-4 py-2">0.8 kg CO₂/unit</td>
                      <td className="border border-gray-300 px-4 py-2">
                        200 units = 160 kg CO₂
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
              <p className="text-sm text-blue-800">
                <strong>Note:</strong> Similar to travel calculations, spending emissions are
                computed on encrypted data. The system uses conditional selection in the encrypted
                domain to choose the correct category factor without revealing your spending
                category.
              </p>
            </div>
          </section>

          {/* Total Calculation Section */}
          <section className="bg-white rounded-lg border-2 border-green-200 shadow-md p-6 mb-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              3. Total Carbon Footprint
            </h2>
            <p className="text-gray-700 mb-4">
              Your total carbon footprint is the cumulative sum of all travel and spending
              emissions. Each time you submit new travel or spending data, the corresponding
              emission is calculated and added to your total carbon score.
            </p>

            <div className="bg-gray-50 rounded-lg p-4 mb-4">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Formula:</h3>
              <div className="bg-white p-4 rounded border border-gray-300 font-mono text-sm">
                Total Carbon Score = Σ (All Travel Emissions) + Σ (All Spending Emissions)
              </div>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
              <p className="text-sm text-yellow-800">
                <strong>Accumulation:</strong> The carbon score is continuously updated as you add
                new activities. For example, if you travel 50 km by car (6.0 kg CO₂) and then spend
                100 units on food (50 kg CO₂), your total carbon score becomes 56 kg CO₂.
              </p>
            </div>

            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Example Calculation:</h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="space-y-2 text-sm">
                  <div>
                    <strong>Activity 1:</strong> Travel 25 km by bus
                    <br />
                    <span className="ml-4">Emission = 25 × 0.089 = 2.225 kg CO₂</span>
                  </div>
                  <div>
                    <strong>Activity 2:</strong> Travel 100 km by car
                    <br />
                    <span className="ml-4">Emission = 100 × 0.120 = 12.0 kg CO₂</span>
                  </div>
                  <div>
                    <strong>Activity 3:</strong> Spend 50 units on clothing
                    <br />
                    <span className="ml-4">Emission = 50 × 2.0 = 100 kg CO₂</span>
                  </div>
                  <div className="pt-2 border-t border-gray-300 mt-2">
                    <strong>Total Carbon Score:</strong> 2.225 + 12.0 + 100 = 114.225 kg CO₂
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Privacy Section */}
          <section className="bg-white rounded-lg border-2 border-green-200 shadow-md p-6 mb-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Privacy & Encryption</h2>
            <p className="text-gray-700 mb-4">
              All calculations in EcoTrace are performed using Fully Homomorphic Encryption (FHE).
              This means:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
              <li>
                Your data (distances, travel modes, spending amounts, categories) is encrypted before
                being sent to the blockchain
              </li>
              <li>
                All calculations happen on encrypted data without decrypting it first
              </li>
              <li>
                Only you can decrypt and view your final carbon score
              </li>
              <li>
                The blockchain stores only encrypted values, protecting your privacy
              </li>
            </ul>
            <div className="bg-green-50 border-l-4 border-green-400 p-4">
              <p className="text-sm text-green-800">
                <strong>FHEVM Technology:</strong> The system uses FHEVM (Fully Homomorphic
                Encryption Virtual Machine) to enable computation on encrypted data. This allows
                conditional selection (choosing different factors based on encrypted values) and
                arithmetic operations (addition, multiplication) while maintaining complete privacy.
              </p>
            </div>
          </section>

          {/* Precision Section */}
          <section className="bg-white rounded-lg border-2 border-green-200 shadow-md p-6 mb-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Numerical Precision</h2>
            <p className="text-gray-700 mb-4">
              Since the system uses integer types (euint32) for encrypted values, all decimal
              numbers are multiplied by 1000 to maintain precision. This means:
            </p>
            <div className="bg-gray-50 rounded-lg p-4 mb-4">
              <ul className="list-disc list-inside space-y-2 text-sm text-gray-700">
                <li>0.5 kg CO₂/unit is stored as 500 (×1000)</li>
                <li>89 g CO₂/km = 0.089 kg CO₂/km is stored as 89 (×1000)</li>
                <li>120 g CO₂/km = 0.120 kg CO₂/km is stored as 120 (×1000)</li>
                <li>When displayed, values are divided by 1000 to show the actual kg CO₂</li>
              </ul>
            </div>
            <p className="text-gray-700">
              This scaling factor allows the system to handle decimal emission factors while working
              with integer-based encrypted types.
            </p>
          </section>

          {/* Back Link */}
          <div className="text-center mt-8">
            <a
              href="/"
              className="inline-flex items-center justify-center rounded-xl bg-green-600 px-6 py-3 font-semibold text-white shadow-sm transition-colors duration-200 hover:bg-green-700 active:bg-green-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
            >
              ← Back to Dashboard
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}

