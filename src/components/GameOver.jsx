import { xi } from "../images";
const GameOver = ({className}) => {
  return(
    <div className={className}>
      <h1>Game Over</h1>
      <p>
        You betrayed our Glorious Supreme Leader and our righteous Party. Your execution is set tomorrow.
      </p>
      <img src={xi}/>  
    </div>);
};

export default GameOver;
