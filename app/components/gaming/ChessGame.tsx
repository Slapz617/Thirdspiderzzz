import { useState } from 'react';

export default function ChessGame() {
  const [wager, setWager] = useState('');
  const [timeControl, setTimeControl] = useState('5');

  return (
    <div className="bg-gray-800 rounded-xl p-6">
      <h2 className="text-xl font-semibold mb-6">Chess Arena</h2>
      
      <div className="space-y-6">
        {/* Wager Input */}
        <div className="bg-gray-900 rounded-lg p-4">
          <label className="block text-gray-400 mb-2">Wager Amount</label>
          <input
            type="number"
            value={wager}
            onChange={(e) => setWager(e.target.value)}
            className="w-full bg-transparent text-2xl outline-none"
            placeholder="0.0 SOL"
          />
        </div>

        {/* Time Control */}
        <div>
          <label className="block text-gray-400 mb-2">Time Control</label>
          <select 
            value={timeControl}
            onChange={(e) => setTimeControl(e.target.value)}
            className="w-full bg-gray-900 rounded-lg p-4"
          >
            <option value="1">1 min Bullet</option>
            <option value="3">3 min Blitz</option>
            <option value="5">5 min Blitz</option>
            <option value="10">10 min Rapid</option>
          </select>
        </div>

        {/* Game Board Placeholder */}
        <div className="aspect-square bg-gray-900 rounded-lg"></div>

        {/* Action Button */}
        <button className="w-full bg-blue-600 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors">
          Find Match
        </button>
      </div>
    </div>
  );
}