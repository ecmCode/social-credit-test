import React from "react";
import {GameComplete, GameOver} from "."
import style from "../App.module.css"
const Questions = ({gameComplete, questionlist,selected,}) => {
  return(
    <div className={style.questions}>
        {
        alive 
        ? gameComplete
        ? <GameComplete />
        : 
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
        <GameOver className={style.gameOver}/>
        }
    </div>
  );
};

export default Questions;
