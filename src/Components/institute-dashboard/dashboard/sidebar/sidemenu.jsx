import React, { useState } from "react";
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartLine,
  faDollarSign,
  faUserGroup,
  faClipboardList,
  faUsers,
  faFolderOpen,
  faPen,
  faUser,
  faPowerOff,
  faChevronDown,
  faChevronUp,
  faHome,
  faInfoCircle,
  faBookOpen,
  faBlog,
} from "@fortawesome/free-solid-svg-icons";
import "./sidemenu.css";

const SidebarMenu = () => {
  const [isManageHomeVisible, setManageHomeVisible] = useState(true);
  const location = useLocation();

  const toggleManageHomeVisibility = () => {
    setManageHomeVisible(!isManageHomeVisible);
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div className="sidebar-menu">
      {/* <div className="sidebar-header">
        <h2>LMS Institute</h2>
      </div> */}
      <ul className="sidebar-nav">
        <li className="menu-title">Dashboard</li>
        {/* <li className={isActive('/') ? 'active' : ''}>
          <Link to="/">
            <FontAwesomeIcon icon={faChartLine} />
            <span>Dashboard</span>
          </Link>
        </li> */}
        <li className={isActive('/maindashboard/general') ? 'active' : ''}>
          <Link to='/maindashboard/general'>
            <FontAwesomeIcon icon={faUsers} />
            <span>General</span>
          </Link>
        </li>
        <li className={isActive('/maindashboard/Sheduled') ? 'active' : ''}>
          <Link to="/maindashboard/Sheduled">
            <FontAwesomeIcon icon={faUserGroup} />
            <span>Sheduled</span>
          </Link>
        </li>
        <li className={isActive('/maindashboard/UnScheduled') ? 'active' : ''}>
          <Link to="/maindashboard/UnScheduled">
            <FontAwesomeIcon icon={faClipboardList} />
            <span> UnScheduled</span>
          </Link>
        </li>
        <li className={isActive('/teachers') ? 'active' : ''}>
          <Link to="/Teachers">
            <FontAwesomeIcon icon={faFolderOpen} />
            <span>Teachers</span>
          </Link>
        </li>
        <li className={isActive('/subscription') ? 'active' : ''}>
          <Link to="/subscription">
            <FontAwesomeIcon icon={faDollarSign} />
            <span>Subscription</span>
          </Link>
        </li>
        {/* <li className={isActive('/blog') ? 'active' : ''}>
          <Link to="/blog">
            <FontAwesomeIcon icon={faPen} />
            <span>Blog</span>
          </Link>
        </li> */}

        <li className="menu-title manage-home" onClick={toggleManageHomeVisibility}>
          <span>
            Manage Home
            <FontAwesomeIcon icon={isManageHomeVisible ? faChevronUp : faChevronDown} className="toggle-icon" />
          </span>
        </li>
        <ul className={`manage-home-submenu ${isManageHomeVisible ? 'visible' : ''}`}>
          <li className={isActive('/home') ? 'active' : ''}>
            <Link to="/home">
              <FontAwesomeIcon icon={faHome} />
              <span>Home</span>
            </Link>
          </li>
          <li className={isActive('/about') ? 'active' : ''}>
            <Link to="/about">
              <FontAwesomeIcon icon={faInfoCircle} />
              <span>About</span>
            </Link>
          </li>
          <li className={isActive('/courses') ? 'active' : ''}>
            <Link to="/courses">
              <FontAwesomeIcon icon={faBookOpen} />
              <span>Courses</span>
            </Link>
          </li>
          <li className={isActive('/blog-manage') ? 'active' : ''}>
            <Link to="/blog-manage">
              <FontAwesomeIcon icon={faBlog} />
              <span>Blog</span>
            </Link>
          </li>
        </ul>

        <li className="menu-title">Profile Info</li>
        <li className={isActive('/profile') ? 'active' : ''}>
          <Link to="/profile">
            <FontAwesomeIcon icon={faUser} />
            <span>Profile</span>
          </Link>
        </li>
        <li>
          <Link to="/logout">
            <FontAwesomeIcon icon={faPowerOff} />
            <span>Logout</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default SidebarMenu;

