import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FaDatabase } from "react-icons/fa"; // Import the database icon
import { FaTag } from "react-icons/fa"; // Import the tag icon

import {
  faUserCircle,
  faFolderPlus,
  faEdit,
  faTrash,
  faFolderOpen,
  faArchive,
  faCheck,
  faChevronDown,
  faChevronUp,
} from "@fortawesome/free-solid-svg-icons";
import "./Sidebar.css";

const Sidebar = ({ openModal }) => {
  const [folders, setFolders] = useState(() => {
    const storedFolders = localStorage.getItem("folders");
    return storedFolders ? JSON.parse(storedFolders) : [];
  });

  const [editingFolderId, setEditingFolderId] = useState(null);
  const [editedFolderName, setEditedFolderName] = useState("");
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeSection, setActiveSection] = useState("questionBank");

  const location = useLocation();

  useEffect(() => {
    localStorage.setItem("folders", JSON.stringify(folders));
  }, [folders]);

  const addNewFolder = () => {
    const newFolder = {
      id: Date.now(),
      name: `New Tag ${folders.length + 1}`,
    };
    setFolders([...folders, newFolder]);
  };

  const startEditingFolder = (id, name) => {
    setEditingFolderId(id);
    setEditedFolderName(name);
  };

  const saveFolderName = (id) => {
    const updatedFolders = folders.map((folder) =>
      folder.id === id ? { ...folder, name: editedFolderName } : folder
    );
    setFolders(updatedFolders);
    setEditingFolderId(null);
    setEditedFolderName("");
  };

  const deleteFolder = (id) => {
    setFolders(folders.filter((folder) => folder.id !== id));
  };

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const toggleSection = (section) => {
    setActiveSection(activeSection === section ? null : section);
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div className={`sidebar ${isCollapsed ? "collapsed" : ""}`}>
      <div className="questionbank-sidebar-header">
        <h1 className="sidebar-title">
          <FaDatabase className="db-icon" /> {/* Add the database icon */}
          QB Manager
        </h1>
        {/* <button onClick={toggleCollapse} className="collapse-button">
          <FontAwesomeIcon icon={isCollapsed ? faChevronDown : faChevronUp} />
        </button> */}
      </div>

      <div className="sidebar-content">
        {/* Unique Design Section */}
        <div className="unique-design">
          <FontAwesomeIcon icon={faUserCircle} className="unique-icon" />
          <p className="unique-text d-flex">
            Manage your Question Bank efficiently!
          </p>
        </div>

        <div
          className={`sidebar-section ${
            activeSection === "questionBank" ? "active" : ""
          }`}
        >
          <h2
            className="sidebar-heading"
            onClick={() => toggleSection("questionBank")}
          >
            Question Bank
            <FontAwesomeIcon icon={faChevronDown} className="section-icon" />
          </h2>
          <div className="section-content">
            <button onClick={openModal} className="sidebar-button ripple">
              <span className="sidebar-title2">
                <FontAwesomeIcon icon={faFolderPlus} className="newqbicon" />
                New QB
              </span>
            </button>

            <nav className="sidebar-nav">
              <Link
                to="/Questionbank"
                className={`sidebar-link ${
                  isActive("/Questionbank") ? "active" : ""
                }`}
              >
                <FontAwesomeIcon icon={faFolderOpen} className="sidebar-icon" />
                <span>All</span>
              </Link>
              <Link
                to="/Questionbank/archived"
                className={`sidebar-link ${
                  isActive("/Questionbank/archived") ? "active" : ""
                }`}
              >
                <FontAwesomeIcon icon={faArchive} className="sidebar-icon" />
                <span>Archived</span>
              </Link>
              <Link
                to="/Questionbank/Trashed"
                className={`sidebar-link ${
                  isActive("/Questionbank/Trashed") ? "active" : ""
                }`}
              >
                <FontAwesomeIcon icon={faTrash} className="sidebar-icon" />
                <span>Trashed</span>
              </Link>
            </nav>
          </div>
        </div>

        <div className="sidebar-divider"></div>

        <div
          className={`sidebar-section ${
            activeSection === "folders" ? "active" : ""
          }`}
        >
          <h2
            className="sidebar-heading"
            onClick={() => toggleSection("folders")}
          >
           Tags
            <FontAwesomeIcon icon={faChevronDown} className="section-icon" />
          </h2>
          <div className="section-content">
            <button onClick={addNewFolder} className="sidebar-button ripple">
              <FontAwesomeIcon icon={faFolderPlus} />
              <span>New Tag</span>
            </button>
<ul className="folder-list">
  {folders.map((folder) => (
    <li key={folder.id} className="folder-item">
      {/* Add the tag icon inside the list item */}
      <FaTag className="icon" style={{ color: folder.tagColor }} />
      
      {editingFolderId === folder.id ? (
        <input
          type="text"
          value={editedFolderName}
          onChange={(e) => setEditedFolderName(e.target.value)}
          onBlur={() => saveFolderName(folder.id)}
          onKeyPress={(e) =>
            e.key === "Enter" && saveFolderName(folder.id)
          }
          className="folder-edit-input"
          autoFocus
        />
      ) : (
        <span className="folder-name">{folder.name}</span>
      )}
      
      <div className="folder-actions">
        {editingFolderId === folder.id ? (
          <button
            onClick={() => saveFolderName(folder.id)}
            className="folder-action-button"
            aria-label="Save folder name"
          >
            <FontAwesomeIcon icon={faCheck} />
          </button>
        ) : (
          <>
            <button
              onClick={() =>
                startEditingFolder(folder.id, folder.name)
              }
              className="folder-action-button"
              aria-label="Edit folder name"
            >
              <FontAwesomeIcon icon={faEdit} />
            </button>
            <button
              onClick={() => deleteFolder(folder.id)}
              className="folder-action-button"
              aria-label="Delete folder"
            >
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </>
        )}
      </div>
    </li>
  ))}
</ul>

          </div>
        </div>
      </div>
      
    </div>
  );
};

export default Sidebar;
