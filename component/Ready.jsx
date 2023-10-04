import React from 'react'

export default function Ready({dispatch,state}) {
    function handleActiveState(){
        dispatch({type : 'setActive'})
    }
  return (
    <div className='ready'>
        <center>
            <h2>Welcome to MoH quiz</h2>
            <h3>{state.questions.length} questions to check you knowledge about me</h3>
            <button onClick={()=>handleActiveState()} className='btn'>Let's start</button>
        </center>
    </div>
  )
}
