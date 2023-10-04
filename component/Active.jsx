import React, { useEffect, useState } from 'react'

export default function Active({state,dispatch}) {
  const {questions,index,points,seconds,progress} = state
  useEffect(function(){
    const id = setInterval(function(){dispatch({type : 'tick'})} , 1000)
    return ()=> clearInterval(id)
  },[dispatch])
  return (
    <center>
    <div className='active'>
      <Informations questions={questions} progress={progress} index={index} points={points}/>
      <h4>{questions[index].question}</h4>
      <Options questions={questions} seconds={seconds} index={index} dispatch={dispatch}/>
    </div>
    </center>
  )
}

function Informations({questions,index,points,progress}) {
  return(
    <>
    <progress className="progress" max={questions.length} value={progress}></progress>
    <div className="informations">
      <h5>Questions {index+1}/{questions.length}</h5>
      <h5>{points}/280 points</h5>
    </div>
    </>
  )
}

function Options({questions,index,dispatch,seconds}) {

  const min = Math.floor(seconds/60)
  const sec = seconds % 60
  const [isAnsawred,setIsAnsawred] = useState(false)

  function handleChooseAnsawer(i){
    if (isAnsawred == false) {
      setIsAnsawred(true)
      dispatch({type : 'setProgress',payload:index+1})
      if (i ==questions[index].correctOption) {
        dispatch({type : 'addPoints',payload : questions[index].points })
      }}
  }

  function handleNextAnsawer() {
    if (isAnsawred == true) {
      if (index == 14) {
        dispatch({type:'setFinished'})
      }else dispatch({type : 'next'}) ; setIsAnsawred(false)
    }
    else alert("Please ansawer the question")
  }
  
  return( 
    <div className="options">
      {questions[index].options.map((option,i)=>
      <button
      onClick={()=>handleChooseAnsawer(i)}
      className={`btn btn-option ${isAnsawred ? i == questions[index].correctOption ? "correct":"wrong" : ""}`}>
        {option}
      </button>)}
      <div className="footer">
        <button className='btn timer'>{min}:{sec}</button>
        <button onClick={()=>handleNextAnsawer()} className='btn'>Next</button>
      </div>
    </div>
  )
}