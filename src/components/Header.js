import React, { useState } from 'react';
import './Header.css';
import { Link, useLocation } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css'; 

const Header = () => {
  const location = useLocation();
  const colors = [
    { name: 'Default', value: '#345261' }, 
    { name: 'Crimson Red', value: '#DC143C' }, 
    { name: 'Royal Blue', value: '#4169E1' }, 
    { name: 'Teal', value: '#008080' },
    { name: 'Amethyst Purple', value: '#9966CC' },
  ];
  
  
  

  const [currentColorIndex, setCurrentColorIndex] = useState(0);

  const changePrimaryColor = (color) => {
    document.documentElement.style.setProperty('--primary-color', color);
  };

  const handleIconClick = () => {
    const nextColorIndex = (currentColorIndex + 1) % colors.length;
    setCurrentColorIndex(nextColorIndex);
    changePrimaryColor(colors[nextColorIndex].value);
  };

  return (
    <header>
      <nav>
        <Link
          to="/"
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

        <div className="color-picker">
          <svg onClick={handleIconClick} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-palette" viewBox="0 0 16 16">
  <path d="M8 5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3m4 3a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3M5.5 7a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m.5 6a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3"/>
  <path d="M16 8c0 3.15-1.866 2.585-3.567 2.07C11.42 9.763 10.465 9.473 10 10c-.603.683-.475 1.819-.351 2.92C9.826 14.495 9.996 16 8 16a8 8 0 1 1 8-8m-8 7c.611 0 .654-.171.655-.176.078-.146.124-.464.07-1.119-.014-.168-.037-.37-.061-.591-.052-.464-.112-1.005-.118-1.462-.01-.707.083-1.61.704-2.314.369-.417.845-.578 1.272-.618.404-.038.812.026 1.16.104.343.077.702.186 1.025.284l.028.008c.346.105.658.199.953.266.653.148.904.083.991.024C14.717 9.38 15 9.161 15 8a7 7 0 1 0-7 7"/>
</svg>
          <select
            id="colorDropdown"
            onChange={(e) => changePrimaryColor(e.target.value)}
            value={colors[currentColorIndex].value} // Sync dropdown with the current color
          >
            {colors.map((color, index) => (
              <option key={index} value={color.value}>
                {color.name}
              </option>
            ))}
          </select>
        </div>
      </nav>
    </header>
  );
};

export default Header;
