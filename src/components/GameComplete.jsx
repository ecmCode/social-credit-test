import { grade } from "../rule";
const GameComplete = ({count, socialCredit}) => {
  
  return (
    <div>
      <h1>Game Complete</h1> 
      <h3>Congratulations citizen, you passed the test!</h3>
      <h3>Your score is: {socialCredit}</h3>
      <p>Right answers: {count.correct}</p>
      <p>Wrong answers: {count.wrong}</p>
      <p>{grade(socialCredit)}</p>
    </div>
  )
};

export default GameComplete;
