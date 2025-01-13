import React, { useState } from "react";
import { FaSearch, FaPlus, FaArrowLeft  } from "react-icons/fa";
import DataTable from "react-data-table-component";
import "./TestQuestionAdd.css";
import { useTestContext } from "../TestContext";
import { useNavigate } from "react-router-dom";
import {Link,useParams } from 'react-router-dom'


const TestQuestionAdd = () => {
  const { questionsToShow } = useTestContext();

  const { id } = useParams();

  const navigate = useNavigate();

  // State for checkbox selection
  const [selectedQuestionIds, setSelectedQuestionIds] = useState([]);
  const [isSelectAllChecked, setIsSelectAllChecked] = useState(false);
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  // Handle "Select All" checkbox change
  const handleSelectAllChange = () => {
    const isChecked = !isSelectAllChecked;
    setIsSelectAllChecked(isChecked);

    if (isChecked) {
      // Select all question IDs
      setSelectedQuestionIds(questionsToShow.map((q) => q.id));
    } else {
      // Deselect all
      setSelectedQuestionIds([]);
    }
  };

  // Handle individual row checkbox change
  const handleCheckboxChange = (id) => {
    if (selectedQuestionIds.includes(id)) {
      // Deselect this question
      setSelectedQuestionIds(selectedQuestionIds.filter((qid) => qid !== id));
    } else {
      // Select this question
      setSelectedQuestionIds([...selectedQuestionIds, id]);
    }

    // Update the "Select All" checkbox state dynamically
    if (
      selectedQuestionIds.length === questionsToShow.length - 1 &&
      !selectedQuestionIds.includes(id)
    ) {
      setIsSelectAllChecked(true);
    } else {
      setIsSelectAllChecked(false);
    }
  };
  
  const handleAddToTest = () => {
    if (selectedQuestionIds.length > 0) {
      // Implement the logic to add selected questions to the test
      console.log("Questions added to test:", selectedQuestionIds);
  
      // Optionally show a popup
      setIsPopupVisible(true);
    }
  };


  // Define columns for the DataTable
  const columns = [
    {
      name: (
        <input
          type="checkbox"
          checked={isSelectAllChecked}
          onChange={handleSelectAllChange}
        />
      ),
      selector: (row) => row.id,
      cell: (row) => (
        <input
          type="checkbox"
          checked={selectedQuestionIds.includes(row.id)}
          onChange={() => handleCheckboxChange(row.id)}
        />
      ),
      width: "80px",
      ignoreRowClick: true,
    },
   {
  name: "Question",
  selector: (row) => row.question,  // Access the question object (or the text of the question directly)
  sortable: true,
  cell: (row) => (
    <Link to={`/movetest/testquestionadd/${row.id}`}>  {/* Use row.id for the correct question ID */}
      {row.question}  {/* Display the question's text */}
    </Link>
  ),
}

  ];

  return (
    <div className="test-questions-add-page">
      <div className="test-questions-page-layout">
        <div className="test-questions-content-area">
          <h3>Add to Questions Test</h3>

          {/* Search Bar */}
          <div className="test-questions-search-bar">
            <div className="test-search-container">
              <input
                type="text"
                placeholder="Search questions..."
                className="test-search-input"
              />
              <FaSearch className="testadd-search-icon" />
            </div>

            <div className="d-flex justify-content-end">
              <button
                onClick={handleAddToTest}
                className={`disabled-button ${selectedQuestionIds.length === 0 ? '' : 'bulk-action-button bulk-add-button'}`}
                disabled={selectedQuestionIds.length === 0}
              >
                <FaPlus /> Add to Test
              </button>

              {isPopupVisible && (
                <div className="qb-addtest-popup">
                  <div className="qb-addtest-popup-content">
                    <p>Questions added to the test successfully!</p>

                    <div className="d-flex">
                      <button onClick={() => navigate("/testadd")} className="qb-addtest-back-button">
                        <FaArrowLeft /> Back Question Bank
                      </button>

                      <button onClick={() => setIsPopupVisible(false)} className="qb-addtest-close-popup-button">Close</button>
                    </div>

                  </div>
                </div>
              )}
            </div>

          </div>

          {/* DataTable */}
          <div className="test-question-add">
            {questionsToShow.length === 0 ? (
              <div className="test-questions-empty-state">
                <p>No questions found for this section.</p>
                <button className="test-questions-add-button">
                  <FaPlus /> Add Your Question
                </button>
              </div>
            ) : (
              <DataTable
                columns={columns}
                data={questionsToShow}
                highlightOnHover
                selectableRowDisabled
              />
            )}
          </div>
        </div>
      </div>

      {/* Pagination and Info */}
      <div className="test-questions-page-btns">
        <button className="test-questions-load-more-button">Load More</button>
        <button className="test-questions-full-view-button">Full View</button>
      </div>

      <div className="test-questions-pagination-info-container">
        <div className="test-questions-pagination-info">
          Showing {Math.min(5, questionsToShow.length)} out of{" "}
          {questionsToShow.length} Questions
        </div>
      </div>
    </div>
  );
};

export default TestQuestionAdd;
