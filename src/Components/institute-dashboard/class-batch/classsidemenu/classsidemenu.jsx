import React from "react";
import { Link, useLocation } from "react-router-dom"; 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrash, faArchive } from "@fortawesome/free-solid-svg-icons";
import './classsidemenu.css';

const ClassSideMenu = ({ archivedCount, trashedCount }) => {
  const location = useLocation(); 

  return (
    <div className="side-menu">
      <ul className="menu-list">
        <li className="class-menu-title" key="t-menu">
          Classes
        </li>
        <li>
          <Link
            to="/class/new-class"  // Ensure this matches the route defined
            className={`menu-item ${location.pathname === "/class/new-class" ? "active" : ""}`}
          >
            <FontAwesomeIcon icon={faPlus} />
            <span className="menu-text">New Class</span>
          </Link>
        </li>
        <li>
          <Link
            to="/class/archivepage" 
            className={`menu-item ${location.pathname === "/class/archivepage" ? "active" : ""}`}
          > 
            <FontAwesomeIcon icon={faArchive} />
            <span className="menu-text">
              Archived
              {archivedCount > 0 && <span className="badge bg-info ms-2">{archivedCount}</span>}
            </span>
          </Link>
        </li>
        <li>
          <Link
            to="/class/trashPage" 
            className={`menu-item ${location.pathname === "/class/trashPage" ? "active" : ""}`}
          >
            <FontAwesomeIcon icon={faTrash} />
            <span className="menu-text">
              Trashed
              {trashedCount > 0 && <span className="badge bg-danger ms-2">{trashedCount}</span>}
            </span>
          </Link>
        </li>
      </ul>

    </div>
  );
};

export default ClassSideMenu;
