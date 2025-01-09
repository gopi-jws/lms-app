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
  FaPlus
} from "react-icons/fa";

import "./AddQuestionSidebar.css";

const AddQuestionSidebar = () => {
  const [activeItem, setActiveItem] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [question, setQuestion] = useState("");
  const [answers, setAnswers] = useState([{ text: "", image: null }]); // Dynamic answer fields
  const [correctAnswer, setCorrectAnswer] = useState(null);
  const [questionType, setQuestionType] = useState(null); // Store selected question type
  const [questionImage, setQuestionImage] = useState(null); // Store question image
  const [isLatex, setIsLatex] = useState(false); // State for toggling between Latex and Code

  const handleFileChange = (e, index) => {
    const file = e.target.files[0];
    if (file) {
      const newAnswers = [...answers];
      newAnswers[index].image = URL.createObjectURL(file); // Set the image URL
      setAnswers(newAnswers);
    }
  };

  const handleQuestionImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setQuestionImage(URL.createObjectURL(file)); // Set the question image URL
    }
  };

  const handleAnswerChange = (e, index) => {
    const newAnswers = [...answers];
    newAnswers[index].text = e.target.value;
    setAnswers(newAnswers);
  };

  const addAnswerField = () => {
    setAnswers([...answers, { text: "", image: null }]);
  };

  const removeAnswerField = (indexToRemove) => {
    setAnswers((prevAnswers) => prevAnswers.filter((_, index) => index !== indexToRemove));
  };

  // Reset state when switching between question types
  const resetStateForNewQuestionType = (type) => {
    setQuestionType(type);
    setQuestion("");
    setAnswers([{ text: "", image: null }]);
    setCorrectAnswer(null);
    setQuestionImage(null); // Reset question image when changing type
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
            {answers.map((answer, index) => (
              <div key={index} className="form-group">
                <label htmlFor={`answer${index + 1}`}>Answer {index + 1}:</label>
                <input
                  type="text"
                  id={`answer${index + 1}`}
                  value={answer.text}
                  onChange={(e) => handleAnswerChange(e, index)}
                  placeholder={`Enter answer ${index + 1}`}
                  required
                />
                <div className="file-input-wrapper">
                  <button className="file-input-button">Choose Image</button>
                  <input
                    type="file"
                    onChange={(e) => handleFileChange(e, index)} // Use handleFileChange here
                    accept="image/*"
                  />
                </div>

                {answer.image && (
                  <img src={answer.image} alt={`Answer ${index + 1}`} className="answer-img" />
                )}

                {answers.length > 2 && (
                  <button
                    className="remove-answer-btn"
                    onClick={() => removeAnswerField(index)}
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
            <button className="add-answer-btn" onClick={addAnswerField}>
              <FaPlus className="add-icon" />
            </button>

            <div className="form-group">
              <label htmlFor="correctAnswer">Correct Answer:</label>
              <select
                id="correctAnswer"
                onChange={(e) => setCorrectAnswer(e.target.value)}
                value={correctAnswer || ""}
              >
                <option value="">Select Answer</option>
                {answers.map((_, index) => (
                  <option key={index} value={`Answer ${index + 1}`}>
                    Answer {index + 1}
                  </option>
                ))}
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
              {/* Toggle Button for Latex / Code */}
               <div className="toggle-switch-container">
      <span className={`toggle-text ${isLatex ? "active" : ""}`}>Latex Mode</span>
      <label className="switch">
        <input type="checkbox" checked={isLatex} onChange={() => setIsLatex(!isLatex)} />
        <span className="slider"></span>
      </label>
      <span className={`toggle-text ${!isLatex ? "active" : ""}`}>Code Mode</span>
    </div>

            <div className="popup-content">
              <div className="form-section">
                <div className="form-group">
                  <label htmlFor="question">Question:</label>
                  <input
                    type="text"
                    id="question"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    placeholder="Enter your question"
                    required
                  />
                  <div className="file-input-wrapper">
                    <button className="file-input-button">Choose Image</button>
                    <input
                      type="file"
                      onChange={handleQuestionImageChange} // Handle image for question
                      accept="image/*"
                    />
                  </div>

                  {questionImage && (
                    <img src={questionImage} alt="Question" className="question-img-preview" />
                  )}
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
                  {questionImage && (
                    <img
                      src={questionImage}
                      alt="Preview of question"
                      className="preview-img"
                    />
                  )}
                  {questionType === "MCQ-1" || questionType === "MCQ-2" ? (
                    answers.map((answer, index) => (
                      <div key={index}>
                        <p className="answer">
                          Answer {index + 1}: {answer.text || "Not provided"}
                        </p>
                        {answer.image && (
                          <img
                            src={answer.image}
                            alt={`Answer ${index + 1}`}
                            className="preview-img"
                          />
                        )}
                      </div>
                    ))
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
