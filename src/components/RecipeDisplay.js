import React from 'react'

export default function RecipeDisplay(props) {
  return (
    <div className="RecipeDisplay">
      <div className="recipeHeader">
        <div className="recipeTitle">
          <h1>{props.recipe["name"]}</h1>
          <a href="EditRecipe">Edit Recipe</a>
          <p>Source : <a href={props.recipe["url"]}>{props.recipe["url"]}</a></p>
        </div>
        <div className="recipleImage">
          <img src={props.recipe["image"]} />
        </div>
      </div>
      <div className="recipeInfo">
        <div className="yields">
          <h5>Yields</h5>
          <p>{props.recipe["yields"]}</p>
        </div>
        <div className="totalTime">
          <h5>Total Time</h5>
          {/* If hours is 0 don't display hours */}
          {Math.floor(props.recipe["time"] / 60) === 0 ?
            <p>{props.recipe["time"] % 60} Minutes</p>
          :
            <p>{Math.floor(props.recipe["time"] / 60)} Hours {props.recipe["time"] % 60} Minutes</p>
          }
        </div>
      </div>
      <div className="recipeBody">
        <div className="ingredientsBox">
          <div className="recipeHeader">
            <h2>Ingredients</h2>
          </div>
          <ul className="ingredientList">
            {props.recipe["ingredients"].map((ingredient) => 
              {return <li>{ingredient}</li>})}
          </ul>
        </div>
        <div className="instructionsBox">
          <div className="recipeHeader">
            <h2>Instructions</h2>
          </div>
          <ol className="instructionList">
            {props.recipe["instructions"].map((instruction) => 
              {return <li>{instruction[1]}</li>})}
          </ol>
        </div>
      </div>
    </div>
  )
}
