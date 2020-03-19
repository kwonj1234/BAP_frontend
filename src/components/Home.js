import React, { useState } from 'react';
import { Redirect } from 'react-router';

function Home () {
  const [searchQuery, setSearchQuery] = useState("");
  const [submit, setSubmit] = useState(false);
  // const listings = recipes.map((cards) => {
  //   return <RecipeCard data = {cards} />
  // })

  return (
    <div className='body'> 
      <div className = "title">
        <h1>RecipeBox</h1>
        <form className="searchBar" onSubmit={() => setSubmit(true)}>
          <input 
            type="text"
            onChange={e => setSearchQuery(e.target.value)} 
            name="search" 
            autoComplete="off"
            placeholder="Search URL or Recipe">
          </input>
        </form>
        {submit ? (
          <Redirect to={{
            pathname : "/SearchUrl",
            state : { query: searchQuery }
          }}/>
        ) : (
          <p>Nothing</p>
        )}
      </div>
      <div className="row">

      </div>
    </div>
  );
}

export default Home;