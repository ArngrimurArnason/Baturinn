'use client'
import { useEffect } from 'react';
import "../globals.css";
import "./about.css";



export default function About() {
  useEffect(() => {
    document.body.setAttribute('data-page', 'about');
    
    return () => {
      document.body.removeAttribute('data-page');
    };
  }, []);

  return (
    <>
    <div className="background-image"></div>
    <div className="about-container">
      <h1>Reglurnar eru einfaldar</h1>
      
      <div className="steps">
        <div className="step">
          <span className="step-number">1</span>
          <p className="step-text">Byrjaðu á því að vera í góðu skapi</p>
        </div>
        
        <div className="step">
          <span className="step-number">2</span>
          <p className="step-text">Náðu þér í Bjór eða drykk að eigin vali (Edrú kings geta tekið þátt)</p>
        </div>
        
        <div className="step">
          <span className="step-number">3</span>
          <p className="step-text">Leikurinn er einfaldur, smelltu á valmöguleikann sem þú vilt giska á. Spilið snýst við og þú færð skilaboð ef þú valdir rangt. Þá ertu beðinn um að taka sopa</p>
        </div>

        <div className="step">
          <span className="step-number">4</span>
          <p className="step-text">Skrefin eru fjögur: Svart eða Rautt, Hærra eða Lægra, Milli eða utan og að lokum sort</p>
        </div>

        <div className="step">
          <span className="step-number">5</span>
          <p className="step-text">Síðasta og mikilvægasta skrefið er að hafa gaman!</p>
        </div>
      </div>
    </div>
    </>
  );
}