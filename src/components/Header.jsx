import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <header className="header-container">
      <div className="header-content">
        <h1 className="header-title">¡Lentes AP!</h1>
        <p className="header-description">¡Lentes para todas las edades!</p>
        <img
          src="./img/Header.jpg" 
          alt="Lente Header"
          className="header-image"
        />
      </div>
    </header>
  );
};

export default Header;


