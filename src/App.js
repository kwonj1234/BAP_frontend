import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import { Redirect } from 'react-router';
import NavBar from './components/NavBar';
import MyProfile from './components/MyProfile';
import Home from './components/Home';
import PlanMeal from './components/PlanMeal'
import SearchUrl from './components/SearchUrl'
import CreateAccount from './components/CreateAccount';
import PlanMealDisplay from './components/PlanMealDisplay';
import DisplaySavedRecipe from './components/DisplaySavedRecipe';
import './App.css';

function App() {
  const [planMeal, setPlanMeal] = useState([]);
  
  const addToPlanMeal = (recipe) => {
    const oldPlanMeal = [...planMeal];
    oldPlanMeal.push(recipe)
    setPlanMeal(oldPlanMeal)
  }

  const removeFromPlanMeal = (recipe) => {
    const oldPlanMeal = [...planMeal];
    const newPlanMeal = oldPlanMeal.filter(
      (recipeInMeal) => {return recipeInMeal !== recipe})
    setPlanMeal(newPlanMeal)
  }

  return (
    <BrowserRouter className="Browser">
      <div className="App">
        <NavBar />
        <Switch>
          <Route path="/Home" component={Home}/>
          <Route path="/MyProfile" render={(props) => <MyProfile {...props} planMeal={planMeal} addToPlanMeal={addToPlanMeal}/>}/>
          <Route path="/PlanMeal" render={(props) => <PlanMeal {...props} planMeal={planMeal} addToPlanMeal={addToPlanMeal} removeFromPlanMeal={removeFromPlanMeal} />}/>
          <Route path="/SearchUrl" render={(props) => <SearchUrl {...props} planMeal={planMeal} addToPlanMeal={addToPlanMeal}/>}/>
          <Route path="/CreateAccount" component={CreateAccount}/>
          <Route path="/PlanMealDisplay" component={PlanMealDisplay}/>
          <Route path="/DisplaySavedRecipe" render={(props) => <DisplaySavedRecipe {...props} planMeal={planMeal} addToPlanMeal={addToPlanMeal}/>}/>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
