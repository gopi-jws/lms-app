import React from 'react';
import { Link } from 'react-router-dom';
import './classtopbar.css'; 

const TopBar = () => {
  return (
    <div className="topbar">
      <nav className="topbar-nav">
        <ul>
        <li>
            <Link to="/Institute">Dashboard</Link>
          </li>
          <li>
            <Link to="/Tests">Tests</Link>
          </li>
          <li>
            <Link to="/teachers">Question Banks</Link>
          </li>
          <li>
            <Link to="/class" className="active">Classess</Link>
          </li>
          <li>
            <Link to="/question-bank">Teachers</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default TopBar;
