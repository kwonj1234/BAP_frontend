import React from 'react';

function RecipeCard(props) {
    return (
        <div className="recipeCard">
            <h4>{props.recipe.name}</h4>
            <div className="recipeContent">
                <div className="recipePic">
                    <img width = "200px" height = "200px" src = {props.recipe.image} />
                </div>
                <div className="recipeDescription">
                    <p>{props.recipe.total_time}</p>
                </div>
            </div>
        </div>
    );
}

export default RecipeCard