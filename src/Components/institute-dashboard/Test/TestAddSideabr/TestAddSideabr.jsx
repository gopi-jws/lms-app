import React, { useState } from "react";
import "./TestAddSideabr.css";
import { PlusCircle, Tag, Award, Hash, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const TestAddSidebar = () => {

  const { id } = useParams(); 

  const navigate=useNavigate()

  const handleNewQuestionClick = () => {
    const id = "1";  
    navigate(`/test/${id}/movetest/testquestionadd`);
  };


  const initialSections = [
    { name: "Physics", tag: "Physics", color: "#ff6b6b" },
    { name: "Chemistry", tag: "Chemistry", color: "#4caf50" },
    { name: "Maths", tag: "Math", color: "#2196f3" },
  ];

  const [sections, setSections] = useState(initialSections); // State for sections
  const [newSection, setNewSection] = useState({ name: "", color: "#000000" }); // State for new section
  const [dropdownOpen, setDropdownOpen] = useState(false); // State for dropdown visibility
  const [isPopupOpen, setIsPopupOpen] = useState(false); // State for popup visibility

  const [testInfo] = useState({
    marks: 100,
    noOfQuestions: 50,
    negativeMarks: -0.25,
    duration: "2h",
  });


  // Handle adding a new section
  const handleAddSection = () => {
    if (newSection.name.trim() === "") {
      alert("Please enter a section name.");
      return;
    }

    setSections([
      ...sections,
      {
        name: newSection.name,
        tag: newSection.name,
        color: newSection.color,
      },
    ]);

    // Reset new section inputs and close dropdown
    setNewSection({ name: "", color: "#000000" });
    setDropdownOpen(false);
  };

  return (
    <div className="test-add-sidebar">
      {/* Buttons */}
      <button
        className="test-add-sidebar-button"
        onClick={handleNewQuestionClick} // Call navigation function
      >
        Add Question
      </button>

      <button className="test-add-sidebar-button">Snap Shot</button>

      <hr />

      {/* Sections */}
      <div className="test-add-sidebar-section">
        <h3 className="test-add-sidebar-title">Sections</h3>
        <ul className="test-add-sidebar-list">
          {/* New Section Button */}
          <li
            className="test-add-sidebar-item"
            onClick={() => setDropdownOpen(!dropdownOpen)}
            style={{ cursor: "pointer" }}
          >
            <PlusCircle size={18} />
            New Section
          </li>

          {dropdownOpen && (
            <>
              {/* Backdrop with filter for blur effect */}
              <div
                className="dropdown-backdrop"
                onClick={() => setDropdownOpen(false)} // Close the dropdown when clicked
              />
              <div className="new-section-dropdown">
                <input
                  type="text"
                  placeholder="Enter section name"
                  value={newSection.name}
                  onChange={(e) =>
                    setNewSection({ ...newSection, name: e.target.value })
                  }
                  className="new-section-input"
                />
                <div>
                  <label>Select Color:</label>
                  <input
                    type="color"
                    value={newSection.color}
                    onChange={(e) =>
                      setNewSection({ ...newSection, color: e.target.value })
                    }
                    className="color-picker"
                  />
                </div>
                <div className="d-flex">
                  <button
                    className="add-section-btn"
                    onClick={handleAddSection}
                  >
                    Add Section
                  </button>

                  <button
                    className="add-section-close-btn"
                    onClick={() => setDropdownOpen(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </>
          )}

          {/* List of existing sections */}
          {sections.map((section) => (
            <li key={section.name} className="test-add-sidebar-item">
              <Tag size={18} style={{ color: section.color }} />
              {section.name}
            </li>
          ))}
        </ul>
      </div>

      <hr />

      {/* Test Information */}
      <div className="test-add-sidebar-section pb-5">
        <h3 className="test-add-sidebar-title">Test Information</h3>
        <div className="test-add-sidebar-info">
          <div className="test-add-sidebar-info-item highlight">
            <Award size={16} />
            <span>Marks: {testInfo.marks}</span>
          </div>
          <div className="test-add-sidebar-info-item">
            <Hash size={16} />
            <span>No. of Q: {testInfo.noOfQuestions}</span>
          </div>
          <div className="test-add-sidebar-info-item">
            <Award size={16} />
            <span>Neg: {testInfo.negativeMarks}</span>
          </div>
          <div className="test-add-sidebar-info-item">
            <Clock size={16} />
            <span>Duration: {testInfo.duration}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestAddSidebar;
