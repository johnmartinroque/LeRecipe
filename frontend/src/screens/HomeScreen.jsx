import React from "react";
import { Col, Row } from "react-bootstrap";
import '../css/HomeScreen.css';
import MonthRecipe from "../components/MonthRecipe";
import WeekRecipe from "../components/WeekRecipe";
import RandomRecipes from "../components/RandomRecipes";


function HomeScreen() {
  return (
    <div>
      <Row>
        <Col>
          <MonthRecipe />
          <WeekRecipe />
          <RandomRecipes />
        </Col>
      </Row>
    </div>
  );
}

export default HomeScreen;
