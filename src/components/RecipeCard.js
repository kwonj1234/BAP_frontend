import React, { useState } from 'react';
import { Redirect } from 'react-router'

function RecipeCard(props) {
  const [submit, setSubmit] = useState(false)

    return (
      <div>
        <button onClick={() => setSubmit(true)} className="recipeCard">
            <div className="recipeContent">
                <div className="recipePic">
                    <img src = {props.recipe.image} />
                </div>
                <h4>{props.recipe["name"]}</h4>
                <div className="recipeDescription">
                    {Math.floor(props.recipe["time"] / 60) === 0 ?
                      <p>{props.recipe["time"] % 60} Minutes</p>
                    :
                      <p>{Math.floor(props.recipe["time"] / 60)} Hours {props.recipe["time"] % 60} Minutes</p>
                    }
                    <p>{props.recipe["yields"]}</p>
                </div>
            </div>
        </button>
        {submit ? 
          <Redirect to={{
            pathname : "/DisplaySavedRecipe",
            state : { recipe : props.recipe }
          }}/>
        :
          <div/>
        }
      </div>
    );
}

export default RecipeCard