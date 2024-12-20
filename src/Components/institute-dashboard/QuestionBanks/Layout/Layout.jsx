import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolderOpen, faArchive, faTrash } from '@fortawesome/free-solid-svg-icons';


const Layout = () => {
  return (
    <div className="layout-container">
      {/* Sidebar */}
      <div className="sidebar">
        <ul className="sidebar-list">
          <li>
            <Link to="/all">
              <FontAwesomeIcon icon={faFolderOpen} className="sidebar-icon" /> All
            </Link>
          </li>
          <li>
            <Link to="/archived">
              <FontAwesomeIcon icon={faArchive} className="sidebar-icon" /> Archived
            </Link>
          </li>
          <li>
            <Link to="/trashed">
              <FontAwesomeIcon icon={faTrash} className="sidebar-icon" /> Trashed
            </Link>
          </li>
        </ul>
      </div>

      {/* Top Bar */}
      <div className="top-bar">
        <h2>Top Bar</h2> {/* Static top bar content */}
      </div>

      {/* Dynamic Content */}
      <div className="content-area">
        <Outlet /> {/* The content changes dynamically based on the route */}
      </div>
    </div>
  );
};

export default Layout;
