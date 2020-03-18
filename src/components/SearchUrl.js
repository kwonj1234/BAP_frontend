import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import RecipeDisplay from './RecipeDisplay'

export default function SearchUrl (props) {
  const [url, setUrl] = useState(props.location.state.query);
  const [recipeRoute, setRecipeRoute] = useState('http://localhost:5000/get_url');
  const [saveRecipeRoute, setSaveRecipeRoute] = useState("http://localhost:5000/save_recipe_to_user")

  const [userData, setUserData] = useState({});
  const [userRecipes, setUserRecipes] = useState({});
  const [recipe, setRecipe] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState(sessionStorage.getItem("token") || "");

  useEffect(() => {
    const tokenAuth = async () => {
      if (token === "" || token === undefined) {
        // pass
      } else {
        try{
          const response = await fetch(`http://localhost:5000/token/${token}`);
          const responseFlask = await response.json();
          setUserData(responseFlask["userData"]);
          setUserRecipes(responseFlask["userRecipes"]);
        } catch (err) {
          console.log(err)
        }
      }
    }
    tokenAuth()
  }, [token])

  useEffect (() => {
    const getRecipe = async () => {
      setIsLoading(true)
      const configs = {
        method : "POST",
        mode   : "cors",
        headers: {"Content-Type" : "application/json"},
        body   : JSON.stringify({
          recipe_url : url
        })
      }
      const response = await fetch(recipeRoute, configs)
      const responseFlask = await response.json()
      setRecipe(responseFlask)
      setIsLoading(false)
    }
    getRecipe()
  }, [url])

  const saveRecipe = async () => {
    const output = document.getElementById("saveRecipeText");
    const configs = {
      method : "POST",
      mode   : "cors",
      headers: {"Content-Type" : "application/json"},
      body   : JSON.stringify({
        recipe : recipe,
        userPk : userData["pk"]
      })
    }
    const response = await fetch(saveRecipeRoute, configs);
    const responseFlask = await response.json();
    output.innerHTML = "<p>" + responseFlask["response"] + "</p>";
  }

  return (
    <div className="SearchUrl">
      {isLoading ? (
        <p>Loading....</p>
      ) : (
        <div>
          <RecipeDisplay recipe={recipe} />
          <div id="saveRecipeText" />
          {!token ? 
          <Link to="/MyProfile" className="Link">Login to save recipe</Link>
          : 
          <button onClick={() => {saveRecipe()}} className="saveRecipeButton">Save Recipe</button>
          }
        </div>
      )}
    </div>
  )
}
