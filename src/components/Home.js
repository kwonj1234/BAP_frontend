import React, { useState } from 'react';
import { Redirect } from 'react-router';

function Home () {
  const [searchQuery, setSearchQuery] = useState("");
  const [submit, setSubmit] = useState(false);
  const background = ["https://images.pexels.com/photos/920220/pexels-photo-920220.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260",
                      "https://images.pexels.com/photos/1600711/pexels-photo-1600711.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260",
                      "https://images.pexels.com/photos/239581/pexels-photo-239581.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260",
                      "https://images.pexels.com/photos/1435904/pexels-photo-1435904.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260",
                      "https://images.pexels.com/photos/533325/pexels-photo-533325.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260",
                      "https://images.pexels.com/photos/1351238/pexels-photo-1351238.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260",
                      "https://images.pexels.com/photos/208537/pexels-photo-208537.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260",
                      "https://images.pexels.com/photos/70746/strawberries-red-fruit-royalty-free-70746.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260",
                      "https://images.pexels.com/photos/1527603/pexels-photo-1527603.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260",
                      "https://images.pexels.com/photos/41171/brussels-sprouts-sprouts-cabbage-grocery-41171.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260",
                      "https://images.pexels.com/photos/905847/pexels-photo-905847.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260",
                      "https://images.pexels.com/photos/2087748/pexels-photo-2087748.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260",
                      "https://images.pexels.com/photos/1150447/pexels-photo-1150447.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"
                    ]
  // const listings = recipes.map((cards) => {
  //   return <RecipeCard data = {cards} />
  // })

  return (
    <div className='Home'> 
      <div className = "hero">
        <div className="hero-body">
          <h1>RecipeDex</h1>
          <form className="searchBar" onSubmit={() => setSubmit(true)}>
            <input 
              type="text"
              onChange={e => setSearchQuery(e.target.value)} 
              name="hero-input" 
              autoComplete="off"
              placeholder="Search URL">
            </input>
          </form>
          {submit ? (
            <Redirect to={{
              pathname : "/SearchUrl",
              state : { query: searchQuery }
            }}/>
          ) : (
            <div/>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;