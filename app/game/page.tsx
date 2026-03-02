'use client'
import { supabase } from "../../lib/supabase";
import { useState, useEffect } from "react";
import Card from "../../components/Card";
import { generateDeck } from "../../utils/deck";
import { getRankValue } from "../../utils/deck";
import './game.css';
import "../globals.css";





export default function Game() {

  // Player name to save to supabase
  const [playerName, setPlayerName] = useState("")

  // Show the input for the name
  const [showNameInput, setShowNameInput] = useState(false);

  // How many sips he took
  const [failedAttempts, setFailedAttempts] = useState(0);

  // Card animation
  const [isAnimating, setIsAnimating] = useState(false);

  // Messages to users
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const [deck, setDeck] = useState([])
  const [revealedCards, setRevealedCards] = useState([]);
  const [currentRound, setCurrentRound] = useState(1);

  // Set the deck
  useEffect(() => {
    const newDeck = generateDeck();
    setDeck(newDeck);
  }, [])

  // save player do database using state
  async function savePlayer(){
    let userIP = 'unknown';
    try {
      const ipResponse = await fetch('https://api.ipify.org?format=json');
      const ipData = await ipResponse.json();
      userIP = ipData.ip;
    } catch (error) {
      console.log('Could not get IP');
    }
    const { data, error } = await supabase
    .from('Leaderboard')
    .insert([
      { 
        name: playerName,
        rounds: failedAttempts,
        ip_address: userIP,
        created_at: new Date().toISOString()
      }
    ])
    if (error) {
    } else {
      setShowNameInput(false);
      setPlayerName("");
      setFailedAttempts(0);
      setModalMessage("Skráning tókst! 🎉");
      setShowModal(true);
    }
  }

  // handle the empty deck
  function checkDeckEmpty() {
  if (deck.length === 0) {
    setModalMessage("Kláraðu drykkinn! 🍻");
    setShowModal(true);
    return true;
  }
  return false;
}

   function handleGuess(color) {
    if (checkDeckEmpty() || isAnimating) return;
  
    setIsAnimating(true); 
    const topCard = deck[0]
    const cardIsRed = topCard.suit === 'H' || topCard.suit === 'D';
    let isCorrect = false;

    if(color == "red" && cardIsRed){
      isCorrect = true;
    } 
    else if(color == "black" && !cardIsRed){
      isCorrect = true;
    }
    


    setTimeout(() => {
      if (isCorrect) {
        setCurrentRound(currentRound + 1);
      } else {
        setModalMessage("Taktu sopa !🍺");
        setFailedAttempts(failedAttempts + 1);
        setShowModal(true);
        setCurrentRound(1);
        setRevealedCards([]);
      }
      setIsAnimating(false);
    }, 600);

    const flippedCard = { ...topCard, faceUp: true };

    setRevealedCards([...revealedCards, flippedCard]);
    setDeck(deck.slice(1));

  }

  function handleHigherGuess() {
    if (checkDeckEmpty() || isAnimating) return;
  
    setIsAnimating(true); 
    
    const topCard = deck[0];
    const prevCard = revealedCards[0];

    const topValue = getRankValue(topCard.rank);
    const prevValue = getRankValue(prevCard.rank);

    const flippedCard = { ...topCard, faceUp: true };
      setRevealedCards([...revealedCards, flippedCard]);
      setDeck(deck.slice(1))

    setTimeout(() => {
      if(topValue > prevValue){
        setCurrentRound(currentRound + 1);
      } else {
        setModalMessage("Taktu sopa !🍺");
        setFailedAttempts(failedAttempts + 1);
        setShowModal(true);
        setCurrentRound(1);
        setRevealedCards([]);
      }
      setIsAnimating(false);
    }, 600);
  }

  function handleLowerGuess() {
    if (checkDeckEmpty() || isAnimating) return;
  
    setIsAnimating(true); 

    const topCard = deck[0];
    const prevCard = revealedCards[0];

    const minValue = getRankValue(topCard.rank);
    const prevValue = getRankValue(prevCard.rank);

    const flippedCard = { ...topCard, faceUp: true };
      setRevealedCards([...revealedCards, flippedCard]);
      setDeck(deck.slice(1))

    
    setTimeout(() => {
      if(minValue < prevValue){
        setCurrentRound(currentRound + 1);
      } else {
        setModalMessage("Taktu sopa !🍺");
        setFailedAttempts(failedAttempts + 1);
        setShowModal(true);
        setCurrentRound(1);
        setRevealedCards([]);
      }
      setIsAnimating(false);
    }, 600);
  }

  function handleInbetween() {
    if (checkDeckEmpty() || isAnimating) return;
  
    setIsAnimating(true); 

    const topCard = deck[0];
    const colorCard = revealedCards[0];
    const hiloCard = revealedCards[1];

    const topValue = getRankValue(topCard.rank);
    const colorValue = getRankValue(colorCard.rank);
    const hiloValue = getRankValue(hiloCard.rank);

    const minValue = Math.min(colorValue, hiloValue);
    const maxValue = Math.max(colorValue, hiloValue);

    const flippedCard = { ...topCard, faceUp: true };
      setRevealedCards([...revealedCards, flippedCard]);
      setDeck(deck.slice(1))

    setTimeout(() => {
      if(topValue > minValue && topValue < maxValue){
        setCurrentRound(currentRound + 1);
      } else {
        setModalMessage("Taktu sopa !🍺");
        setFailedAttempts(failedAttempts + 1);
        setShowModal(true);
        setCurrentRound(1);
        setRevealedCards([]);
      }
      setIsAnimating(false);
    }, 600);

  }

  function handleOutside() {
    if (checkDeckEmpty() || isAnimating) return;
  
    setIsAnimating(true); 

    const topCard = deck[0];
    const colorCard = revealedCards[0];
    const hiloCard = revealedCards[1];

    const topValue = getRankValue(topCard.rank);
    const colorValue = getRankValue(colorCard.rank);
    const hiloValue = getRankValue(hiloCard.rank);

    const minValue = Math.min(colorValue, hiloValue);
    const maxValue = Math.max(colorValue, hiloValue);

    const flippedCard = { ...topCard, faceUp: true };
      setRevealedCards([...revealedCards, flippedCard]);
      setDeck(deck.slice(1))

    setTimeout(() => {
      if(topValue < minValue || topValue > maxValue){
        setCurrentRound(currentRound + 1);
      } else {
        setModalMessage("Taktu sopa !🍺");
        setFailedAttempts(failedAttempts + 1);
        setShowModal(true);
        setCurrentRound(1);
        setRevealedCards([]);
      }
      setIsAnimating(false);
    }, 600);
  }

  function suitGuess(suit){
    if (checkDeckEmpty() || isAnimating) return;
  
    setIsAnimating(true); 

    const topCard = deck[0];

    const flippedCard = { ...topCard, faceUp: true };
      setRevealedCards([...revealedCards, flippedCard]);
      setDeck(deck.slice(1))
    
    if(topCard.suit == suit){
      setTimeout(() => {
        setModalMessage("Þú vannst! 🎉🏆");
        setShowModal(true);
        setCurrentRound(1);
        setRevealedCards([]);
        setIsAnimating(false);
      }, 1500);
    }
    else{
      setTimeout(() => {
        setModalMessage("Taktu sopa !🍺");
        setFailedAttempts(failedAttempts + 1);
        setShowModal(true);
        setCurrentRound(1);
        setRevealedCards([]);
        setIsAnimating(false);
      }, 1500);
    }
  }


  return (
    <>
    <div className="game-nav">
      <a href="/">Baturinn</a>
    </div>
    <div className="game-container" >
      <h1 className="header-game">Heppni eða tölfræðin ? </h1>
      
      <div className="card-container">
        <div className="cards-row">
          {/* Deck */}
          <Card 
            rank={deck[0]?.rank} 
            suit={deck[0]?.suit} 
            faceUp={false} 
          />

          {/* Revealed cards */}
          <div className="placeholder">
            {revealedCards.map((card, index) => (
              <Card 
                key={card.id}
                rank={card.rank}
                suit={card.suit}
                faceUp={card.faceUp}
              />
            ))}
          </div>
        </div>


      {/* Buttons */}
      {currentRound === 1 && (
        <div className="button-group">
          <button onClick={() => handleGuess("red")} disabled={isAnimating}>Rauður</button>
          <button onClick={() => handleGuess("black")} disabled={isAnimating}>Svartur</button>
        </div>
      )}

      {currentRound === 2 && (
        <div className="button-group">
          <button onClick={() => handleHigherGuess()} disabled={isAnimating}>Hærra</button>
          <button onClick={() => handleLowerGuess()} disabled={isAnimating}>Lægra</button>
        </div>
      )}

      {currentRound === 3 && (
        <div className="button-group">
          <button onClick={() => handleInbetween()} disabled={isAnimating}>Milli</button>
          <button onClick={() => handleOutside()} disabled={isAnimating}>Utan</button>
        </div>
      )}

      {currentRound === 4 && (
        <div className="button-group">
          <button onClick={() => suitGuess("C")} disabled={isAnimating}>♣️</button>
          <button onClick={() => suitGuess("S")} disabled={isAnimating}>♠️</button>
          <button onClick={() => suitGuess("H")} disabled={isAnimating}>♥️ </button>
          <button onClick={() => suitGuess("D")} disabled={isAnimating}>♦️</button>
        </div>
      )}
      </div>

      <div className="wave-footer">
        <p>© 2026 AEÁ | Allur réttur áskilinn.</p>
      </div>
    </div>



      {/* First modal - win or lose */}
      {showModal && (
        <>
          {modalMessage.includes("vannst") ? (
            <div className="modal-overlay">
              <div className="modal">
                <p>{modalMessage}</p>
                <div className="button-group">
                  <button onClick={() => {
                    setShowModal(false);
                    setShowNameInput(true);
                  }}>
                    Skráðu þig á hetjulistann
                  </button>
                  <button onClick={() => {
                    setShowModal(false);
                    setFailedAttempts(0);
                  }}>
                    Byrja aftur
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="modal-overlay">
              <div className="modal">
                <p>{modalMessage}</p>
                <button onClick={() => setShowModal(false)}>
                  Halda áfram
                </button>
              </div>
            </div>
          )}
        </>
      )}

    {/* Second modal - name input (separate!) */}
    {showNameInput && (
      <div className="modal-overlay">
        <div className="modal">
          <p>Sláðu inn nafnið þitt</p>
          
          <input 
            type="text"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            placeholder="Nafn"
          />
          
          <div className="button-group">
            <button onClick={() => {
              savePlayer();
            }}>
              Vista
            </button>
            
            <button onClick={() => {
              setShowNameInput(false);
              setPlayerName("");
            }}>
              Hætta við
            </button>
          </div>
        </div>
      </div>
    )}
  
    </>
  );
}

