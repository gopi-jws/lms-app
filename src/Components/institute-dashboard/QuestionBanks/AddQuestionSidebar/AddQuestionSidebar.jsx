import React, { useState } from "react";
import {
  FaPlus,
  FaListOl,
  FaListUl,
  FaCalculator,
  FaCheckSquare,
  FaParagraph,
  FaTrash,
  FaTags,
} from "react-icons/fa";
import "./AddQuestionSidebar.css";

const AddQuestionSidebar = () => {
  const [activeItem, setActiveItem] = useState(null);

  const questionTypes = [
    { name: "MCQ-1", icon: FaListOl },
    { name: "MCQ-2", icon: FaListUl },
    { name: "Numerical", icon: FaCalculator },
    { name: "True/False", icon: FaCheckSquare },
    { name: "Descriptive", icon: FaParagraph },
  ];

  const typeCounts = {
    "MCQ-1": 10,
    "MCQ-2": 5,
    Numerical: 3,
    "True/False": 7,
    Descriptive: 2,
  };

  return (
    <div className="add-question-sidebar">
      <button className="new-question-btn">
        <FaPlus /> New Question
      </button>

      <div className="sidebar-section">
        <h3>Question Types</h3>
        <ul>
          {questionTypes.map((type, index) => (
            <li
              key={index}
              className={activeItem === type.name ? "active" : ""}
              onClick={() => setActiveItem(type.name)}
            >
              <type.icon /> {type.name}
            </li>
          ))}
        </ul>
      </div>

      <div className="sidebar-section">
        <h3>Other</h3>
        <ul>
          <li
            className={activeItem === "Trashed" ? "active" : ""}
            onClick={() => setActiveItem("Trashed")}
          >
            <FaTrash /> Trashed
          </li>
        </ul>
      </div>

      <div className="sidebar-section">
        <h3>Types</h3>
        <ul>
          {Object.entries(typeCounts).map(([type, count], index) => (
            <li key={index}>
              <FaTags /> {type} ({count})
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AddQuestionSidebar;
