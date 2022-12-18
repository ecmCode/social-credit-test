import { questionlist, initialScore, shuffle }from './components/rule'
import { xi,win,lose,plus15,plus30,plus50,minus30,johnxina,winnie } from './images'
import style from './App.module.css'
import { useEffect, useState } from 'react'

questionlist.map((question) => shuffle(question.selections))

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
    if(loseOnWrongAnswer){
        setSocialCredit(credit => credit - 100000000000);
        setPicture(lose)
        setAlive(!alive)
        
    }
    setSocialCredit(credit => credit - 30);
    setCount({correct: count.correct, wrong: count.wrong + 1 })
    setPicture(minus30);
    setSelected(items => [...items, {id:e.target.parentNode.id, answer:e.answer}]);
    
  }

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

  useEffect(() => {
    console.log(count);
    if(socialCredit < -99) {
      setAlive(false)
      setPicture(lose)
    };
  }, [socialCredit]);

    
  useEffect(() => {
    if (selected.length == questionlist.length){
      console.log("Congratulations citizen, you passed the test!");
      console.log(`Correct:${count.correct} Wrong:${count.wrong}`);
      console.log(`Your score is: ${socialCredit}`);
      setPicture(win)
      setGameComplete(true)
    }
  },[selected])

  return (
    <div>
      <header className={style.header}>
        <h1>Social Credit Score Test</h1>
      </header>
      
      <div className={style.container}>  
        <div className={style.questions}>
          {alive 
            ? 
          questionlist.map((question,index) =>    
            <div key={crypto.randomUUID()}>
              <h3 className={style.title}>
                {index+1}. {question.title}
                {question.loseOnWrongAnswer && <span><img width={60} src={winnie}/>IMPORTANT</span>}
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
            <div className={style.gameOver}>
              <h1>Game Over</h1>
              <p>You betrayed our glorious supreme leader XI JINPING and our righteous CCP. Your execution is set tomorrow.</p>
              <img src={xi}/>  
            </div>
            }
        </div>
        <div className={style.sidebar}>
          <h2>Social Credit score: {socialCredit}</h2>
          <button onClick={() => restart()}>Restart</button>
          <img src={picture} />
        </div>
      </div>
    </div>
  )
}

export default App
