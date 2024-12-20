import React from 'react';
import{Link,Outlet} from 'react-router-dom';

const layout = () => {
  return (
    <div>
           <div className="side-menu">
              <ul className="menu-list">
                <li className="class-menu-title" key="t-menu">
                  Classes
                </li>
                <li>
                  <Link
                    to="/new-class"  // Make sure this matches the route defined
                    className={`menu-item ${location.pathname === "/class/new-class" ? "active" : ""}`}
                  >
                    <FontAwesomeIcon icon={faPlus} />
                    <span className="menu-text">New Class</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/archivepage" // Fix the path to match the route
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
                    to="/trashed" // Fix the path to match the route
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
            </div>
      
    </div>
  )
}

export default layout
