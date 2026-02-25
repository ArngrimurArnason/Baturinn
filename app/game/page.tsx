'use client'
import { useState, useEffect } from "react";
import Card from "../components/Card";
import { generateDeck } from "../utils/deck";
import { getRankValue } from "../utils/deck";
import './game.css';




export default function Game() {

  const [deck, setDeck] = useState([])
  const [revealedCards, setRevealedCards] = useState([]);
  const [currentRound, setCurrentRound] = useState(1);

  useEffect(() => {
    const newDeck = generateDeck();
    setDeck(newDeck);
  }, [])

  function checkDeckEmpty() {
  if (deck.length === 0) {
    alert("Kláraðu BJÓRINN!");
    return true;
  }
  return false;
}

   function handleGuess(color) {
    if (checkDeckEmpty()) return;

    const topCard = deck[0]
    const cardIsRed = topCard.suit === 'H' || topCard.suit === 'D';
    let isCorrect = false;

    if(color == "red" && cardIsRed){
      isCorrect = true;
    } 
    else if(color == "black" && !cardIsRed){
      isCorrect = true;
    }
    


    if (isCorrect) {
      setCurrentRound(currentRound + 1);
    } else {
      setTimeout(() => {
        alert("Take a sip");
        setCurrentRound(1);
        setRevealedCards([]);
      }, 1000);
    }

    const flippedCard = { ...topCard, faceUp: true };

    setRevealedCards([...revealedCards, flippedCard]);
    setDeck(deck.slice(1));

  }

  function handleHigherGuess() {
    if (checkDeckEmpty()) return;
    
    const topCard = deck[0];
    const prevCard = revealedCards[0];

    const topValue = getRankValue(topCard.rank);
    const prevValue = getRankValue(prevCard.rank);

    const flippedCard = { ...topCard, faceUp: true };
      setRevealedCards([...revealedCards, flippedCard]);
      setDeck(deck.slice(1))

    if(topValue > prevValue){
      setCurrentRound(currentRound + 1);
    }
    else {
      setTimeout(() => {
        alert("Take a sip");
        setCurrentRound(1);
        setRevealedCards([]);
      }, 1000); 
    }
  }

  function handleLowerGuess() {
    if (checkDeckEmpty()) return;

    const topCard = deck[0];
    const prevCard = revealedCards[0];

    const minValue = getRankValue(topCard.rank);
    const prevValue = getRankValue(prevCard.rank);

    const flippedCard = { ...topCard, faceUp: true };
      setRevealedCards([...revealedCards, flippedCard]);
      setDeck(deck.slice(1))

    
    if(minValue < prevValue){
      setCurrentRound(currentRound + 1);
    }
    else {
      setTimeout(() => {
        alert("Taktu sopa !");
        setCurrentRound(1);
        setRevealedCards([]);
      }, 1000);
    }
  }

  function handleInbetween() {
    if (checkDeckEmpty()) return;

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

    if(topValue > minValue && topValue < maxValue){
      setCurrentRound(currentRound + 1);
    }
    else {
      setTimeout(() => {
        alert("Taktu sopa !");
        setCurrentRound(1);
        setRevealedCards([]);
      }, 1000);
    }

  }

  function handleOutside() {
    if (checkDeckEmpty()) return;

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

    if(topValue < minValue || topValue > maxValue){
      setCurrentRound(currentRound + 1);
    }
    else {
      setTimeout(() => {
        alert("Taktu sopa !");
        setCurrentRound(1);
        setRevealedCards([]);
      }, 1000);
    }
  }

  function suitGuess(suit){
    if (checkDeckEmpty()) return;

    const topCard = deck[0];

    const flippedCard = { ...topCard, faceUp: true };
      setRevealedCards([...revealedCards, flippedCard]);
      setDeck(deck.slice(1))
    
    if(topCard.suit == suit){
      setTimeout(() => {
        alert("Þú kláraðir bátinn !")
        setCurrentRound(1);
        setRevealedCards([]);
      }, 1500);
    }
    else{
      setTimeout(() => {
        alert("Taktu sopa !")
        setCurrentRound(1);
        setRevealedCards([]);
      }, 1500);
    }
  }


  return (
    <div className="game-container" >
      <h1 className="header">Eitthvað?</h1>
      <div className="flex flex-col items-center gap-4">
      
      {/* Deck */}
      <Card 
        rank={deck[0]?.rank} 
        suit={deck[0]?.suit} 
        faceUp={false} 
      />

      {/* Guess - show ALL revealed cards */}
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


      {/* Buttons */}
      {currentRound === 1 && (
        <div className="button-group">
          <button onClick={() => handleGuess("red")}>Rauður</button>
          <button onClick={() => handleGuess("black")}>Svartur</button>
        </div>
      )}

      {currentRound === 2 && (
        <div className="button-group">
          <button onClick={() => handleHigherGuess()}>Hærra</button>
          <button onClick={() => handleLowerGuess()}>Lægra</button>
        </div>
      )}

      {currentRound === 3 && (
        <div className="button-group">
          <button onClick={() => handleInbetween()}>Milli</button>
          <button onClick={() => handleOutside()}>Utan</button>
        </div>
      )}

      {currentRound === 4 && (
        <div className="button-group">
          <button onClick={() => suitGuess("C")}>Lauf</button>
          <button onClick={() => suitGuess("S")}>Spaði</button>
          <button onClick={() => suitGuess("H")}>Hjarta</button>
          <button onClick={() => suitGuess("D")}>Tígull</button>
        </div>
      )}
      </div>
    </div>
  );
}

