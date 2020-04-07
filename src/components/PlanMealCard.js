import React, { useState } from 'react'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'


export default function PlanMealCard(props) {
  const [currentTab, setCurrentTab] = useState("ingredients")

  return (
    <div className="PlanMealCard">
      <span className="recipeName">
        <h4>{props.recipe["name"]}</h4>
      </span>
      <br></br><br></br>
      <table className="recipeTable">
        <tbody>
          <tr>
            <td className="leftColumn">
              <img 
                src={props.recipe["image"]}
                height="200px"
                object_fit="cover"
              />
              {Math.floor(props.recipe["time"] / 60) === 0 ?
                <p>{props.recipe["time"] % 60} Minutes</p>
              :
                <p>{Math.floor(props.recipe["time"] / 60)} Hours {props.recipe["time"] % 60} Minutes</p>
              }
              <p>{props.recipe["yields"]}</p>
            </td>
            <td className="rightColumn">
              <Tabs 
                defaultActiveKey={currentTab} 
                onSelect={(e) => setCurrentTab(e)}
                id="tabs" 
                className="tabs"
              >
                <Tab eventKey="ingredients" title="Ingredients">
                  <ul className="ingredientList">
                    {props.recipe["ingredients"].map((ingredient) => 
                      {return <p>{ingredient}</p>})}
                  </ul>
                </Tab>
                <Tab eventKey="instructions" title="Instructions">
                  <ol className="instructionList">
                    {props.recipe["instructions"].map((instruction) => 
                      {return <li>{instruction[1]}</li>})}
                  </ol>
                </Tab>
              </Tabs>
            </td>
          </tr>
        </tbody>
      </table>
      <button onClick={() => props.removeFromPlanMeal(props.recipe)}>Remove From Meal Plan</button>
    </div>
  )
}
