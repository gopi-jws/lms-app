import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserCircle,
  faUser,
  faFolderPlus,
  faEdit,
  faTrash,
  faFolderOpen,
  faArchive,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import "./Sidebar.css";

const Sidebar = () => {
  const [folders, setFolders] = useState(() => {
    // Load folders from localStorage on the first render
    const storedFolders = localStorage.getItem("folders");
    return storedFolders ? JSON.parse(storedFolders) : [];
  });

  const [editingFolderId, setEditingFolderId] = useState(null);
  const [editedFolderName, setEditedFolderName] = useState("");

  // Save folders to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("folders", JSON.stringify(folders));
  }, [folders]);

  // Add a new folder dynamically
  const addNewFolder = () => {
    const newFolder = {
      id: Date.now(), // Unique ID for each folder
      name: `New Folder ${folders.length + 1}`, // Default name
    };
    setFolders([...folders, newFolder]);
  };

  // Start editing a folder
  const startEditingFolder = (id, name) => {
    setEditingFolderId(id);
    setEditedFolderName(name);
  };

  // Save the renamed folder
  const saveFolderName = (id) => {
    const updatedFolders = folders.map((folder) =>
      folder.id === id ? { ...folder, name: editedFolderName } : folder
    );
    setFolders(updatedFolders);
    setEditingFolderId(null);
    setEditedFolderName("");
  };

  // Delete a folder
  const deleteFolder = (id) => {
    setFolders(folders.filter((folder) => folder.id !== id));
  };

  return (
    <div className="sidebar">
      {/* Question Bank Section */}
      <h2 className="sidebar-heading questionbank">New QB</h2>
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
          <Link to="/Trashed">
            <FontAwesomeIcon icon={faTrash} className="sidebar-icon" /> Trashed
          </Link>
        </li>
      </ul>

      <hr />

      {/* New Folder Section */}
      <div className="new-folder-section">
        <span className="new-folder-text">New Folder</span>
        <button onClick={addNewFolder} className="new-folder-button">
          <FontAwesomeIcon icon={faFolderPlus} />
        </button>
      </div>

      {/* Dynamically Created Folders */}
      <ul className="sidebar-list">
        {folders.map((folder) => (
          <li key={folder.id} className="folder-item">
            {editingFolderId === folder.id ? (
              <input
                type="text"
                value={editedFolderName}
                onChange={(e) => setEditedFolderName(e.target.value)}
                className="folder-edit-input"
                autoFocus
              />
            ) : (
              <span className="folder-name">{folder.name}</span>
            )}
            <div className="folder-options">
              {editingFolderId === folder.id ? (
                <button
                  onClick={() => saveFolderName(folder.id)}
                  className="icon-button"
                >
                  <FontAwesomeIcon icon={faCheck} />
                </button>
              ) : (
                <>
                  <button
                    onClick={() => startEditingFolder(folder.id, folder.name)}
                    className="icon-button"
                  >
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                  <button
                    onClick={() => deleteFolder(folder.id)}
                    className="icon-button"
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </>
              )}
            </div>
          </li>
        ))}
      </ul>

      {/* Profile Info Section */}
      <h2 className="sidebar-heading">Profile Info</h2>
      <ul className="sidebar-list">
        <li>
          <Link to="/profile">
            <FontAwesomeIcon icon={faUserCircle} /> Profile
          </Link>
        </li>
        <li>
          <Link to="/info">
            <FontAwesomeIcon icon={faUser} /> Info
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
