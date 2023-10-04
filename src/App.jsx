import { useEffect, useReducer, useState } from 'react'
import Header from '../component/Header'
import Main from '../component/Main'
import './App.css'
import Loader from '../component/Loader'
import Error from '../component/Error'
import Ready from '../component/Ready'
import Active from '../component/Active'
import Finished from '../component/Finished'

const SECONDS_PER_QUESTION = 30 ;
const instate = {
  questions : {},
  // status : loading , error , ready , active , finished
  status : 'loading',
  index : 0,
  progress : 0,
  points : 0 ,
  seconds : 0
}


function reducer(state,action) {
  switch(action.type){
    case 'fetch' :
      return {...state , questions : action.payload, status : 'ready'}
    case "failed" :
      return {...state, status:'error'}
      case "setActive" :
      return {...state, status:'active',seconds:state.questions.length*SECONDS_PER_QUESTION}
      case "addPoints" :
      return {...state, points : state.points+action.payload}
      case "setProgress" :
      return {...state, progress : action.payload }
      case "next" :
      return {...state, index : state.index+1}
      case "setFinished" :
      return {...state, status : 'finished'}
      case "reset" :
      return {...state, index :0 ,progress:0, points: 0, seconds:state.questions.length*SECONDS_PER_QUESTION , status :'active'}
      case "tick" :
      return {...state, seconds : state.seconds -1 ,status:`${state.seconds ===0 ? "finished":"active"}` }
    default :
    throw new Error('Action unknown')
  }
}

function App() {
  

  const [state,dispatch] = useReducer(reducer,instate)
  const {questions,status} = state

  useEffect(
    function () {
      async function fetchData() {
      try{
        let res = await fetch('https://raw.githubusercontent.com/vvviv205/quiz/main/questions.json')
        let data =await res.json()
        console.log(data)
        dispatch({type:'fetch' , payload : data.questions})
      }
      catch(err){
        dispatch({type:'failed'})
      }
      }
      fetchData()
    },[])
  return ( 
    <div>
      <Header/>
      <br /><br />
      <Main>
        {status === 'loading'&&<Loader/>}
        {status === 'error' && <Error/>}
        {status === 'ready' && <Ready state={state} dispatch={dispatch}/>}
        {status === 'active' && <Active state={state} dispatch={dispatch}/>}
        {status === 'finished' && <Finished state={state} dispatch={dispatch}/>}
      </Main>
    </div>
  )
}

export default App
