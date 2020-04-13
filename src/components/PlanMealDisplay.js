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
  const [mealIngredients, setMealIngredients] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [planMeal, setPlanMeal] = useState(props.location.state.planMeal);
  const [instructionOnDisplay, setInstructionOnDisplay] = useState(true);

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
      setMealIngredients(responseFlask["ingredients"])
      setIsLoading(false);
    }
    planTheMeal()
  }, [planMeal])

  return (
    <div>
      {isLoading ? (
        <p>Loading....</p>
      ) : (
        <div className="PlanMealDisplay">
          <div className="recipeNamesColumn">
            <div className="recipeNamesText">
              {recipes.map((recipe) => {return (
                  <p className={"recipeNames " + "recipe" + recipe["index"]}>{recipe["name"]}</p>
              )})}
            </div>
          </div>
          <div className="planMealColumn">
            <span className="planMealButtons">
              <button onClick={() => setInstructionOnDisplay(false)}>Ingredients</button>
              <button onClick={() => setInstructionOnDisplay(true)}>Instructions</button> 
            </span>
            { instructionOnDisplay ? (
              <table className="planMeal">
                <tbody>
                  <tr className="planMealHeader">
                    <td><h6>Time since start (minutes)</h6></td>
                    <td><h1>Instruction</h1></td>
                  </tr>
                  {mealInstructions.map((instruction) => {return (
                    <tr className={"planMealRow" + " " + "recipe" + instruction["recipe_index"]}>
                      <td className="planMealTimeStep">
                        {Math.floor(instruction["timeStep"] / 60) === 0 ?
                          <p>{instruction["timeStep"] % 60} minutes</p>
                        :
                          instruction["timeStep"] % 60 !== 0 ?
                            <p>{Math.floor(instruction["timeStep"] / 60)} hours {instruction["timeStep"] % 60} minutes</p>
                          :
                            <p>{Math.floor(instruction["timeStep"] / 60)} hour</p>
                        }
                      </td>
                      <td className="planMealInstruction">
                        {instruction.instruction}
                      </td>
                    </tr>
                  )})}
                </tbody>
              </table>
            ) : (
              <table className="planMealIngredients">
                {mealIngredients.map((ingredient) => {return (
                  <tr className={"recipe" + ingredient["recipe_index"]}>
                    <p>{ingredient["ingredient"]}</p>
                  </tr>
                )})}
              </table>
            )}
          </div>
        </div>
      )}
    </div>
  )
}