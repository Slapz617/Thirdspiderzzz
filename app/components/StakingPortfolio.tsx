import { useState, useEffect } from 'react';
import { Connection, PublicKey } from '@solana/web3.js';
import { ethers } from 'ethers';

export default function StakingPortfolio() {
  const [stakingPool, setStakingPool] = useState('SOL');
  const [amount, setAmount] = useState('');
  const [duration, setDuration] = useState(30);
  const [apy, setApy] = useState(0);
  const [tvl, setTvl] = useState(0);

  const calculateRewards = (amount: string, days: number) => {
    const principal = parseFloat(amount) || 0;
    const yearlyRate = apy / 100;
    const dailyRate = yearlyRate / 365;
    const rewards = principal * dailyRate * days;
    return rewards.toFixed(4);
  };

  return (
    <div className="bg-gray-800 rounded-xl p-6">
      <h2 className="text-xl font-semibold mb-6">Staking Portfolio</h2>
      
      <div className="space-y-6">
        {/* Pool Selection */}
        <div className="flex space-x-4">
          <button 
            className={`px-4 py-2 rounded-lg ${stakingPool === 'SOL' ? 'bg-blue-600' : 'bg-gray-700'}`}
            onClick={() => setStakingPool('SOL')}
          >
            Stake SOL
          </button>
          <button 
            className={`px-4 py-2 rounded-lg ${stakingPool === 'ETH' ? 'bg-blue-600' : 'bg-gray-700'}`}
            onClick={() => setStakingPool('ETH')}
          >
            Stake ETH
          </button>
        </div>

        {/* Amount Input */}
        <div className="bg-gray-900 rounded-lg p-4">
          <label className="block text-gray-400 mb-2">Amount to Stake</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full bg-transparent text-2xl outline-none"
            placeholder="0.0"
          />
        </div>

        {/* Duration Selector */}
        <div>
          <label className="block text-gray-400 mb-2">Staking Duration</label>
          <select 
            value={duration}
            onChange={(e) => setDuration(Number(e.target.value))}
            className="w-full bg-gray-900 rounded-lg p-4"
          >
            <option value={30}>30 Days (8% APY)</option>
            <option value={90}>90 Days (12% APY)</option>
            <option value={180}>180 Days (15% APY)</option>
          </select>
        </div>

        {/* Rewards Preview */}
        <div className="bg-gray-900 rounded-lg p-4">
          <h3 className="text-gray-400 mb-2">Estimated Rewards</h3>
          <div className="text-2xl">{calculateRewards(amount, duration)} {stakingPool}</div>
        </div>

        {/* Stake Button */}
        <button className="w-full bg-blue-600 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors">
          Stake Now
        </button>
      </div>
    </div>
  );
}