import React, { useState } from 'react';
import './TestQuestionAddSidebar.css';
import { FaChevronDown } from 'react-icons/fa'; 
import { Award, Hash, Clock } from "lucide-react";
import TestQuestionAdd from './TestQuestionAdd'; // Import TestQuestionAdd component
import { useTestContext } from "../TestContext"; 

const TestQuestionAddSidebar = () => {
  const [isQuestionBankDropdownOpen, setIsQuestionBankDropdownOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null); 
  const [marks, setMarks] = useState('');
  const [negativeMarks, setNegativeMarks] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [activeSection, setActiveSection] = useState(null);  
  const {setQuestionsToShow} = useTestContext();  // Questions for the selected section
  const [selectedBankIndex, setSelectedBankIndex] = useState(null); // Store selected bank index
  const [selectedSectionIndex, setSelectedSectionIndex] = useState(null);
  const [filteredQuestions, setFilteredQuestions] = useState([]); 


 
  const handleBankSelect = (bankIndex) => {
    setSelectedBankIndex(bankIndex);
    setSelectedSectionIndex(null); // Reset section when a new bank is selected
    setFilteredQuestions([]); // Reset questions

    const selectedBank = questionBanks[bankIndex];
    setQuestionsToShow(selectedBank.questions);
  };

  const handleSectionSelect = (sectionIndex) => {
    setSelectedSectionIndex(sectionIndex);
  
    const selectedBank = questionBanks[selectedBankIndex];
    const selectedSection = selectedBank.sections[sectionIndex]; // Get the name of the section
  
    // Filter questions based on the selected section
    const sectionQuestions = selectedBank.questions.filter(
      (question) => question.section === selectedSection
    );
  
    // Set filtered questions to show
    setFilteredQuestions(sectionQuestions);
  };
  // Add testInfo object
  const testInfo = {
    marks: 100,
    noOfQuestions: 50,
    negativeMarks: -0.25,
    duration: "2h",
  };

  const questionBanks = [
    {
      id: 1,
      name: 'Questionbank-1',
      questions: [
        { id: 1, question: 'What is React?', answer: 'React is a JavaScript library for building UIs.' },
        { id: 2, question: 'What is JSX?', answer: 'JSX is a syntax extension for JavaScript, used with React.' },
        { id: 3, question: 'What is Virtual DOM?', answer: 'Virtual DOM is an in-memory representation of the real DOM elements.' },
        { id: 4, question: 'What are React Hooks?', answer: 'Hooks are functions that let you use state and lifecycle features in functional components.' },
      ],
      sections:['section1','section2','section3','section4']
    },
    {
      id: 2,
      name: 'Questionbank-2',
      questions: [
        { id: 1, question: 'What is JavaScript?', answer: 'JavaScript is a programming language for web development.' },
        { id: 2, question: 'What is ES6?', answer: 'ES6 is the 6th version of ECMAScript, with features like let/const, arrow functions, and classes.' },
        { id: 3, question: 'Explain closures in JavaScript.', answer: 'Closures allow a function to access variables from its outer scope even after the outer function has returned.' },
        { id: 4, question: 'What is a promise in JavaScript?', answer: 'A promise is an object that represents the eventual completion (or failure) of an asynchronous operation.' },
      ],
      sections:['section1','section2','section3','section4']
    },
    {
      id: 3,
      name: 'Questionbank-3',
      questions: [
        { id: 1, question: 'What is Python?', answer: 'Python is a high-level, interpreted programming language.' },
        { id: 2, question: 'What are Python decorators?', answer: 'Decorators are a way to modify the behavior of a function or method.' },
        { id: 3, question: 'What is PEP 8?', answer: 'PEP 8 is the style guide for writing Python code.' },
        { id: 4, question: 'Explain Python’s GIL.', answer: 'The Global Interpreter Lock (GIL) is a mutex that protects access to Python objects in multi-threaded programs.' },
      ],
      sections:['section1','section2','section3','section4']
    },
    {
      id: 4,
      name: 'Questionbank-4',
      questions: [
        { id: 1, question: 'What is SQL?', answer: 'SQL is a language used for managing and querying relational databases.' },
        { id: 2, question: 'What is normalization in databases?', answer: 'Normalization organizes data to reduce redundancy and improve integrity.' },
        { id: 3, question: 'What are SQL joins?', answer: 'Joins are used to combine rows from two or more tables based on a related column.' },
        { id: 4, question: 'What is a primary key in SQL?', answer: 'A primary key uniquely identifies each record in a table.' },
      ],
      sections:['section1','section2','section3','section4']
    },
  ];
  

  // Define toggleDropdown function
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleQuestionBankDropdown = () => {
    setIsQuestionBankDropdownOpen(!isQuestionBankDropdownOpen);
    if (isQuestionBankDropdownOpen) {
      setSelectedBankIndex(null);  // Reset selected bank when dropdown closes
      setSelectedSectionIndex(null);  // Reset selected section when dropdown closes
    }
  };

  const toggleSectionDropdown = (index) => {
    // Toggle sections for the clicked question bank
    setActiveDropdown(activeDropdown === index ? null : index);
  };

  const handleMarkChange = (e) => {
    setMarks(e.target.value);
  };

  const handleNegativeMarkChange = (e) => {
    setNegativeMarks(e.target.value);
  };

  return (
    <div className="testquestionadd-sidebar">

      <div className="testquestionadd-sidebar-buttons">
        {/* New Question Button */}
        <button className="testquestionadd-sidebar-button">New Question</button>

        {/* Add from Question Bank Button */}
        <div className="testquestionadd-dropdown-container">
          <button className="testquestionadd-sidebaradd-button" onClick={toggleQuestionBankDropdown}>
            Add from Question Bank <FaChevronDown className="dropdown-icon" />
          </button>

          {isQuestionBankDropdownOpen && (
            <div className="testquestionadd-dropdown">
              {questionBanks.map((bank, bankIndex) => (
                <div key={bank.id}>
                  <button
                    className={`testquestionadd-dropdown-item ${selectedBankIndex === bankIndex ? "active" : ""}`}
                    onClick={() => handleBankSelect(bankIndex)}
                  >
                    {bank.name}
                  </button>

                  {/* Show sections if this bank is selected */}
                  {selectedBankIndex === bankIndex && (
                    <div className="testquestionadd-dropdown-submenu">
                      {bank.sections.map((section, sectionIndex) => (
                        <button
                          key={sectionIndex}
                          className={`testquestionadd-dropdown-item ${selectedSectionIndex === sectionIndex ? "active" : ""}`}
                          onClick={() => handleSectionSelect(sectionIndex)}
                        >
                          {section}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
     
        {/* Section View Button */}
        <button className="testquestionadd-sidebar-button testquestionadd-section-view-button">
          View
        </button>
      </div>

      <hr />

      <div className="testquestionadd-marks-section">
        <div className="testquestionadd-input-container">
          <label>Selected</label>
          <input
            type="number"
            value={marks}
            onChange={handleMarkChange}
            placeholder='50'
          />
        </div>

        <div className="testquestionadd-input-container">
          <label>Total Mark</label>
          <input
            type="number"
            value={marks}
            onChange={handleMarkChange}
            placeholder='100'
          />
        </div>

        {/* Negative Mark input field */}
        <div className="testquestionadd-input-container">
          <label>Negative Mark (one question)</label>
          <input
            type="number"
            value={negativeMarks}
            onChange={handleNegativeMarkChange}
            placeholder='2'
          />
        </div>

        {/* Dropdown for Sections */}
        <div className="testquestionadd-container">
          <button
            className={`testquestionadd-sections-button ${isDropdownOpen ? "open" : ""}`}
            onClick={toggleDropdown}
          >
            Sections
          </button>

          {isDropdownOpen && (
            <div className="testquestionadd-sections-dropdown">
              <div className="testquestionadd-dropdown-item">Section 1</div>
              <div className="testquestionadd-dropdown-item">Section 2</div>
              <div className="testquestionadd-dropdown-item">Section 3</div>
              <div className="testquestionadd-dropdown-item">Section 4</div>
            </div>
          )}
        </div>

        {/* Add to Test Button */}
        <button className="testquestionadd-sidebar-button">Add to Test</button>
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

export default TestQuestionAddSidebar;
