

export default function Card({ rank, suit, faceUp }){
    let imagePath;
  
    if (faceUp) {
        imagePath = `/cards/${rank}${suit}.png`;
    } else {
        imagePath = `/cards/BACK.png`;
    }
    return(
        <img src={imagePath} alt="card" style={{ width: '120px', height: '168px' }}/>
    )
}