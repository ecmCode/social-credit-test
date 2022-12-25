import { questionlist, initialScore, shuffle}from './rule'
import { xi,win,lose,plus15,plus30,plus50,minus30,johnxina,winnie } from './images'
import style from './App.module.css'
import { useEffect, useState } from 'react'
import { 
  Header,
  Container,
  Sidebar,
  GameComplete,
  GameOver,
  
 } from './components'


function App() {

  const [socialCredit,setSocialCredit] = useState(initialScore)
  const [picture,setPicture] = useState(johnxina)
  const [selected,setSelected] = useState([])
  const [alive,setAlive] = useState(true)
  const [count,setCount] = useState({correct:0, wrong:0})
  const [gameComplete, setGameComplete] = useState(false)


  const correct = (score, e) => {
    e.answer = 'correct'
    setSocialCredit(credit => credit + score)
    switch (score) {
      case 15: setPicture(plus15); break;
      case 30: setPicture(plus30); break;
      case 50: setPicture(plus50); break;
      default:break;
    }
    setCount({correct: count.correct + 1, wrong: count.wrong})
    setSelected(items => [...items, {id:e.target.parentNode.id, answer:e.answer}])
  }
  
  const wrong = (loseOnWrongAnswer,e) => {
    e.answer = 'wrong'
    loseOnWrongAnswer 
      ? setSocialCredit(credit => credit - 100000000000)
      : setSocialCredit(credit => credit - 30)
    setPicture(minus30)
    setCount({correct: count.correct, wrong: count.wrong + 1 })
    setSelected(items => [...items, {id:e.target.parentNode.id, answer:e.answer}]);

  }

  // Restart the entire game and reshuffle the order.
  const restart = () => {
    setAlive(true)
    setPicture(johnxina)
    setSocialCredit(initialScore)
    setSelected([])
    setGameComplete(false)
    setCount({correct: 0, wrong: 0})
    shuffle(questionlist)
    questionlist.map((question) => shuffle(question.selections))
  }
  
  // Things to happen when player wins:
 const gameWin = () => {
  console.log("Congratulations citizen, you passed the test!");
  console.log(`Correct:${count.correct} Wrong:${count.wrong}`);
  console.log(`Your score is: ${socialCredit}`);
  setGameComplete(true)
  setPicture(win)
}

// Things to happen when player loses:
 const gameLose = () => {
  setAlive(false)
  setPicture(lose)
}
  
  // Effect listening if the social credit is under -100, which is a deadline. 
  // If yes, the player loses the game.
  useEffect(() => {
    console.log(count);
    if(socialCredit < -99) {
      gameLose();
    };
  }, [socialCredit]);

    
  // Effect listening if the social credit is under -100, which is a deadline. 
  // If all answers are answered whilst alive, the player wins the game.
  useEffect(() => {
    if (selected.length == questionlist.length){
      gameWin();
    }
  },[selected])

  return (
    <>
      <Header className={style.header} />
      
      <Container className={style.container}>  
        <div className={style.questions}>
          {
            alive 
            ? gameComplete
            ? <GameComplete count={count} socialCredit={socialCredit}/>
            : 
          questionlist.map((question,index) =>    
            <div key={crypto.randomUUID()}>
              <h3 className={style.title}>
                {index+1}. {question.title}
                {question.loseOnWrongAnswer && 
                <span>
                  <img width={60} src={winnie}/>
                    IMPORTANT
                  </span>}
              </h3>
              <div className={style.btns} id={index} style={{
                background: 
                selected[index]
                  ? selected[index].answer == "correct"
                    ? "lime"
                    : "pink"    
                  : 'none' }}>
                {question.selections.map(selection =>
                   <button style={{ 
                    pointerEvents: 
                      selected[index]? "none" : "auto",
                    cursor:
                      selected[index]? "auto" : "pointer"
                    }}
                    onClick={(e) => selection == question.answer ? correct(question.score, e) : wrong(question.loseOnWrongAnswer,e)}>
                    {selection}
                  </button>
                )}
              </div>
            </div>)
            :
            <GameOver className={style.gameOver} />
            }
        </div>
        <Sidebar 
        classname={style.sidebar} 
        socialCredit={socialCredit} 
        restart={restart} 
        picture={picture}
        gameComplete={gameComplete}/>
      </Container>
    </>
  )
}

export default App
