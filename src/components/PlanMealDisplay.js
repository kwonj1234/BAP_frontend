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
  const [recipes, setRecipes] = useState([])
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
      const response = await fetch(planMealRoute, configs);
      const responseFlask = await response.json();
      setMealInstructions(responseFlask["instructions"]);
      setRecipes(responseFlask["recipes"]);
      setIsLoading(false);
    }
    planTheMeal()
  }, [planMeal])

  return (
    <div className="PlanMealDisplay">
      {isLoading ? (
        <p>Loading....</p>
      ) : (
        <div>
          <span className="planMealRecipes">
            {recipes.map((recipe) => {return (
                <p className={"recipeNames " + "recipe" + recipe["index"]}>{recipe["name"]}</p>
            )})}
          </span>
          <table className="planMeal">
            <tbody>
              <tr className="planMealHeader">
                <td><h4>Time since start (minutes)</h4></td>
                <td><h4>Instruction</h4></td>
              </tr>
              {mealInstructions.map((instruction) => {return (
                <tr className={"planMealRow" + " " + "recipe" + instruction["recipe_index"]}>
                  <td className="planMealTimeStep">
                    {instruction.timeStep}
                  </td>
                  <td className="planMealInstruction">
                    {instruction.instruction}
                  </td>
                </tr>
              )})}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}