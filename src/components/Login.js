import React from 'react';

function Login () {
  return (
    <div className="loginCard">
      <h2>RecipeBox</h2>
      <form>
        <input id="username" placeholder="Username"/>
        <br></br>
        <input id="password" placeholder="Password"/>
      </form>
      <br></br>
      <button id="loginButton">Login</button>
    </div>
  )
}

export default Login;