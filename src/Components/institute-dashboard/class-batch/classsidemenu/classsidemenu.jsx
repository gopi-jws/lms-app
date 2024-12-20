import React from "react";
import { Link, useLocation,Outlet } from "react-router-dom"; 
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
            to="/class/archivepage" // Ensure the path is correct
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
            to="/class/trashed" // Ensure the path is correct
            className={`menu-item ${location.pathname === "/class/trashed" ? "active" : ""}`}
          >
            <FontAwesomeIcon icon={faTrash} />
            <span className="menu-text">
              Trashed
              {trashedCount > 0 && <span className="badge bg-danger ms-2">{trashedCount}</span>}
            </span>
          </Link>
        </li>
      </ul>

      {/* This is where nested routes will be rendered */}
      <Outlet />
    </div>
  );
};

export default ClassSideMenu;
