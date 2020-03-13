import React from 'react';
import { Link } from 'react-router-dom' 

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
      <br></br>
      <Link to="/CreateAccount" className="createAccountRoute">Don't have an account? Sign up now</Link>
    </div>
  )
}

export default Login;