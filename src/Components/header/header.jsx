import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faSearch,
  faExpand,
  faCompress,
  faUser,
  faSignOutAlt,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";
import "./header.css";

const Header = () => {
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [isFullscreen, setFullscreen] = useState(false);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err) => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
  };
  return (
    <header className="header">
      <div className="header-content">
        <div className="header-left">
          <div className="logo">
            <span className="logo-icon">L</span>
            <span className="logo-text">MS Institute</span>
          </div>
          <button className="menu-toggle">
            <FontAwesomeIcon icon={faBars} />
          </button>
          <div className="search-container">
            <input
              type="text"
              placeholder="Menu Search..."
              className="search-input"
            />
            <FontAwesomeIcon icon={faSearch} className="search-icon" />
          </div>
        </div>
        <div className="header-right">
          <button className="fullscreen-toggle" onClick={toggleFullscreen}>
            <FontAwesomeIcon icon={isFullscreen ? faCompress : faExpand} />
          </button>
          <div className="user-profile">
            <button className="profile-toggle" onClick={toggleDropdown}>
              <div className="avatar">
                <FontAwesomeIcon icon={faUser} />
              </div>
              <span className="username">Admin</span>
              <FontAwesomeIcon icon={faChevronDown} className="dropdown-icon" />
            </button>
            {isDropdownVisible && (
              <div className="dropdown-menu">
                <a href="#" className="dropdown-item">
                  <FontAwesomeIcon icon={faUser} />
                  <span>Profile</span>
                </a>
                <a href="#" className="dropdown-item">
                  <FontAwesomeIcon icon={faSignOutAlt} />
                  <span>Logout</span>
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
