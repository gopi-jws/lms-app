import React from "react";
import "./sidemenu.css";
import { Link } from 'react-router-dom';

// Font Awesome imports
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
} from "@fortawesome/free-solid-svg-icons";

const SidebarMenu = () => {
  return (
    <div id="sidebar-menu" className="mm-active">
      {/* Left Menu Start */}
      <ul className="metismenu list-unstyled mm-show" id="side-menu">
        <li className="menu-title" key="t-menu">
          Application
        </li>

        <li className="mm-active">
          <Link to="/" className="waves-effect active">
            <FontAwesomeIcon icon={faChartLine} />
            <span key="t-chat">Dashboard</span>
          </Link>
        </li>

        <li>
          <Link to="/class" className="waves-effect">
            <FontAwesomeIcon icon={faUsers} />
            <span key="t-chat">Class</span>
          </Link>
        </li>
        <li>
          <a href="#" className="waves-effect">
            <FontAwesomeIcon icon={faUserGroup} />
            <span key="t-chat">Teachers</span>
          </a>
        </li>

        <li>
          <Link to="/QuestionBank" className="waves-effect">
            <FontAwesomeIcon icon={faClipboardList} />
            <span key="t-chat">Question Bank</span>
          </Link>
        </li>

        <li>
          <a href="#" className="waves-effect">
            <FontAwesomeIcon icon={faFolderOpen} />
            <span key="t-chat">Tests</span>
          </a>
        </li>

        <li>
          <a href="#" className="waves-effect">
            <FontAwesomeIcon icon={faDollarSign} />
            <span key="t-chat">Subcription</span>
          </a>
        </li>

        <li>
          <a href="#" className="waves-effect">
            <FontAwesomeIcon icon={faPen} />
            <span key="t-chat">Blog</span>
          </a>
        </li>

        <li className="menu-title" key="t-apps">
          Profile Info
        </li>

        <li>
          <a href="#" className="waves-effect">
            <FontAwesomeIcon icon={faUser} />
            <span key="t-file-manager">Profile</span>
          </a>
        </li>

        <li>
          <a href="#" className="waves-effect">
            <FontAwesomeIcon icon={faPowerOff} />
            <span key="t-file-manager">Logout</span>
          </a>
        </li>
      </ul>
    </div>
  );
};

export default SidebarMenu;
