import React from "react";
import { Col, Row } from "react-bootstrap";
import '../css/screens/HomeScreen.css';
import MonthRecipe from "../components/MonthRecipe";
import WeekRecipe from "../components/WeekRecipe";
import RandomRecipes from "../components/RandomRecipes";
import Footer from "../components/Footer";

function HomeScreen() {
  return (
    <div>
      <Row>
        <Col>
        <div className="landing-section">
          <div className="landing-image">
            <img src="./LEGOAT.jpg" alt="Delicious Food" />
          </div>
          <div className="landing-text">
            <h1>Welcome to<img 
            src="/LeRecipe.png" 
            alt="LeRecipe Logo"/>
          </h1>
            <p>Discover amazing recipes and share your culinary creations!</p>
            <button className="cta-button">Get Started</button>
          </div>
        </div>

          <RandomRecipes />
          <WeekRecipe />
          <MonthRecipe />
        </Col>
      </Row>
      <Footer/>
    </div>
  );
}

export default HomeScreen;
