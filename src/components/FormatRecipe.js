import React, { useState } from 'react'

function FormatRecipe (props) {
  const [url, setUrl] = useState('https://www.bonappetit.com/recipe/mashed-potatoes-with-crispety-cruncheties')
  const [flaskRoute, setFlaskRoute] = useState('http://localhost:5000/get_url')
  const [recipe, setRecipe] = useState([])
  const [isLoading, setIsLoading] = useState(true)

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
    const response = await fetch(flaskRoute, configs)
    const responseFlask = await response.json()
    setRecipe(responseFlask)
    setIsLoading(false)
  }

  return (
    <div className="FormatRecipe">
      <button className="testshit" onClick={() => getRecipe()}>Submit</button>
      {isLoading ?
      <p>Loading....</p>
      :
      <div>
        <div className="recipeTitle">
          <div className="recipeTitle">
            <h1>{recipe["recipeTitle"]}</h1>
          </div>
          <div className="recipleImage">
            <img src={recipe["recipeImage"]} />
          </div>
        </div>
        <div className="recipeInfo">
          <div className="yields">
            <h5>Yields</h5>
            <p>{recipe["recipeYields"]}</p>
          </div>
          <div className="totalTime">
            <h5>Total Time</h5>
            {/* If hours is 0 don't display hours */}
            {Math.floor(recipe["recipeTime"] / 60) === 0 ?
            <p>{recipe["recipeTime"] % 60} Minutes</p>
            :
            <p>{Math.floor(recipe["recipeTime"] / 60)} Hours {recipe["recipeTime"] % 60} Minutes</p>
            }

          </div>
        </div>
        <div className="recipeBody">
          <div className="ingredientsBox">
            <div className="recipeHeader">
              <h2>Ingredients</h2>
            </div>
            <ul className="ingredientList">
              {recipe["recipeIngredients"].map((ingredient) => 
                {return <li>{ingredient}</li>})}
            </ul>
          </div>
          <div className="instructionsBox">
            <div className="recipeHeader">
              <h2>Instructions</h2>
            </div>
            <ol className="instructionList">
              {recipe["recipeInstructions"].map((instruction) => 
                {return <li>{instruction}</li>})}
            </ol>
          </div>
        </div>
      </div>
      }
    </div>
  )
}

export default FormatRecipe