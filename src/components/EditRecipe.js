import React from 'react'

export default function EditRecipe(props) {
  const recipe = (props.location.state.recipe);
  return (
    <div className="RecipeDisplay">
      <div className="recipeHeader">
        <div className="recipeTitle">
          <textarea rows="1" cols="50" defaultValue={recipe["name"]}/>
          <p>Source : <a href={recipe["url"]}>{recipe["url"]}</a></p>
        </div>
        <div className="recipleImage">
          <img src={recipe["image"]} />
        </div>
      </div>
      <div className="recipeInfo">
        <div className="yields">
          <h5>Yields</h5>
          <textarea rows="1" cols="12" defaultValue={recipe["yields"]} />
        </div>
        <div className="totalTime">
          <h5>Total Time</h5>
          {/* If hours is 0 don't display hours */}
          <textarea rows="1" cols="4" defaultValue={recipe["time"]} />
        </div>
      </div>
      <div className="recipeBody">
        <div className="ingredientsBox">
          <div className="recipeHeader">
            <h2>Ingredients</h2>
          </div>
          <ul className="ingredientList">
            {recipe["ingredients"].map((ingredient) => 
              {return <li><textarea rows="3" cols="30" defaultValue={ingredient} /></li>})}
          </ul>
        </div>
        <div className="instructionsBox">
          <div className="recipeHeader">
            <h2>Instructions</h2>
          </div>
          <ol className="instructionList">
            {recipe["instructions"].map((instruction) => 
              {return <li><textarea rows="4" cols="150" defaultValue={instruction[1]} /></li>})}
          </ol>
        </div>
      </div>
    </div>
  )
}