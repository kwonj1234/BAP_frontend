import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom' ;
import DisplayUserRecipes from './DisplayUserRecipes';

function MyProfile (props) {
  // Routes
  const loginRoute  = "http://localhost:5000/login";
  const logoutRoute = "http://localhost:5000/logout";
  // Data from back end
  const [userData, setUserData] = useState({});
  const [userRecipes, setUserRecipes] = useState({});
  // Browser variables
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState(sessionStorage.getItem("token") || "");
  // User inputs
  const [inputUser, setInputUser] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  
  useEffect(() => {
    const tokenAuth = async () => {
      if (token === "" || token === undefined) {
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
    if (responseFlask["token"] === "") {
      output.innerHTML = "<p>" + responseFlask["response"] + "</p>"
    } else {
      sessionStorage.setItem("token", responseFlask["token"])
      setToken(responseFlask["token"])
    }
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

  return (
    <div>
      {!token ? (
        // If token is not set, user is not logged in
        <div className="loginCard">
          <h2>RecipeDex</h2>
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
        // If token is set user is already logged in
        <div className="MyProfile">
          {isLoading ? (
            <p>Loading ...</p>
          ) : (
            <div>
              <h1>{userData["fname"]} {userData["lname"]}'s Saved Recipes</h1>
              <div className="userRecipesRow">
                <DisplayUserRecipes userRecipes={userRecipes} />
              </div>
              <button id="logoutButton" onClick={() => {logout()}}>Logout</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default MyProfile;