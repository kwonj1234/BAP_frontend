import React from 'react'
import RecipeCard from './RecipeCard'

export default function DisplayUserRecipes(props) {
  return (
    <div class="DisplayUserRecipes">
      {props.userRecipes.map((recipe) => {return <RecipeCard recipe={recipe}/>})}
    </div>
  )
}
