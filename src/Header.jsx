import React from 'react';
import DarkModeToggle from './DarkModeToggle';
import './Header.css';

const Header = () => {
  return (
    <header className="app-header">
      <div className="header-content">
        <h1 className="header-title">Narrative Quest</h1>
        <DarkModeToggle />
      </div>
    </header>
  );
};

export default Header;
