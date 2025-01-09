import React, { useState } from 'react';
import './TestAddSideabr.css';
import { PlusCircle, FileQuestion, Calculator, ToggleLeft, AlignLeft, Layers, Tag, Clock, Award, Hash } from 'lucide-react';
import QuestionBankPopup from '../QuestionBankPopup/QuestionBankPopup';

const TestAddSidebar = () => {
  const [activeItem, setActiveItem] = useState('MCQ-1');
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleItemClick = (item) => {
    setActiveItem(item);
  };

  const handleAddFromQuestionBank = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const handleAddQuestions = (data) => {
    console.log('Added questions:', data);
    // Here you would typically update your state or send data to a parent component
  };

  const questionTypes = [
    { name: 'MCQ-1', icon: <FileQuestion size={18} /> },
    { name: 'MCQ-2', icon: <FileQuestion size={18} /> },
    { name: 'Numerical', icon: <Calculator size={18} /> },
    { name: 'True/False', icon: <ToggleLeft size={18} /> },
    { name: 'Descriptive', icon: <AlignLeft size={18} /> },
  ];

  const sections = [
    { name: 'Section 1', tag: 'Physics' },
    { name: 'Section 2', tag: 'Chemistry' },
    { name: 'Section 3', tag: 'Math' },
  ];

  return (
    <div className="test-add-sidebar">
      <button className="test-add-sidebar-button">
        <PlusCircle size={18} />
        New Question
      </button>

      <div className="test-add-sidebar-section">
        <h3 className="test-add-sidebar-title">Question Types</h3>
        <ul className="test-add-sidebar-list">
          {questionTypes.map((item) => (
            <li
              key={item.name}
              className={`test-add-sidebar-item ${activeItem === item.name ? 'active' : ''}`}
              onClick={() => handleItemClick(item.name)}
            >
              {item.icon}
              {item.name}
            </li>
          ))}
        </ul>
      </div>

      <button className="test-add-sidebar-button" onClick={handleAddFromQuestionBank}>
        <Layers size={18} />
        Add from Question Bank
      </button>

      <div className="test-add-sidebar-section">
        <h3 className="test-add-sidebar-title">Sections</h3>
        <ul className="test-add-sidebar-list">
          <li className="test-add-sidebar-item">
            <PlusCircle size={18} />
            New Section 
          </li>
          {sections.map((section, index) => (
            <li key={section.name} className="test-add-sidebar-item">
              <Tag size={18} />
              {section.name}
              <span className="test-add-sidebar-tag">{section.tag}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="test-add-sidebar-section pb-5">
        <h3 className="test-add-sidebar-title">Test Information</h3>
        <div className="test-add-sidebar-info">
          <div className="test-add-sidebar-info-item">
            <Award size={16} />
            <span>Marks: 100</span>
          </div>
          <div className="test-add-sidebar-info-item">
            <Hash size={16} />
            <span>No. of Q: 50</span>
          </div>
        </div>
        <div className="test-add-sidebar-info">
          <div className="test-add-sidebar-info-item">
            <Award size={16} />
            <span>Neg: -0.25</span>
          </div>
          <div className="test-add-sidebar-info-item">
            <Clock size={16} />
            <span>Duration: 2h</span>
          </div>
        </div>
      </div>

      {isPopupOpen && (
        <QuestionBankPopup onClose={handleClosePopup} onAdd={handleAddQuestions} />
      )}
    </div>
  );
};

export default TestAddSidebar;

