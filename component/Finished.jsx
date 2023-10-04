import React from 'react'

export default function Finished({state,dispatch}) {
    const {questions,index,points} = state
    function handleReset() {
        dispatch({type:'reset'})
    }
  return (
    <div className='finished'>
        <h2>You finished the Quiz</h2>
        <h3>You scored {points} points in {index} questions</h3>
        <button onClick={()=>handleReset()} className='btn'>Restart the quiz</button>
    </div>
  )
}
