import React, { useState, useEffect } from 'react'
import RecipeDisplay from './RecipeDisplay'

function PlanMeal() {
  const [isLoadingToken, setIsLoadingToken] = useState(true);
  const [token, setToken] = useState(sessionStorage.getItem("token") || "");
  // User information
  const [userData, setUserData] = useState({});
  const [userRecipes, setUserRecipes] = useState([]);
  // Variables
  const [recipeOnDisplay, setRecipeOnDisplay] = useState("");
  const [planMeal, setPlanMeal] = useState([]);

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

  const addToPlanMeal = (recipe) => {
    const oldPlanMeal = [...planMeal];
    oldPlanMeal.push(recipe)
    setPlanMeal(oldPlanMeal)
  }

  return (
    <div className="PlanMeal">
      <div className="lists">
        <div className="listPlanMeal">
          <p>Plan Meal</p>
          <br></br>
          {planMeal.map((recipe) => {return <p>{recipe.name}</p>})}
          <button>Plan This Meal</button>
        </div>
        {token ? (
          <div className="listRecipes">
            <p>All your recipes should be here</p>
            {isLoadingToken ?
              <p>Loading...</p>
            : 
              <div>
                {userRecipes.map((recipe) => 
                  {return <button onClick={() => setRecipeOnDisplay(recipe)}>{recipe["name"]}</button>})}
              </div>
            }
          </div>
        ) : (
          <div></div> // Show nothing while token authentication is loading
        )}
      </div>
      <div className="display">
        {/* If there is a recipe to display, display it, else don't do anything */}
        {recipeOnDisplay ? (
          <div>
            <RecipeDisplay recipe={recipeOnDisplay} />
            {/* If the recipe is already in planMeal list, don't show the button to add it */}
            {planMeal.includes(recipeOnDisplay) ? (
              <p>Recipe added to your meal plan</p>
            ) : (
              <button onClick={() => addToPlanMeal(recipeOnDisplay)}>Add to Meal</button>
            )}
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
}

export default PlanMeal