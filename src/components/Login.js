import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom' 

function Login () {
  const [userData, setUserData] = useState({});
  const [loginUrl, setLoginUrl] = useState("http://localhost:5000/login");
  const [tokenUrl, setTokenUrl] = useState("http://localhost:5000/token_auth")
  const [logoutUrl, setLogoutUrl] = useState("http://localhost:5000/logout")
  const [isLoading, setIsLoading] = useState(true);
  
  const [inputUser, setInputUser] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [token, setToken] = useState(sessionStorage.getItem("token"));

  const sendLogin = async () => {
    const configs = {
      method : "POST",
      mode : "cors",
      headers : {"Content-Type" : "application/json"},
      body : JSON.stringify({
        username : inputUser,
        password : inputPassword
      })
    }
    const response = await fetch(loginUrl, configs)
    const responseFlask = await response.json()
    setUserData(responseFlask)
    sessionStorage.setItem("token", userData["token"])
    setToken(userData["token"])
  }

  useEffect(() => {
    const tokenAuth = async () => {
      setIsLoading(true)
      try{
        const configs = {
          methods : "POST",
          mode : "cors",
          headers : {"Content-Type" : "application/json"},
          body : JSON.stringify({
            token : token
          })
        }
        const response = await fetch(tokenUrl, configs);
        const responseFlask = await response.json();
        setUserData(responseFlask);
      } catch (err) {
        console.log(err)
      }
      setIsLoading(false);
    }
    tokenAuth()
  }, [token])

  const logout = async () => {
    const configs = {
      method : "POST",
      mode : "cors",
      headers : {"Content-Type" : "application/json"},
      body : JSON.stringify({
        pk : userData["pk"]
      })
    }
    await fetch(logoutUrl, configs)
    setToken("")
    sessionStorage.setItem("token", "")
  }

  return (
    <div className="MyProfile">
      {!token ? (
        <div className="loginCard">
          <h2>RecipeBox</h2>
          <input 
            id="username" 
            onChange={e => setInputUser(e.target.value)}
            autoComplete="off"
            placeholder="Username">
          </input>
          <br></br>
          <input 
            id="password"
            onChange={e => setInputPassword(e.target.value)} 
            type="password"
            placeholder="Password">
          </input>
          <br></br>
          <button id="loginButton" onClick={() => sendLogin()}>Login</button>
          <br></br>
          <Link to="/CreateAccount" className="createAccountRoute">Don't have an account? Sign up now</Link>
        </div>
      ) : (
        <div className="myRecipes">
          { isLoading ? (
            <p>Loading...</p>
          ) : (
            <div>
              <br></br>
              <br></br>
              <br></br>
              <br></br>
              <br></br>
              <h1>{userData["token"]}</h1>
              <button id="logoutButton" onClick={() => {logout()}}>Logout</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Login;