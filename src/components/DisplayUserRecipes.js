import React, { useState }from 'react'
import RecipeCard from './RecipeCard'

export default function DisplayUserRecipes(props) {
  return (
    <div>
      {props.userRecipes.map((recipe) => {return <RecipeCard recipe={recipe}/>})}
    </div>
  )
}
