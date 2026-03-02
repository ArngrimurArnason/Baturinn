import "./globals.css";

export default function Home() {
  return (
    <div className="homepage">
      <div className="text-content">
        <h1 className="header">Smelltu á bátinn til að hefja leik</h1>
        <p className="subtitle">- Skemmtilegasta drykkjuspil landsins ef þú þorir !</p>
      </div>
      <a href="/game">
        <img src="/sailing-boat.png" alt="boat" style={{ width: '85px', height: 'auto' }} />
      </a>
    </div>
  );
}