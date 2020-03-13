import React from 'react';
import { Link } from 'react-router-dom';

function NavBar() {
    return (
    <span className = "topnav">
      <div className="left">
          <Link to="/Home" className='Link'>Home</Link>
          <Link to="/PlanMeal" className='Link'>Plan Meal</Link>
          <Link to="/Format" className='Link'>Format</Link>
          <Link to='/Test2' className='Link'>Test2</Link>
      </div>
      <div className="right">
        <Link to="/Login" className='Link'>Log in</Link>
      </div>
    </span>
  );
}

export default NavBar;