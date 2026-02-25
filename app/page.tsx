import "./globals.css";

export default function Home() {
  return (
    <div className="homepage">
      <h1>Smelltu á bátinn til að hefja leik</h1>
      <p>Skemmtilegasta drykkjuspil landsins ef þú þorir</p>
      <a href="/game">
        <button>Hefja leik</button>
      </a>
    </div>
  );
}