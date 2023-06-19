import React, { useState, useEffect } from 'react';
import { getUser } from '../helper/helper';

export default function Leaderboard() {
  const [leaderboardData, setLeaderboardData] = useState([]);

  useEffect(() => {
    fetchLeaderboardData();
  }, []);

  async function fetchLeaderboardData() {
    try {
      const { data } = await getUser({});
      setLeaderboardData(data);
    } catch (error) {
      console.error('Failed to fetch leaderboard data:', error);
    }
  }

  return (
    <div>
      <h1>Leaderboard</h1>
      <table>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Name</th>
            <th>Points</th>
          </tr>
        </thead>
        <tbody>
          {leaderboardData
            .sort((a, b) => b.points - a.points || a.name.localeCompare(b.name))
            .map((player, index) => (
              <tr key={player.id}>
                <td>{index + 1}</td>
                <td>{player.name}</td>
                <td>{player.points}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );  
}
