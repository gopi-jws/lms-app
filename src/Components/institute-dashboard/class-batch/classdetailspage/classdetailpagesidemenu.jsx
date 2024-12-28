import React from "react";
import { Link, useLocation } from "react-router-dom"; 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrash, faCheckCircle,faTimesCircle,faUsers } from "@fortawesome/free-solid-svg-icons";

const ClassDetailPageSideMenu = ({ onShowActiveStudents, onShowAllStudents,onAddStudentClick,onShowInActiveStudents,archivedCount, trashedCount }) => {
  const location = useLocation(); 

  return (
    <div className="side-menu">
      <ul className="menu-list">
        <li className="class-menu-title" key="t-menu">
          Classes
        </li>
        <li>
          <Link
            to=""  
            className={`menu-item ${location.pathname === "/class/new-class" ? "active" : ""}`}
            onClick={onAddStudentClick}
          >
            <FontAwesomeIcon icon={faPlus} />
            <span className="menu-text">Add</span>
          </Link>
        </li>
        <li>
          <Link
            to="" 
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

      <ul className="menu-list">
      <li className="class-menu-title" key="t-menu">
          
        </li>

        <li>
          <Link
            to="" 
            className={`menu-item ${location.pathname === "/class/trashPage" ? "active" : ""}`}
            onClick={onShowAllStudents}
          >
            <FontAwesomeIcon icon={faUsers} />
            <span className="menu-text">
              All
              {trashedCount > 0 && <span className="badge bg-danger ms-2">{trashedCount}</span>}
              
            </span>
          </Link>
        </li>

        <li>
          <Link
            to="" 
            className={`menu-item ${location.pathname === "/class/trashPage" ? "active" : ""}`}
            onClick={onShowActiveStudents}
          >
            <FontAwesomeIcon icon={faCheckCircle} />
            <span className="menu-text">
              Active
              {trashedCount > 0 && <span className="badge bg-danger ms-2">{trashedCount}</span>}
            </span>
          </Link>
        </li>

        <li>
          <Link
            to="" 
            className={`menu-item ${location.pathname === "/class/trashPage" ? "active" : ""}`}
            onClick={onShowInActiveStudents}
            
          >
            <FontAwesomeIcon icon={faTimesCircle } />
            <span className="menu-text">
              InActive
              {trashedCount > 0 && <span className="badge bg-danger ms-2">{trashedCount}</span>}
            </span>
          </Link>
        </li>


      </ul>

    </div>
  );
};

export default ClassDetailPageSideMenu;
