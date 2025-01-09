import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FaDatabase } from "react-icons/fa"; // Import the database icon
import { faPlus, faTrash, faUserCircle ,faArchive, faGraduationCap ,faChalkboardTeacher,faFolderPlus } from "@fortawesome/free-solid-svg-icons";
import './classsidemenu.css'

const ClassSideMenu = ({ archivedCount, trashedCount }) => {
  const location = useLocation();

  return (
    <div className="class-side-menu">
     <div className="class-side-title-container">
        <h1 className="class-sidebar-title">
                <FaDatabase className="db-icon" /> {/* Add the database icon */}
                 Manage Classes
              </h1>

     </div>
       <div className="unique-design2">
                <FontAwesomeIcon icon={faUserCircle} className="unique-icon" />
                <p className="unique-text2 d-flex">
                  Manage your Classes efficiently!
                </p>
              </div>
      <hr />
      <ul className="menu-list">
       
        <li>
          <Link
            to="/class/addclass"
            className={`class-menu-item  menu-item2 ${location.pathname === "/class/new-class" ? "active" : ""}`}
          >
             <FontAwesomeIcon icon={faFolderPlus} className="class-newqbicon" />
            <span className="menu-text">New Class</span>
          </Link>
        </li>
         <li>
          <Link
            to="/class"
            className={`class-menu-item ${location.pathname === "/class" ? "active" : ""}`}
          >
            <FontAwesomeIcon icon={faChalkboardTeacher} className="menu-icon" />
            <span className="menu-text">
          All Classes
              {archivedCount > 0 && <span className="badge">{archivedCount}</span>}
            </span>
          </Link>
        </li>
        <li>
          <Link
            to="/class/archivepage"
            className={`class-menu-item ${location.pathname === "/class/archivepage" ? "active" : ""}`}
          >
            <FontAwesomeIcon icon={faArchive} className="menu-icon" />
            <span className="menu-text">
              Archived
              {archivedCount > 0 && <span className="badge">{archivedCount}</span>}
            </span>
          </Link>
        </li>
        <li>
          <Link
            to="/class/trashPage"
            className={`class-menu-item ${location.pathname === "/class/trashPage" ? "active" : ""}`}
          >
            <FontAwesomeIcon icon={faTrash} className="menu-icon" />
            <span className="menu-text">
              Trashed
              {trashedCount > 0 && <span className="badge">{trashedCount}</span>}
            </span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default ClassSideMenu;
