import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, BookOpen, Database, GraduationCap, Users } from 'lucide-react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faSignOutAlt,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";
import logo from '../../images/learning.png'
import "./header.css";

const navItems = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Tests", href: "/test", icon: BookOpen },
  { name: "Question Banks", href: "/QuestionBank", icon: Database },
  { name: "Classes", href: "/class", icon: GraduationCap },
  { name: "Teachers", href: "/teachers", icon: Users },
];

const Header = () => {
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const location = useLocation();

  const isActive = (href) => {
    const currentPath = location.pathname.replace(/\/$/, "");
    const itemPath = href.replace(/\/$/, "");
    return currentPath.toLowerCase() === itemPath.toLowerCase();
  };

  const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
  };

  return (
    <header className="top-bar">
      <div className="top-bar-container">
        <div className="logo">
          <img
            src={logo} // Replace with your logo path
            alt="LMS Logo"
            className="logo-icon"
          />
          {/* <span className="logo-text">LMS Institute</span> */}
        </div>
        <nav className="nav-menu">
          {navItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={`nav-item ${isActive(item.href) ? "active" : ""}`}
            >
              <div className="nav-item-content">
                <item.icon className="nav-icon" />
                <span className="nav-text">{item.name}</span>
              </div>
            </Link>
          ))}
        </nav>
        <div className="user-profile">
          <button className="profile-toggle" onClick={toggleDropdown}>
            <div className="avatar">
              <FontAwesomeIcon icon={faUser} />
            </div>
            <span className="username">Admin</span>
            <FontAwesomeIcon icon={faChevronDown} className={`dropdown-icon ${isDropdownVisible ? 'rotate' : ''}`} />
          </button>
          {isDropdownVisible && (
            <div className="dropdown-menu show">
              <Link to="/profile" className="dropdown-item">
                <FontAwesomeIcon icon={faUser} />
                <span>Profile</span>
              </Link>
              <Link to="/logout" className="dropdown-item">
                <FontAwesomeIcon icon={faSignOutAlt} />
                <span>Logout</span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
