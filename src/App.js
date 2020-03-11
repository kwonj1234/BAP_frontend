import React from 'react';
import { Route, BrowserRouter} from 'react-router-dom';
import NavBar from './components/NavBar';
import Login from './components/Login';
import Home from './components/Home';
import PlanMeal from './components/PlanMeal'
import './App.css';

function App() {

  return (
    <BrowserRouter className="Browser">
      <body className="App">
        <NavBar />
        <Route path="/Home" component={Home}/>
        <Route path="/Login" component={Login}/>
        <Route path="/PlanMeal" component={PlanMeal}/>
      </body>
    </BrowserRouter>
  );
}

export default App;
