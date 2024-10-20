import React from "react";
import '../css/screens/HomeScreen.css';
import MonthRecipe from "../components/MonthRecipe";
import WeekRecipe from "../components/WeekRecipe";
import RandomRecipes from "../components/RandomRecipes";
import Footer from "../components/Footer";

function HomeScreen() {
  return (
    <div>
        <div className="landing-section">
          <div className="landing-image">
            <img src="./Landingpicture2.jpeg" alt="Delicious Food" />
          </div>

          <div className="landing-text">
            <h1>Welcome to <img src="/LeRecipe.png"  alt="LeRecipe Logo"/> </h1>
            <p>Discover amazing recipes and share your culinary creations!</p>
            <button className="explore-recipe" href="/recipe">Explore Recipe</button>
          </div>
        </div>
        <div className="recipe-section">
          <div className="week-recipe">
            <WeekRecipe />
          </div>
          <div className="month-recipe">
            <MonthRecipe />
          </div>
        </div>
          <RandomRecipes />
      <Footer/>
    </div>
  );
}

export default HomeScreen;
