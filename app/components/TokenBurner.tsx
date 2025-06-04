import { useState } from 'react';

export default function TokenBurner() {
  const [amount, setAmount] = useState('');
  const [tokenAddress, setTokenAddress] = useState('');
  const [burnHistory, setBurnHistory] = useState([
    { token: 'SOL', amount: '1000', date: '2023-11-01' },
    { token: 'ETH', amount: '50', date: '2023-11-02' }
  ]);

  return (
    <div className="bg-gray-800 rounded-xl p-6">
      <h2 className="text-xl font-semibold mb-6">Token Burner</h2>
      
      <div className="space-y-6">
        {/* Token Input */}
        <div className="bg-gray-900 rounded-lg p-4">
          <label className="block text-gray-400 mb-2">Token Address</label>
          <input
            type="text"
            value={tokenAddress}
            onChange={(e) => setTokenAddress(e.target.value)}
            className="w-full bg-transparent outline-none"
            placeholder="Enter token address"
          />
        </div>

        {/* Amount Input */}
        <div className="bg-gray-900 rounded-lg p-4">
          <label className="block text-gray-400 mb-2">Amount to Burn</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full bg-transparent text-2xl outline-none"
            placeholder="0.0"
          />
        </div>

        {/* Burn Button */}
        <button className="w-full bg-red-600 py-3 rounded-lg font-medium hover:bg-red-700 transition-colors">
          Burn Tokens
        </button>

        {/* Burn History */}
        <div className="mt-8">
          <h3 className="text-lg font-medium mb-4">Burn History</h3>
          <div className="space-y-2">
            {burnHistory.map((burn, index) => (
              <div key={index} className="bg-gray-900 rounded-lg p-4 flex justify-between items-center">
                <div>
                  <span className="text-gray-400">Burned {burn.amount} {burn.token}</span>
                </div>
                <span className="text-gray-500 text-sm">{burn.date}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}