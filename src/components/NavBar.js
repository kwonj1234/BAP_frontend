import React from 'react';
import { Link } from 'react-router-dom';

function NavBar() {
    return (
    <span className = "topnav">
      <div class="left">
          <Link to="/Home" className='Link'>Home</Link>
          <Link to="/PlanMeal" className='Link'>Plan Meal</Link>
          <Link to="/Test1" className='Link'>Test1</Link>
          <Link to='/Test2' className='Link'>Test2</Link>
      </div>
      <div class="right">
        <Link to="/Login" className='Link'>Log in</Link>
      </div>
    </span>
  );
}

export default NavBar;