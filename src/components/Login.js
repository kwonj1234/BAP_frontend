import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom' 

function Login () {
  // Routes
  const [loginRoute, setLoginRoute] = useState("http://localhost:5000/login");
  const [tokenRoute, setTokenRoute] = useState("http://localhost:5000/token");
  const [logoutRoute, setLogoutRoute] = useState("http://localhost:5000/logout");
  // User inputs
  const [inputUser, setInputUser] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  // Data from back end
  const [userData, setUserData] = useState({});
  const [userRecipes, setUserRecipes] = useState({});
  // Browser variables
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState(sessionStorage.getItem("token") || "");

  const sendLogin = async () => {
    const output = document.getElementById("loginError")
    const configs = {
      method : "POST",
      mode : "cors",
      headers : {"Content-Type" : "application/json"},
      body : JSON.stringify({
        username : inputUser,
        password : inputPassword
      })
    }
    const response = await fetch(loginRoute, configs)
    const responseFlask = await response.json()
    sessionStorage.setItem("token", responseFlask["token"])
    setToken(responseFlask["token"])
    output.innerHTML = "<p>" + responseFlask["response"] + "</p>"
  }
  
  const logout = async () => {
    const configs = {
      method : "POST",
      mode : "cors",
      headers : {"Content-Type" : "application/json"},
      body : JSON.stringify({
        pk : userData["pk"]
      })
    }
    await fetch(logoutRoute, configs)
    setToken("")
    sessionStorage.setItem("token", "")
  }

  useEffect(() => {
    const tokenAuth = async () => {
      if (token === "") {
        // pass
      } else {
        setIsLoading(true)
        try{
          const response = await fetch(`http://localhost:5000/token/${token}`);
          const responseFlask = await response.json();
          setUserData(responseFlask["userData"]);
          setUserRecipes(responseFlask["userRecipes"]);
        } catch (err) {
          console.log(err)
        }
        setIsLoading(false);
      }
    }
    tokenAuth()
  }, [token])

  return (
    <div className="MyProfile">
      {!token ? (
        <div className="loginCard">
          <h2>RecipeBox</h2>
          <div id="loginError"/>
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
        <div className="MyProfile">
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <h1>{userData["pk"]}</h1>
          <button id="logoutButton" onClick={() => {logout()}}>Logout</button>
        </div>
      )}
    </div>
  );
}

export default Login;