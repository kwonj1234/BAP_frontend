import React from 'react';

function RecipeCard(props) {
    return (
        <div class="recipeCard">
            <h4>{props.data.name}</h4>
            <div class="recipeContent">
                <div class="recipePic">
                    <img width = "200px" height = "200px" src = {props.data.image} />
                </div>
                <div class="recipeDescription">
                    <p>{props.data.description}</p>
                </div>
            </div>
        </div>
    );
}

export default RecipeCard