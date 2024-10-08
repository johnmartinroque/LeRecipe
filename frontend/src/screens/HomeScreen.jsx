import React from "react";
import { Col, Row } from "react-bootstrap";
import '../css/HomeScreen.css';
import MonthRecipe from "../components/MonthRecipe";
import WeekRecipe from "../components/WeekRecipe";
import RandomRecipes from "../components/RandomRecipes";
import Footer from "../components/Footer";

function HomeScreen() {
  return (
    <div>
      <Row>
        <Col>
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
