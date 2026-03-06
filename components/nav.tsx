export default function Navbar() {
  return (
    <nav className="nav">
      <a href="/">
        <p> Baturinn</p>
      </a>
      <div className="navlinks">
        <a href="/about"> Leiðbeiningar</a>

        <a href="/mobileapp"> Appið</a>

        <a href="/halloffame"> Hetjurnar</a>
      </div>
      
    </nav> 
  );
}