import React, { useState }from 'react'

export default function MyProfile(props) {
  const [myRecipesUrl, setMyRecipesUrl] = useState("http://localhost:5000/logout");
  const [myRecipes, setMyRecipes] = useState({});
  const [isLoading, setIsLoading] = useState(true);


  return (
    <div>
      {myRecipes.map((recipe) => <p>{recipe["name"]}</p>)}
    </div>
  )
}
