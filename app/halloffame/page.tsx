'use client'
import { supabase } from '../../lib/supabase'
import { useState, useEffect } from 'react'
import "../globals.css";
import "./hof.css";

export default function HallofFame() {

  const [leaderboard, setLeaderboard] = useState([])
  const [loading, setLoading] = useState(true)

   useEffect(() => {
    fetchLeaderboard()
  }, [])

  async function fetchLeaderboard(){
    const { data, error } = await supabase
    .from('Leaderboard')
    .select('name, rounds, created_at')
    .order('rounds', { ascending: true })  // Best scores first 
    .limit(5)

  if (error) {
    console.error('Error fetching:', error)
  } else {
    setLeaderboard(data)
    setLoading(false)
  }
  }
  return (
    <>
    <div className="background-image"></div>
    <div className="halloffame-container">
      <h1>Sigurvegarar bátsins</h1>
      
      {loading ? (
        <p>Hleð...</p>
      ) : leaderboard.length === 0 ? (
        <p>Engir hetjur ennþá!</p>
      ) : (
        <div className="leaderboard">
          {leaderboard.map((entry, index) => (
            <div key={index} className="leaderboard-entry">
              <span className="rank">#{index + 1}</span>
              <span className="name">{entry.name}</span>
              <span className="rounds">
                {entry.rounds === 1 ? '1 sopi' : `${entry.rounds} sopar`}
              </span>
              <span className="time">
                {new Date(entry.created_at).toLocaleDateString('is-IS')}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
    </>
  );
}