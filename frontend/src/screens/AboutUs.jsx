import React from "react";
import { Col, Row, Container } from "react-bootstrap";
import '../css/AboutUs.css'; 

function AboutUs() {
  return (
    <div>
        
      <div className="image-above-about text-center">
        <img 
          src="/LEFOOD.png" // Replace with your actual image path
          alt="Introduction Image"
          className="img-fluid" // This keeps it responsive
        />
      </div>
      
      <div className="about-us-background">
        <div className="about-us-section">
          <Container>
            <Row className="text-center my-5">
              <Col>
                <h1>About Us</h1>
                <p className="about-description">
                  Hi, we are computer engineering students from Holy Angel University!
                </p>
                <p>
                  And we are here to present to you our website inspired by the great LeBron James, LeRecipe! What started as a joke while we were talking about how to cook has now grown to be a reality, with content ranging from recipes that you know and love, to foods that you may never even heard of before!
                </p>
                <p>
                  This small corner of the internet will surely inspire you to try out some delicious treats for yourselves! So while you are busy munching your snacks, let's dive deep into how and why this website was built in the first place.
                </p>
              </Col>
            </Row>
          </Container>
        </div>
      </div>

      {/* LeVision Section */}
      <div className="levision-section">
        <Container>
          <Row className="my-5 align-items-stretch">
            {/* Text Column */}
            <Col md={6} className="my-3">
              <h2>LeVision: The Team's Search For A Future</h2>
              <p>
                Ever been stuck on the question, "What should I cook today?" or "What to eat for the day?" How many times did you encounter that specific situation in life? If you said "many times," then you're not alone. Our team has long been looking for a solution that can help people in these everyday moments of indecision. 
                <br />
                <br />
                We believe that cooking should be enjoyable, not stressful, and that a little inspiration is all it takes to turn a meal from a chore into an experience. Our vision is to create a platform that brings ease, creativity, and variety to people's kitchens. Whether you’re a seasoned chef or someone just starting out, we want to provide you with personalized recipes, meal plans, and cooking tips tailored to your preferences, dietary needs, and available ingredients.
                <br />
                <br />
                Our goal is simple: to empower you with the tools and ideas you need to confidently answer that question, "What should I cook today?" and to make every meal a moment worth savoring.
              </p>
            </Col>

            {/* Image Column */}
            <Col md={6} className="my-3 text-center levision-image-column">
              <img 
                src="/LEBRON.png" 
                alt="LeVision Example"
                className="img-fluid levision-image" 
              />
            </Col>
          </Row>
        </Container>
      </div>

      {/* LeMission Section */}
      <div className="lemision-section">
        <Container>
          <Row className="my-5 align-items-stretch">
            {/* Image Column */}
            <Col md={6} className="my-3 text-center levision-image-column">
              <img 
                src="/LEGOAT.jpg" 
                alt="LeMission Example"
                className="img-fluid levision-image" 
              />
            </Col>

            {/* Text Column */}
            <Col md={6} className="my-3">
              <h2>LeMission: Inspiring New Generations Of Chefs</h2>
              <p>
                At LeRecipe, we are committed to inspiring the next generation of chefs. We understand that cooking is more than just preparing meals; it's an art form and a vital life skill. 
                <br />
                <br />
                Our mission is to provide accessible resources and support for young aspiring chefs. We believe that everyone has the potential to create wonderful dishes, and we're here to help you unlock that potential. Whether you're a child learning to cook for the first time or a teenager perfecting your skills, we aim to make cooking fun, educational, and rewarding.
                <br />
                <br />
                
              </p>
            </Col>
          </Row>
        </Container>
      </div>

    {/* Break Section */}
    <div className="break-section text-center">
        <img 
            src="/FOOD.png"  // Replace with your actual break image path
            alt="Break Image"
            className="img-fluid"  // This keeps it responsive
        />
    </div>

      {/* The G.O.A.T! Section */}
<div className="goat-section">
  <Container>
    <Row className="my-5 text-center">
      {/* Text Column */}
      <Col md={12} className="my-3">
        <h2>The G.O.A.T!: LeRecipe's Edge Over Others</h2>
        <div className="text-center"> {/* Centering the text */}
          <p>
            At LeRecipe, we strive to stand out in the culinary world. Our platform is designed to provide not just recipes but a community of aspiring chefs who share a passion for cooking. 
            <br />
            <br />
            We offer personalized experiences, innovative meal ideas, and cooking tips that set us apart. Whether you’re looking to impress friends at a dinner party or just want a quick weeknight meal, we have something for everyone.
            <br />
            <br />
            Join us in our culinary journey and discover the G.O.A.T. recipes that will elevate your cooking skills to new heights!
          </p>
          <br />
          <br />
            WHAT TO LAGAY PA HERE HEHE
        </div>
      </Col>
    </Row>
    <Row className="text-center">
      {/* Image Column */}
      <Col md={12} className="my-3 text-center">
        <img 
          src="/GOAT.jpg" // Replace with your actual G.O.A.T. image path
          alt="The G.O.A.T! Example"
          className="img-fluid" 
        />
      </Col>
    </Row>
  </Container>
</div>

    </div>
  );
}

export default AboutUs;
