import React, { useState } from "react";
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
  faChevronDown,
  faChevronUp,
  faHome,
  faInfoCircle,
  faBookOpen,
  faBlog,
} from "@fortawesome/free-solid-svg-icons";

const SidebarMenu = () => {
  const [isManageHomeVisible, setManageHomeVisible] = useState(false);

  const toggleManageHomeVisibility = () => {
    setManageHomeVisible(!isManageHomeVisible);
  };

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
          <Link to="Teachers" className="waves-effect">
            <FontAwesomeIcon icon={faUserGroup} />
            <span key="t-chat">Teachers</span>
          </Link>
        </li>

        <li>
          <Link to="/QuestionBank" className="waves-effect">
            <FontAwesomeIcon icon={faClipboardList} />
            <span key="t-chat">Question Bank</span>
          </Link>
        </li>

        <li>
          <Link to="Test" className="waves-effect">
            <FontAwesomeIcon icon={faFolderOpen} />
            <span key="t-chat">Tests</span>
          </Link>
        </li>

        <li>
           <Link to="subscription" className="waves-effect">
            <FontAwesomeIcon icon={faDollarSign} />
            <span key="t-chat">Subscription</span>
         </Link>
        </li>

        <li>
          <a href="#" className="waves-effect">
            <FontAwesomeIcon icon={faPen} />
            <span key="t-chat">Blog</span>
          </a>
        </li>

        {/* Manage Home Section */}
        <li className="menu-title" key="t-manage-home">
          <span onClick={toggleManageHomeVisibility} style={{ cursor: "pointer" }}>
            Manage Home{" "}
            {isManageHomeVisible ? (
              <FontAwesomeIcon icon={faChevronUp} />
            ) : (
              <FontAwesomeIcon icon={faChevronDown} />
            )}
          </span>
        </li>

        {isManageHomeVisible && (
          <ul className="manage-home-menu">
            <li>
              <Link to="/home" className="waves-effect">
                <FontAwesomeIcon icon={faHome} />
                <span>Home</span>
              </Link>
            </li>
            <li>
              <Link to="/about" className="waves-effect">
                <FontAwesomeIcon icon={faInfoCircle} />
                <span>About</span>
              </Link>
            </li>
            <li>
              <Link to="/courses" className="waves-effect">
                <FontAwesomeIcon icon={faBookOpen} />
                <span>Courses</span>
              </Link>
            </li>
            <li>
              <Link to="/blog" className="waves-effect">
                <FontAwesomeIcon icon={faBlog} />
                <span>Blog</span>
              </Link>
            </li>
          </ul>
        )}

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
