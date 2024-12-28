 import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FaFolderPlus } from "react-icons/fa"; // Correct import for FaFolderPlus

import {
  FaListOl,
  FaListUl,
  FaCalculator,
  FaCheckSquare,
  FaParagraph,
  FaTimes,
  FaTrash,
  FaTags,
 // Add this line
} from "react-icons/fa";

import "./AddQuestionSidebar.css";

const AddQuestionSidebar = () => {
  const [activeItem, setActiveItem] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [question, setQuestion] = useState("");
  const [answer1, setAnswer1] = useState("");
  const [answer2, setAnswer2] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState(null);
  const [img1, setImg1] = useState(null);
  const [img2, setImg2] = useState(null);
  const [questionType, setQuestionType] = useState(null); // Store selected question type

  const handleFileChange = (e, setImg) => {
    const file = e.target.files[0];
    if (file) {
      setImg(URL.createObjectURL(file));
    }
  };

  const handleChange = (e, setter) => {
    const value =
      e.target.type === "number" ? parseFloat(e.target.value) : e.target.value;
    setter(value);
  };

  // Reset state when switching between question types
  const resetStateForNewQuestionType = (type) => {
    setQuestionType(type);
    setQuestion("");
    setAnswer1("");
    setAnswer2("");
    setCorrectAnswer(null);
    setImg1(null);
    setImg2(null);
  };

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

  const renderPopupContent = () => {
    switch (questionType) {
      case "MCQ-1":
      case "MCQ-2":
        return (
          <>
            <div className="form-group">
              <label htmlFor="answer1">Answer 1:</label>
              <input
                type="text"
                id="answer1"
                value={answer1}
                onChange={(e) => handleChange(e, setAnswer1)}
                placeholder="Enter answer 1"
                required
              />
              <div className="file-input-wrapper">
                <button className="file-input-button">Choose Image</button>
                <input
                  type="file"
                  onChange={(e) => handleFileChange(e, setImg1)}
                  accept="image/*"
                />
              </div>
              {img1 && <img src={img1} alt="Answer 1" className="answer-img" />}
            </div>

            <div className="form-group">
              <label htmlFor="answer2">Answer 2:</label>
              <input
                type="text"
                id="answer2"
                value={answer2}
                onChange={(e) => handleChange(e, setAnswer2)}
                placeholder="Enter answer 2"
                required
              />
              <div className="file-input-wrapper">
                <button className="file-input-button">Choose Image</button>
                <input
                  type="file"
                  onChange={(e) => handleFileChange(e, setImg2)}
                  accept="image/*"
                />
              </div>
              {img2 && <img src={img2} alt="Answer 2" className="answer-img" />}
            </div>

            <div className="form-group">
              <label htmlFor="correctAnswer">Correct Answer:</label>
              <select
                id="correctAnswer"
                onChange={(e) => setCorrectAnswer(e.target.value)}
                value={correctAnswer || ""}
              >
                <option value="">Select Answer</option>
                <option value="Answer 1">Answer 1</option>
                <option value="Answer 2">Answer 2</option>
              </select>
            </div>
          </>
        );

      case "Numerical":
        return (
          <div className="form-group">
            <label htmlFor="correctAnswer">Correct Answer:</label>
            <input
              type="number"
              id="correctAnswer"
              value={correctAnswer || ""}
              onChange={(e) => setCorrectAnswer(e.target.value)}
              placeholder="Enter correct numerical answer"
              required
            />
          </div>
        );

      case "True/False":
        return (
          <div className="form-group">
            <label htmlFor="correctAnswer">Correct Answer:</label>
            <select
              id="correctAnswer"
              onChange={(e) => setCorrectAnswer(e.target.value)}
              value={correctAnswer || ""}
            >
              <option value="">Select Answer</option>
              <option value="True">True</option>
              <option value="False">False</option>
            </select>
          </div>
        );

      case "Descriptive":
        return (
          <div className="form-group">
            <label htmlFor="correctAnswer">Model Answer:</label>
            <textarea
              id="correctAnswer"
              value={correctAnswer || ""}
              onChange={(e) => setCorrectAnswer(e.target.value)}
              placeholder="Enter model answer for descriptive question"
              required
            />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="add-question-sidebar">
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup">
            <div className="popup-header">
              <h2>Add New Question</h2>
              <button className="close-btn" onClick={() => setShowPopup(false)}>
                <FaTimes />
              </button>
            </div>
            <div className="popup-content">
              <div className="form-section">
                <div className="form-group">
                  <label htmlFor="question">Question:</label>
                  <input
                    type="text"
                    id="question"
                    value={question}
                    onChange={(e) => handleChange(e, setQuestion)}
                    placeholder="Enter your question"
                    required
                  />
                </div>

                {renderPopupContent()}

                <button
                  className="submit-btn"
                  onClick={() => alert("Question Submitted")}
                >
                  Submit
                </button>
              </div>

              <div className="preview-section">
                <h3>Preview</h3>
                <div className="preview-content">
                  <h4>{question || "Your question will appear here"}</h4>
                  {questionType === "MCQ-1" || questionType === "MCQ-2" ? (
                    <>
                      <p className="answer">
                        Answer 1: {answer1 || "Not provided"}
                      </p>
                      {img1 && (
                        <img
                          src={img1}
                          alt="Answer 1"
                          className="preview-img"
                        />
                      )}
                      <p className="answer">
                        Answer 2: {answer2 || "Not provided"}
                      </p>
                      {img2 && (
                        <img
                          src={img2}
                          alt="Answer 2"
                          className="preview-img"
                        />
                      )}
                    </>
                  ) : null}
                  <p className="correct-answer">
                    Correct Answer: {correctAnswer || "Not selected"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="add-sidebar-section">
        <div className="add-sidebar-header">
          <h2 className="addnew-question add-sidebar-title">
            New Question
            <FaFolderPlus className="newqbicon2" />
          </h2>
        </div>

        <h3 className="pt-4">Question Types</h3>
        <ul>
          {questionTypes.map((type, index) => (
            <li
              key={index}
              className={activeItem === type.name ? "active" : ""}
              onClick={() => {
                setActiveItem(type.name);
                resetStateForNewQuestionType(type.name);
                setShowPopup(true);
              }}
            >
              <type.icon /> {type.name}
            </li>
          ))}
        </ul>
      </div>

      <div className="add-sidebar-section">
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

      <div className="add-sidebar-section">
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