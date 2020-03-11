import React from 'react';
import RecipeCard from './RecipeCard'

function Home () {
  let imagePath1 = "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/scotch-egg-main-1572610870.jpg"
  let imagePath2 = "https://www.emerils.com/sites/default/files/styles/wmax-600-sq/public/IMG_5238%20edit.jpg.jpg?itok=ynjiuJPD"
  let imagePath3 = "https://www.koreanbapsang.com/wp-content/uploads/2015/03/DSC_0797-1-480x270.jpg"
  let imagePath4 = "https://data.whicdn.com/images/326325677/original.jpg?t=1549411208"
  let imagePath5 = "https://img.buzzfeed.com/thumbnailer-prod-us-east-1/55ac7efd43d74a6ead6576b4bfb28d7e/FB_Syphus_BananaBread_v3.jpg"
  let imagePath6 = "https://food.fnr.sndimg.com/content/dam/images/food/fullset/2013/8/27/3/FNM_100113-Jumbo-Cheese-Stuffed-Meatballs-Recipe_s4x3.jpg.rend.hgtvcom.616.462.suffix/1377771794726.jpeg"

  const recipes = [
                  {image: imagePath1,
                   name: "Scotch Egg",
                   description: "Dope ass soft boiled eggs wrapped in sausage meat then fried"},

                  {image: imagePath2,
                   name : "Beef Wellington",
                   description: "Beef wrapped in duxelle and then wrapped again in a cured meat then baked inside a shell of puff pastry"},

                  {image: imagePath3,
                   name : "Budae Jjigae",
                   description: "Korean Army Stew, literally anything a soldier in the field could find and boil together"},

                  {image: imagePath4,
                   name : "The fatty, goodness that keeps people going",
                   description: "Stuff that will eventually kill you, but is the only reason some people exercise"},

                  {image: imagePath5,
                   name : "Banana Bread",
                   description : "Banana mush baked with chocolate chips and is the best thing to happen since bread"},

                  {image: imagePath6,
                   name : "Italian Meatball",
                   description: "Meat in a ball shape cooked in tomato sauce"}
                  ]
  
  const listings = recipes.map((cards) => {
    return <RecipeCard data = {cards} />
  })

  return (
    <div className='body'> 
      <div className = "title">
        <h1>RecipeBox</h1>
        <form class="searchBar">
          <input type="text" name="search" placeholder="Search URL or Recipe"/>
        </form>
      </div>
      <div className="row">
        {listings}
      </div>
    </div>
  );
}

export default Home;