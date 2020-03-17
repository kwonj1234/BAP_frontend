import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

function FormatRecipe (props) {
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
    <div className="FormatRecipe">
      {isLoading ? (
        <p>Loading....</p>
      ) : (
        <div>
          <div className="recipeTitle">
            <div className="recipeTitle">
              <h1>{recipe["name"]}</h1>
            </div>
            <div className="recipleImage">
              <img src={recipe["image"]} />
            </div>
          </div>
          <div className="recipeInfo">
            <div className="yields">
              <h5>Yields</h5>
              <p>{recipe["yields"]}</p>
            </div>
            <div className="totalTime">
              <h5>Total Time</h5>
              {/* If hours is 0 don't display hours */}
              {Math.floor(recipe["time"] / 60) === 0 ?
                <p>{recipe["time"] % 60} Minutes</p>
              :
                <p>{Math.floor(recipe["time"] / 60)} Hours {recipe["time"] % 60} Minutes</p>
              }
            </div>
          </div>
          <div className="recipeBody">
            <div className="ingredientsBox">
              <div className="recipeHeader">
                <h2>Ingredients</h2>
              </div>
              <ul className="ingredientList">
                {recipe["ingredients"].map((ingredient) => 
                  {return <li>{ingredient}</li>})}
              </ul>
            </div>
            <div className="instructionsBox">
              <div className="recipeHeader">
                <h2>Instructions</h2>
              </div>
              <ol className="instructionList">
                {recipe["instructions"].map((instruction) => 
                  {return <li>{instruction}</li>})}
              </ol>
            </div>
          </div>
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

export default FormatRecipe