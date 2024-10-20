import React from 'react';
import '../css/components/Footer.css';
import 'font-awesome/css/font-awesome.min.css';


function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
      <a href="/">
          <img 
            src="/LeRecipe.png" 
            alt="LeRecipe Logo" 
            className="footer-logo"
          />
        </a>
        <div className="footer-section">
        <h4>Quick Links</h4>
        <div className="links">
          <a href="/about" className="link">About Us</a>
          <a href="/recipe" className="link">Recipes</a>
          <a href="/create" className="link">Create</a>
          <a href="/profile" className="link">Profile</a>
        </div>

        <p>© 2024 LeRecipe. All rights reserved.</p>
      </div>
      </div>
    </footer>
  );
}

export default Footer;
