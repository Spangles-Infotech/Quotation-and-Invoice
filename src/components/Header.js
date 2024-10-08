import React from 'react';
import './Header.css'; 
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation();
  const colors = [
    { name: 'Defualt', value: '#345261' },
    { name: 'Light Blue', value: '#3498db' },
    { name: 'Green', value: '#2ecc71' },
    { name: 'Purple', value: '#9b59b6' },
    { name: 'Red', value: '#e74c3c' },
  ];
  const changePrimaryColor = (color) => {
    document.documentElement.style.setProperty('--primary-color', color);
  };

  return (
    <header >
      <nav>
        <Link
          to="/quotation"
          style={{
            borderBottom: location.pathname === '/quotation' ? '2px solid white' : 'none',
          }}
        >
          Quotation
        </Link>
        <Link
          to="/invoice"
          style={{
            borderBottom: location.pathname === '/invoice' ? '2px solid white' : 'none',
          }}
        >
          Invoice
        </Link>
      <select id="colorDropdown" onChange={(e) => changePrimaryColor(e.target.value)}>
        {colors.map((color, index) => (
          <option key={index} value={color.value}>
            {color.name}
          </option>
        ))}
      </select>
      </nav>
    </header>
  );
};

export default Header;
