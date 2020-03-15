import React, { useState } from 'react';

function CreateAccount () {
  const [url, setUrl] = useState("http://localhost:5000/create_user")
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
      const response = await fetch(url, configs);
      const flaskResponse = await response.json();
      setResponse(flaskResponse["response"]);
    } catch (error) {
      console.log(error);
    }
    output.innerHTML = "<p>" + response + "</p>";
  }
  return (
    <div className="CreateAccount">
      <h2>RecipeBox</h2>
      <h4>Create Account</h4>
      <div id="flaskResponse"/>
      <form>
        <input 
          id="username" 
          onChange={e => setInputUsername(e.target.value)}
          placeholder="Username">
        </input>
        <br></br>
        <input 
          id="password" 
          type="password"
          placeholder="Password"
          onChange={e => setInputPassword(e.target.value)}>
        </input>
        <br></br>
        <input
          id="password"
          type="password"
          placeholder="Confirm Password"
          onChange={e => setConfirmPassword(e.target.value)}>
        </input>
        <br></br>
        <input 
          id="fname"
          onChange={e => setInputFname(e.target.value)}
          placeholder="First Name">
        </input>
        <br></br>
        <input
          id="lname"
          onChange={e => setInputLname(e.target.value)}
          placeholder="Last Name">
        </input>
        <br></br>
        <input 
          id="email" 
          onChange={e => setInputEmail(e.target.value)}
          placeholder="E-Mail">
        </input>
      </form>
      <br></br>
      <button onClick={() => createAccount()} id="createButton">Create Account</button>
    </div>
  )
}

export default CreateAccount;