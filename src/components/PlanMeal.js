import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router'
import RecipeDisplay from './RecipeDisplay'

function PlanMeal(props) {
  const [submit, setSubmit] = useState(false);
  const [isLoadingToken, setIsLoadingToken] = useState(true);
  const [token, setToken] = useState(sessionStorage.getItem("token") || "");
  // User information
  const [userData, setUserData] = useState({});
  const [userRecipes, setUserRecipes] = useState([]);
  // Variables
  const [recipeOnDisplay, setRecipeOnDisplay] = useState("");

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

  return (
    <div className="PlanMeal">
      <div className="lists">
        <div className="listPlanMeal">
          <p>Plan Meal</p>
          <br></br>
          {/* Display recipes you want to plan a meal with. Include a remove
              button just in case user wants to remove from the list. */}
          {props.planMeal.map((recipe) => {return (
            <div>
              <button onClick={() => setRecipeOnDisplay(recipe)}>{recipe["name"]}</button>
              <button onClick={() => props.removeFromPlanMeal(recipe)}>Remove</button>
            </div>
          )})}
          <p id="planMealError"></p>
          <button onClick={() => {
            if (props.planMeal.length < 2) {
              const output = document.getElementById("planMealError");
              output.innerHTML = "<p>Add more recipes</p>"
            } else {
              console.log(props.planMeal.length)
              setSubmit(true)
            }
          }}>Plan This Meal</button>
          {submit ? (
            <Redirect to={{
              pathname : "/PlanMealDisplay",
              state : { planMeal : props.planMeal }
            }}/>
          ) : (
            <div/>
          )}
        </div>
        {token ? (
          <div className="listRecipes">
            <p>All your recipes should be here</p>
            {isLoadingToken ?
              <p>Loading...</p>
            : 
              <div>
                {userRecipes.map((recipe) => 
                  {return <li><button onClick={() => setRecipeOnDisplay(recipe)}>{recipe["name"]}</button></li>})}
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
            {props.planMeal.includes(recipeOnDisplay) ? (
              <p>Recipe added to your meal plan</p>
            ) : (
              <div>
                <button onClick={() => props.addToPlanMeal(recipeOnDisplay)}>Add to Meal</button>
              </div>
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