import "./globals.css";
import "./pagemodules.css";

export default function Home() {
  return (
    <div className="homepage">
      <div className="text-content">
        <h1 className="header"><a href="/game">Smelltu á bátinn til að hefja leik</a></h1>
        <p className="subtitle">- Skemmtilegasta drykkjuspil landsins ef þú þorir !</p>
      </div>
      <div className="wave-container">
      <a href="/game" className="boat-link">
        <img src="/sailing-boat.png" alt="boat" style={{ width: '85px', height: 'auto' }} />
      </a>
      </div>
    </div>
  );
}