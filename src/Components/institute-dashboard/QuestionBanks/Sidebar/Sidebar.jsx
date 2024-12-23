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

const Sidebar = ({ openModal }) => {
  const [folders, setFolders] = useState(() => {
    const storedFolders = localStorage.getItem("folders");
    return storedFolders ? JSON.parse(storedFolders) : [];
  });

  const [editingFolderId, setEditingFolderId] = useState(null);
  const [editedFolderName, setEditedFolderName] = useState("");

  useEffect(() => {
    localStorage.setItem("folders", JSON.stringify(folders));
  }, [folders]);

  const addNewFolder = () => {
    const newFolder = {
      id: Date.now(),
      name: `New Folder ${folders.length + 1}`,
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

  return (
    <div className="sidebar">
      <div className="sidebar-section">
        <h2 className="sidebar-heading">Question Bank</h2>
        <button onClick={openModal} className="sidebar-button">
          <FontAwesomeIcon icon={faFolderPlus} />
          <span>New QB</span>
        </button>
      </div>

      <nav className="sidebar-nav">
        <Link to="/Questionbank" className="sidebar-link">
          <FontAwesomeIcon icon={faFolderOpen} className="sidebar-icon" />
          <span>All</span>
        </Link>
        <Link to="/Questionbank/archived" className="sidebar-link">
          <FontAwesomeIcon icon={faArchive} className="sidebar-icon" />
          <span>Archived</span>
        </Link>
        <Link to="/Questionbank/Trashed" className="sidebar-link">
          <FontAwesomeIcon icon={faTrash} className="sidebar-icon" />
          <span>Trashed</span>
        </Link>
      </nav>

      <div className="sidebar-divider"></div>

      <div className="sidebar-section">
        <h2 className="sidebar-heading">Folders</h2>
        <button onClick={addNewFolder} className="sidebar-button">
          <FontAwesomeIcon icon={faFolderPlus} />
          <span>New Folder</span>
        </button>
      </div>

      <ul className="folder-list">
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
                    onClick={() => startEditingFolder(folder.id, folder.name)}
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

      <div className="sidebar-divider"></div>

      {/* <div className="sidebar-section">
        <h2 className="sidebar-heading">Profile Info</h2>
        <nav className="sidebar-nav">
          <Link to="/profile" className="sidebar-link">
            <FontAwesomeIcon icon={faUserCircle} className="sidebar-icon" />
            <span>Profile</span>
          </Link>
          <Link to="/info" className="sidebar-link">
            <FontAwesomeIcon icon={faUser} className="sidebar-icon" />
            <span>Info</span>
          </Link>
        </nav>
      </div> */}
    </div>
  );
};

export default Sidebar;
