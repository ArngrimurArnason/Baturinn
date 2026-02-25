export default function Navbar() {
  return (
    <nav className="nav">
      <a href="/">
        <p> Baturinn</p>
      </a>
      <div className="navlinks">
        <a href="/about"> Leiðbeiningar</a>

        <a href="/app"> Appið</a>

        <a href="/hof"> Hetjurnar okkar</a>
      </div>
      
    </nav> 
  );
}