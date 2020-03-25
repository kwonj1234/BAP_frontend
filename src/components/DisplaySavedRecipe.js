import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router'
import RecipeDisplay from './RecipeDisplay';
import MyProfile from './MyProfile';

export default function DisplaySavedRecipe(props) {
  const [recipe, setRecipe] = useState(props.location.state.recipe);
  // Routes
  const [deleteRecipeRoute, setDeleteRecipeRoute] = useState("http://localhost:5000/delete_recipe_from_user")
  // User information
  const [userData, setUserData] = useState({})
  const [userRecipes, setUserRecipes] = useState({})
  // Browser variables
  const [token, setToken] = useState(sessionStorage.getItem("token") || "")
  const [isLoadingToken, setIsLoadingToken] = useState(true);

  useEffect(() => {
    const tokenAuth = async () => {
      if (token === "" || token === undefined) {
        // pass
      } else {
        setIsLoadingToken(true)
        try{
          const response = await fetch(`http://localhost:5000/token/${token}`);
          const responseFlask = await response.json();
          setUserData(responseFlask["userData"]);
          setUserRecipes(responseFlask["userRecipes"]);
        } catch (err) {
          console.log(err)
        }
        setIsLoadingToken(false);
      }
    }
    tokenAuth()
  }, [token])

  const deleteRecipe = async () => {
    const output = document.getElementById("redirect");
    const configs = {
      method : "POST",
      mode : "cors",
      headers : {"Content-Type" : "application/json"},
      body : JSON.stringify({
        user_pk : userData["pk"],
        recipe_pk : recipe["pk"]
      }) 
    }
    try {
      const response = await fetch(deleteRecipeRoute, configs);
      const responseFlask = await response.json();
      output.innerHTML += `<Redirect to="/MyProfile" />`
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="DisplaySavedRecipe">
      <RecipeDisplay recipe={recipe} />
      <button onClick={() => deleteRecipe()}>Delete Recipe</button>
      {props.planMeal.includes(recipe) ?
        (<p>Recipe added to Meal Plan</p>)
      :
        (<button onClick={() => props.addToPlanMeal(recipe)}>Add to Meal Plan</button>)
      }
      <div id="redirect"/>
    </div>
  )
}
