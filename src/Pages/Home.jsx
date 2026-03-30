import React from 'react'
import { useNavigate } from 'react-router-dom'

function Home(){
    const navigate = useNavigate();

  return (
    <div>
        <h1>Wordle Game</h1>
        <button onClick={()=>{navigate("/Start")}}>Play</button>
    </div>
  )
}

export default Home;
