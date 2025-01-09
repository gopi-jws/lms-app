import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FaDatabase } from "react-icons/fa"; // Import the database icon
import { 
  faPlus, 
  faTrash, 
  faCheckCircle, 
  faTimesCircle, 
  faUsers, 
  faGraduationCap,
  faChevronRight
} from "@fortawesome/free-solid-svg-icons";
import './classdetailspage.css'

const ClassDetailPageSideMenu = ({ 
  onShowActiveStudents, 
  onShowAllStudents, 
  onAddStudentClick, 
  onShowInActiveStudents, 
  archivedCount, 
  trashedCount 
}) => {
  const location = useLocation();
console.log(onAddStudentClick);

  return (
    <div className="side-menu">
      <div className="class-side-title-container">
             <h1 className="class-sidebar-title">
                     <FaDatabase className="db-icon" /> {/* Add the database icon */}
                      Manage Classes
                   </h1>
     
          </div>
      <div className="menu-section">
        <ul className="menu-list">
          <li>
            <Link
              to=""
              className={`menu-item ${location.pathname === "/class/new-class" ? "active" : ""}`}
              onClick={onAddStudentClick}
            >
              <FontAwesomeIcon icon={faPlus} className="menu-icon" />
              <span className="menu-text">Add Student</span>
              <FontAwesomeIcon icon={faChevronRight} className="menu-arrow" />
            </Link>
          </li>
          <li>
            <Link
              to=""
              className={`menu-item ${location.pathname === "/class/trashPage" ? "active" : ""}`}
            >
              <FontAwesomeIcon icon={faTrash} className="menu-icon" />
              <span className="menu-text">
                Trashed
                {trashedCount > 0 && <span className="badge">{trashedCount}</span>}
              </span>
              <FontAwesomeIcon icon={faChevronRight} className="menu-arrow" />
            </Link>
          </li>
        </ul>
      </div>

      <div className="menu-section">
        <h3 className="menu-section-title">Students</h3>
        <ul className="menu-list">
          <li>
            <Link
              to=""
              className={`menu-item ${location.pathname === "/class/allStudents" ? "active" : ""}`}
              onClick={onShowAllStudents}
            >
              <FontAwesomeIcon icon={faUsers} className="menu-icon" />
              <span className="menu-text">
                All Students
                {archivedCount > 0 && <span className="badge">{archivedCount}</span>}
              </span>
              <FontAwesomeIcon icon={faChevronRight} className="menu-arrow" />
            </Link>
          </li>
          <li>
            <Link
              to=""
              className={`menu-item ${location.pathname === "/class/activeStudents" ? "active" : ""}`}
              onClick={onShowActiveStudents}
            >
              <FontAwesomeIcon icon={faCheckCircle} className="menu-icon" />
              <span className="menu-text">Active Students</span>
              <FontAwesomeIcon icon={faChevronRight} className="menu-arrow" />
            </Link>
          </li>
          <li>
            <Link
              to=""
              className={`menu-item ${location.pathname === "/class/inactiveStudents" ? "active" : ""}`}
              onClick={onShowInActiveStudents}
            >
              <FontAwesomeIcon icon={faTimesCircle} className="menu-icon" />
              <span className="menu-text">Inactive Students</span>
              <FontAwesomeIcon icon={faChevronRight} className="menu-arrow" />
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ClassDetailPageSideMenu;
