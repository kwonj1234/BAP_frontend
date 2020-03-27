import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router'
import PlanMealCard from "./PlanMealCard"

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
      <div className="listPlanMeal">
        <h1>Plan Meal</h1>
        <br></br>
        {/* Display recipes you want to plan a meal with. Include a remove
            button just in case user wants to remove from the list. */}
        {props.planMeal.map((recipe) => {return (
          <PlanMealCard recipe={recipe} removeFromPlanMeal={props.removeFromPlanMeal}/>
        )})}
        <p id="planMealError"></p>
        <button onClick={() => {
          if (props.planMeal.length < 2) {
            const output = document.getElementById("planMealError");
            output.innerHTML = "<p>Add more recipes</p>"
          } else {
            setSubmit(true)
          }}}>
          Plan This Meal
        </button>
        {submit ? (
          <Redirect to={{
            pathname : "/PlanMealDisplay",
            state : { planMeal : props.planMeal }
          }}/>
        ) : (
          <div/>
        )}
      </div>
    </div>
  );
}

export default PlanMeal