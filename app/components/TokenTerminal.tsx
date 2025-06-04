import { useState } from 'react';

export default function TokenTerminal() {
  const [inputAmount, setInputAmount] = useState('');
  const [outputAmount, setOutputAmount] = useState('');
  
  return (
    <div className="bg-gray-800 rounded-xl p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Trade Tokens</h2>
        <div className="flex space-x-2">
          <button className="bg-gray-700 px-3 py-1 rounded-lg text-sm hover:bg-gray-600 transition-colors">
            Solana
          </button>
          <button className="bg-gray-700 px-3 py-1 rounded-lg text-sm hover:bg-gray-600 transition-colors">
            Ethereum
          </button>
        </div>
      </div>
      
      {/* Input Token */}
      <div className="bg-gray-900 rounded-lg p-4 mb-4">
        <div className="flex justify-between mb-2">
          <span className="text-gray-400">From</span>
          <span className="text-gray-400">Balance: 0.00</span>
        </div>
        <div className="flex items-center">
          <input
            type="number"
            value={inputAmount}
            onChange={(e) => setInputAmount(e.target.value)}
            placeholder="0.0"
            className="bg-transparent text-2xl outline-none flex-1"
          />
          <button className="bg-gray-700 px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors">
            Select Token
          </button>
        </div>
      </div>
      
      {/* Swap Button */}
      <button className="bg-gray-700 p-2 rounded-full mx-auto block mb-4 hover:bg-gray-600 transition-colors">
        ↓
      </button>
      
      {/* Output Token */}
      <div className="bg-gray-900 rounded-lg p-4 mb-6">
        <div className="flex justify-between mb-2">
          <span className="text-gray-400">To</span>
          <span className="text-gray-400">Balance: 0.00</span>
        </div>
        <div className="flex items-center">
          <input
            type="number"
            value={outputAmount}
            onChange={(e) => setOutputAmount(e.target.value)}
            placeholder="0.0"
            className="bg-transparent text-2xl outline-none flex-1"
            readOnly
          />
          <button className="bg-gray-700 px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors">
            Select Token
          </button>
        </div>
      </div>
      
      {/* Trade Button */}
      <button className="w-full bg-blue-600 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors">
        Connect Wallet to Trade
      </button>
    </div>
  );
}