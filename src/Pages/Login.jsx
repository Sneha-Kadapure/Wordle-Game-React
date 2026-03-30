import React, {useState} from 'react'

function Login(){
    const [username, setName] = useState("");
    const [password, setPassword] = useState("");

    function handleLogin(){
      return ;
    }

  return (
    <div>
      <h1>Login page</h1>
      <label>Username:</label>
      <input type='text' value={username} placeholder="Ex: Angela" onChange={(e)=>{setName(e.target.value)}}/>
      <label>Password</label>
      <input type='text' value={password} placeholder="*****" onChange={(e)=>{setPassword(e.target.value)}}/>
      <button onClick={handleLogin}>Login</button>
    </div>
  )
}

export default Login;