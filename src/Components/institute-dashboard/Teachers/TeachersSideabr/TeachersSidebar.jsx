import React, { useState, useEffect } from 'react';
import './TeachersSidebar.css';
import { FaChalkboardTeacher, FaBook, FaCalendarAlt, FaUsers, FaClipboardList, FaCog, FaUserPlus, FaTrash } from 'react-icons/fa';
import AddTeachersModal from '../AddTeachersModal/AddTeachersModal';

const TeachersSidebar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
  const [testName, setTestName] = useState(""); // Test name input value
  const [emails, setEmails] = useState(''); // State to manage emails input
  const [isTestsVisible, setIsTestsVisible] = useState(true); // State to toggle Tests section visibility
  const [activeLink, setActiveLink] = useState(''); // State for active link

  // Function to open the modal
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  // Function to close the modal and reset input
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTestName(""); // Reset input field
  };

  // Function to handle test creation
  const handleCreateTest = () => {
    if (testName.trim() !== "") {
      console.log("New Test Created:", testName);
      // Add logic to save the test here
    }
    handleCloseModal();
  };

  // Toggle Tests visibility
  const toggleTestsVisibility = () => {
    setIsTestsVisible(!isTestsVisible);
  };

  // Function to handle active link change
  const handleLinkClick = (link) => {
    setActiveLink(link); // Set the active link
  };

  useEffect(() => {
    console.log("Modal Open State Changed:", isModalOpen);
  }, [isModalOpen]);

  return (
    <>
      <div className="teachers-sidebar">
        <button className="toggle-btn">
        </button>
        <div className="sidebar-header">
          <FaChalkboardTeacher className="header-icon" />
          <h2 className='teachers-portal'>Teacher's Portal</h2>
        </div>
        <nav className="teachers-sidebar-nav">
          <ul>
            <li className={`add-teachers ${activeLink === 'addTeachers' ? '' : ''}`}>
              <a href="#" onClick={() => { handleLinkClick('addTeachers'); handleOpenModal(); }}>
                <FaUserPlus /> Add Teachers
              </a>
            </li>
            {/* Modal for Creating New Test */}
            {isModalOpen && (
              <div className="newtest-modal-overlay">
                <div className="newtest-modal">
                  <h2>Add New Teachers</h2>
                  <textarea
                    value={emails}
                    onChange={(e) => setEmails(e.target.value)}
                    placeholder="Enter emails, separated by commas"
                    rows="4"
                    className="modal-textarea"
                  />
                  <div className="newtest-modal-actions">
                    <button
                      onClick={handleCreateTest}
                      className="newtest-modal-button create"
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
            <li className={`${activeLink === 'allTeachers' ? 'active' : ''}`}><a href="#dashboard" onClick={() => handleLinkClick('allTeachers')}><FaUsers /> All Teachers</a></li>
            <li className={`${activeLink === 'trashed' ? 'active' : ''}`}><a href="#schedule" onClick={() => handleLinkClick('trashed')}><FaTrash /> Trashed</a></li>
            <li className={`${activeLink === 'settings' ? 'active' : ''}`}><a href="#settings" onClick={() => handleLinkClick('settings')}><FaCog /> Settings</a></li>
          </ul>
        </nav>
        <hr />
      </div>
    </>
  );
};

export default TeachersSidebar;
