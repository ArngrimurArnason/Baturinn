

export default function Card({ rank, suit, faceUp }){
    let imagePath;
  
    if (faceUp) {
        imagePath = `/cards/${rank}${suit}.png`;
    } else {
        imagePath = `/cards/BACK.png`;
    }
    return(
        <img className="card" src={imagePath} alt="card"/>
    )
}