import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaPlus,
  FaFileAlt,
  FaShare,
  FaPaperPlane,
  FaArchive,
  FaTrash,
  FaTag,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";
import "./TestSidebar.css";

const TestSidebar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
  const [testName, setTestName] = useState(""); // Test name input value
   const [duration, setDuration] = useState("");
  const [description, setDescription] = useState("");
  const [instruction, setInstruction] = useState("");
  const [isTestsVisible, setIsTestsVisible] = useState(true); // State to toggle Tests section visibility
  const [tags, setTags] = useState(["Important", "Work", "Personal", "Study"]); // Tags state
  const location = useLocation();
 const [isAddButtonEnabled, setIsAddButtonEnabled] = useState(false); // New state for enabling/disabling button
  const isActive = (path) => location.pathname === path; // Check if current path matches the link path
const isFormValid = testName && duration && description && instruction; 
  // Function to open the modal
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  // Function to close the modal and reset input
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTestName(""); // Reset input field
  };
 // Check if all fields are filled and enable the button accordingly
  useEffect(() => {
    if (testName && duration && description && instruction) {
      setIsAddButtonEnabled(true); // Enable button when all fields are filled
    } else {
      setIsAddButtonEnabled(false); // Disable button if any field is empty
    }
  }, [testName, duration, description, instruction]); // Run this check every time any of the fields change

  // Function to handle test creation
  const handleCreateTest = () => {
    if (testName.trim() !== "") {
      console.log("Test Created:", { testName, duration, description, instruction });
      // Add logic to save the test here
    }
    handleCloseModal();
  };

  // Toggle Tests visibility
  const toggleTestsVisibility = () => {
    setIsTestsVisible(!isTestsVisible);
  };

  useEffect(() => {
    console.log("Modal Open State Changed:", isModalOpen);
  }, [isModalOpen]);
 
  return (
    <nav className="test-sidebar-container" aria-label="Main Navigation">
      <div className="test-sidebar-header">
        <button
          onClick={handleOpenModal}
          className="test-sidebar-button new-test-button test-sidebar-button2"
          aria-label="Create New Test"
        >
          <FaPlus className="icon" />
          <span className="sidespan">New Test</span>
        </button>
      </div>

      {/* Modal for Creating New Test */}
       {isModalOpen && (
        <div className="newtest-modal-overlay">
          <div className="newtest-modal">
            <h2>Create New Test</h2>

            {/* Test Name */}
            <input
              type="text"
              placeholder="Test Name"
              value={testName}
              onChange={(e) => setTestName(e.target.value)}
              className="newtest-modal-input"
            />

            {/* Duration */}
            <input
              type="text"
              placeholder="Duration"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="newtest-modal-input"
            />

            {/* Description */}
            <textarea
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="newtest-modal-textarea"
            />

            {/* Instruction */}
            <textarea
              placeholder="Instructions"
              value={instruction}
              onChange={(e) => setInstruction(e.target.value)}
              className="newtest-modal-textarea"
            />

            <div className="newtest-modal-actions">
              <button
                onClick={handleCreateTest}
                className="newtest-modal-button create"
                 disabled={!isAddButtonEnabled} // Disable button if not enabled
                 data-tooltip={!isFormValid ? "Please fill out all fields." : ""}
              >
               Create
              </button>
              <button
                onClick={handleCloseModal}
                className="newtest-modal-button cancel"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="test-sidebar-section">
        <h3
          className="test-sidebar-section-title"
          onClick={toggleTestsVisibility}
          style={{ cursor: "pointer" }}
        >
          Tests{" "}
          {isTestsVisible ? (
            <FaChevronUp className="toggle-icon" />
          ) : (
            <FaChevronDown className="toggle-icon" />
          )}
        </h3>
        {isTestsVisible && (
          <ul className="test-sidebar-menu">
            <li>
              <Link
                to="Alltest"
                className={`test-sidebar-button ${
                  isActive("Alltest") ? "active" : ""
                }`}
                aria-label="All Tests"
              >
                <FaFileAlt className="icon" />
                <span className="sidespan">All Tests</span>
              </Link>
            </li>
            <li>
              <Link
                to="shared-with-me"
                className={`test-sidebar-button ${
                  isActive("shared-with-me") ? "active" : ""
                }`}
                aria-label="Shared with me"
              >
                <FaShare className="icon" />
                <span className="sidespan">Shared with me</span>
              </Link>
            </li>
            <li>
              <Link
                to="dispatched"
                className={`test-sidebar-button ${
                  isActive("dispatched") ? "active" : ""
                }`}
                aria-label="Dispatched"
              >
                <FaPaperPlane className="icon" />
                <span className="sidespan">Published</span>
              </Link>
            </li>
            <li>
              <Link
                to="undispatched"
                className={`test-sidebar-button ${
                  isActive("undispatched") ? "active" : ""
                }`}
                aria-label="Undispatched"
              >
                <FaPaperPlane className="icon" />
                <span className="sidespan">Un Dispatched</span>
              </Link>
            </li>
            <li>
              <Link
                to="archived"
                className={`test-sidebar-button ${
                  isActive("archived") ? "active" : ""
                }`}
                aria-label="Archived"
              >
                <FaArchive className="icon" />
                <span className="sidespan">Archived</span>
              </Link>
            </li>
            <li>
              <Link
                to="trashed"
                className={`test-sidebar-button ${
                  isActive("trashed") ? "active" : ""
                }`}
                aria-label="Trashed"
              >
                <FaTrash className="icon" />
                <span className="sidespan">Trashed</span>
              </Link>
            </li>
          </ul>
        )}
      </div>

      <hr className="sidebar-divider" />

      <div className="sidebar-section">
        <button
          // onClick={handleOpenModal}
          className="test-sidebar-button new-test-button test-sidebar-button2"
          aria-label="Create New Test"
        >
          <FaPlus className="icon" />
          <span className="sidespan">New Tags</span>
        </button>
        <ul className="test-sidebar-menu tags">
          {tags.map((tag, index) => (
            <li key={index}>
              <Link
                to={`/tag/${tag.toLowerCase()}`}
                className={`test-sidebar-button ${
                  isActive(`/tag/${tag.toLowerCase()}`) ? "active" : ""
                }`}
                aria-label={`Tag: ${tag}`}
              >
                <FaTag className="icon" />
                <span className="sidespan">{tag}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default TestSidebar;
