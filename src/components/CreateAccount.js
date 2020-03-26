import React, { useState } from 'react';

function CreateAccount () {
  const [route, setRoute] = useState("http://localhost:5000/create_user")
  const [inputUsername, setInputUsername] = useState("")
  const [inputPassword, setInputPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [inputFname, setInputFname] = useState("")
  const [inputLname, setInputLname] = useState("")
  const [inputEmail, setInputEmail] = useState("")
  const [response, setResponse] = useState("")

  const createAccount = async () => {
    const output = document.getElementById("flaskResponse");
    const configs = {
      method : "POST",
      mode : "cors",
      headers : {"Content-Type" : "application/json"},
      body : JSON.stringify({
        username : inputUsername,
        password1 : inputPassword,
        password2 : confirmPassword,
        fname : inputFname,
        lname : inputLname,
        email : inputEmail
      })
    }
    try {
      const response = await fetch(route, configs);
      const flaskResponse = await response.json();
      output.innerHTML = "<p>" + flaskResponse["response"] + "</p>";
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="CreateAccount">
      <h2>RecipeBox</h2>
      <h4>Create Account</h4>
      <div id="flaskResponse"/>
      <form className="createAccountForm">
        <label for="username">Username</label>
        <input 
          id="username" 
          onChange={e => setInputUsername(e.target.value)}
          >
        </input>
        <label for="password1">Password</label>
        <input 
          id="password1" 
          type="password"
          onChange={e => setInputPassword(e.target.value)}>
        </input>
        <label for="password2">Confirm Password</label>
        <input
          id="password2"
          type="password"
          onChange={e => setConfirmPassword(e.target.value)}>
        </input>
        <label for="fname">First Name</label>
        <input 
          id="fname"
          onChange={e => setInputFname(e.target.value)}
          >
        </input>
        <label for="lname">Last Name</label>
        <input
          id="lname"
          onChange={e => setInputLname(e.target.value)}
          >
        </input>
        <label for="email">E-Mail</label>
        <input 
          id="email" 
          onChange={e => setInputEmail(e.target.value)}
          >
        </input>
      </form>
      <button onClick={() => createAccount()} id="createButton">Create Account</button>
    </div>
  )
}

export default CreateAccount;