import React from 'react';

function RecipeCard(props) {
    return (
        <div className="recipeCard">
            <h4>{props.data.name}</h4>
            <div className="recipeContent">
                <div className="recipePic">
                    <img width = "200px" height = "200px" src = {props.data.image} />
                </div>
                <div className="recipeDescription">
                    <p>{props.data.description}</p>
                </div>
            </div>
        </div>
    );
}

export default RecipeCard