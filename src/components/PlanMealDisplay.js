import React, { useState, useEffect } from 'react'

export default function PlanMealDisplay(props) {
  const [token, setToken] = useState(sessionStorage.getItem("token" || ""));
  const [isLoading, setIsLoading] = useState(true);
  // Routes
  const [planMealRoute, setPlanMealRoute] = useState("http://localhost:5000/plan_meal");
  // User info
  const [userData, setUserData] = useState({});
  const [userRecipes, setUserRecipes] = useState({});
  // Variables
  const [mealInstructions, setMealInstructions] = useState([]);
  const [planMeal, setPlanMeal] = useState(props.location.state.planMeal)

  useEffect(() => {
    const tokenAuth = async () => {
      if (token === "" || token === undefined) {
        // pass
      } else {
        try{
          const response = await fetch(`http://localhost:5000/token/${token}`);
          const responseFlask = await response.json();
          setUserData(responseFlask["userData"]);
          setUserRecipes(responseFlask["userRecipes"]);
        } catch (err) {
          console.log(err)
        }
      }
    }
    tokenAuth()
  }, [token])

  useEffect (() => {
    const planTheMeal = async () => {
      setIsLoading(true)
      const configs = {
        method : "POST",
        mode   : "cors",
        headers: {"Content-Type" : "application/json"},
        body   : JSON.stringify({
          planMeal : planMeal
        })
      }
      const response = await fetch(planMealRoute, configs)
      const responseFlask = await response.json()
      setMealInstructions(responseFlask["response"])
      setIsLoading(false)
    }
    planTheMeal()
  }, [planMeal])

  return (
    <div className="PlanMealDisplay">
      {isLoading ? (
        <p>Loading....</p>
      ) : (
        <div>
          <ol className="mealInstructions">
            {mealInstructions.map((instruction) => 
              {return <li>{instruction[1]}</li>})}
          </ol>
        </div>
      )}
    </div>
  )
}