import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';
import NavBar from './components/NavBar';
import Login from './components/Login';
import Home from './components/Home';
import PlanMeal from './components/PlanMeal'
import FormatRecipe from './components/FormatRecipe'
import './App.css';
import CreateAccount from './components/CreateAccount';

function App() {

  return (
    <BrowserRouter className="Browser">
      <NavBar />
      <div className="App">
        <Route path="/Home" component={Home}/>
        <Route path="/Login" component={Login}/>
        <Route path="/PlanMeal" component={PlanMeal}/>
        <Route path="/Format" component={FormatRecipe}/>
        <Route path="/CreateAccount" component={CreateAccount}/>
      </div>
    </BrowserRouter>
  );
}

export default App;
