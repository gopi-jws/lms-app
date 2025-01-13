import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import TopBar from "../../class-batch/classtopbar/classtopbar";
import {
  FaArrowLeft, FaPlus, FaEdit, FaTrash, FaCopy, FaSearch, FaArrowUp
} from "react-icons/fa";
import DataTable from "react-data-table-component";
import Modal from "react-modal"; // Importing Modal
import './TestAdd.css'
import { Pagination } from "@mui/material";



const TestAdd = () => {
const { id } = useParams();
const navigate = useNavigate();
const paginate = (pageNumber) => setCurrentPage(pageNumber);


  const TestQuestions = [
    {
      id: 1,
      question: "What is React?",
      answer: "A JavaScript library for building UIs",
      type: "mcq",
      marks: 5,
      owner: "Admin",
      options: ["A JavaScript library", "A programming language", "A database", "A framework"],
      correctAnswer: "A JavaScript library"
    },
    {
      id: 2,
      question: "What is the result of 5 + 3?",
      answer: "8",
      type: "numerical",
      marks: 2,
      owner: "Admin"
    },
    {
      id: 3,
      question: "Is React a JavaScript library?",
      answer: "True",
      type: "truefalse",
      marks: 1,
      owner: "Admin"
    },
    {
      id: 4,
      question: "Explain the concept of JSX in React.",
      answer: "JSX is a syntax extension for JavaScript that looks similar to XML, used to define UI components in React.",
      type: "descriptive",
      marks: 5,
      owner: "Admin"
    },
    {
      id: 5,
      question: "What is JSX?",
      answer: "A syntax extension for JavaScript that looks similar to XML",
      type: "mcq",
      marks: 4,
      owner: "Admin",
      options: ["A database", "A JavaScript library", "A syntax extension for JavaScript", "A framework"],
      correctAnswer: "A syntax extension for JavaScript"
    },
    {
      id: 6,
      question: "What is JSX?",
      answer: "A syntax extension for JavaScript that looks similar to XML",
      type: "mcq",
      marks: 4,
      owner: "Admin",
      options: ["A database", "A JavaScript library", "A syntax extension for JavaScript", "A framework"],
      correctAnswer: "A syntax extension for JavaScript"
    }
  ]

  // Store questions for each question bank ID
  const [questionsByBank, setQuestionsByBank] = useState({ 1: TestQuestions });

  const [currentPage, setCurrentPage] = useState(1);
  const [questionsPerPage, setQuestionsPerPage] = useState(10);
  const [selectedQuestionIds, setSelectedQuestionIds] = useState([]);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isSelectAllChecked, setIsSelectAllChecked] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("");
  const [questionIndex, setQuestionIndex] = useState(0);
  const [rowsPerPage] = useState(5);
  const [filteredData, setFilteredData] = useState(TestQuestions);
   const [searchTerm, setSearchTerm] = useState("");
  const currentQuestions = questionsByBank[id] || [];


  const filteredQuestions = currentQuestions.filter((question) => {
    const matchesSearchQuery = question.question.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilterType = filterType ? question.type === filterType : true;
    return matchesSearchQuery && matchesFilterType;
  });

  const questionsToShow = filteredQuestions;

  const handleQuestionClick = (question, index) => {
    setSelectedQuestion(question);
    setQuestionIndex(index); // Set current question index
    setModalIsOpen(true);
  };

  const handleNextQuestion = () => {
    if (questionIndex < questionsToShow.length - 1) {
      const nextIndex = questionIndex + 1;
      setQuestionIndex(nextIndex); // Update index first
      setSelectedQuestion(questionsToShow[nextIndex]); // Then set the selected question
    }
  };

  const handlePrevQuestion = () => {
    if (questionIndex > 0) {
      const prevIndex = questionIndex - 1;
      setQuestionIndex(prevIndex); // Update index first
      setSelectedQuestion(questionsToShow[prevIndex]); // Then set the selected question
    }
  };

  const handleCloseModal = () => {
    setModalIsOpen(false);
    setSelectedQuestion(null);
    setQuestionIndex(0);
  };

  useEffect(() => {
    console.log("Fetching questions for Question Bank ID:", id);
  }, [id]);

  const handleAddQuestion = () => {
    console.log("Add question");
  };

  const handleEditQuestion = (questionId) => {
    console.log("Edit question", questionId);
  };
  const handlemoveQuestion = (questionId) => {
    console.log("move question", questionId);
  };
  const handleDeleteQuestion = () => {
    console.log("Delete selected questions", selectedQuestionIds);
  };

  const handleCopyQuestion = () => {
    console.log("Copy selected questions", selectedQuestionIds);
  };

  const handleSetMarks = (questionId) => {
    console.log("Set marks for question", questionId);
  };
  const handleAddToTest = () => {
    // Handle the action for adding selected questions to the test
    console.log("Adding selected questions to the test", selectedQuestionIds);
    // Add the necessary functionality here, such as sending the questions to a server or updating the test state
  };

  const handleCheckboxChange = (id) => {
    setSelectedQuestionIds((prevSelectedIds) => {
      if (prevSelectedIds.includes(id)) {
        return prevSelectedIds.filter((selectedId) => selectedId !== id); // Deselect
      } else {
        return [...prevSelectedIds, id]; // Select
      }
    });
  };

  const handleSelectAllChange = () => {
    if (isSelectAllChecked) {
      setSelectedQuestionIds([]); // Deselect all
    } else {
      setSelectedQuestionIds(questionsByBank[id].map((row) => row.id)); // Select all
    }
    setIsSelectAllChecked(!isSelectAllChecked); // Toggle the "select all" checkbox state
  };

  const [selectedColumns, setSelectedColumns] = useState({
    question: true,
    owner: true,
    type: true,
    marks: true,
    actions: true,
  });

  const handleColumnChange = (event) => {
    const { value, checked } = event.target;
    setSelectedColumns((prevState) => ({
      ...prevState,
      [value]: checked,
    }));
  };

  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchTerm(value);
    const filtered = TestQuestions.filter(
      (item) =>
        item.test.toLowerCase().includes(value) ||
        item.owner.toLowerCase().includes(value) ||
        item.lastModified.includes(value)
    );
    setFilteredData(filtered);
  };

  const columns = [
    {
      name: (
        <input
          type="checkbox"
          checked={isSelectAllChecked}
          onChange={handleSelectAllChange}
        />
      ), // "Select All" checkbox in the header
      selector: (row) => row.id,
      cell: (row) => (
        <input
          type="checkbox"
          checked={selectedQuestionIds.includes(row.id)}
          onChange={() => handleCheckboxChange(row.id)}
        />
      ),
      width: "80px",
      visible: true, // Always visible
    },
    {
      name: "Question",
      selector: (row) => row.question,
      sortable: true,
      visible: selectedColumns.question,
      cell: (row) => (
        <Link
          onClick={() => handleQuestionClick(row)}
          className="question-link"
        >
          {row.question.length > 20
            ? `${row.question.substring(0, 20)}...`
            : row.question}
        </Link>
      ),
    },
    {
      name: "Owner",
      selector: (row) => row.owner,
      sortable: true,
      visible: selectedColumns.owner,
    },
    {
      name: "Type",
      selector: (row) => row.type,
      sortable: true,
      visible: selectedColumns.type,
    },
    {
      name: "Marks",
      selector: (row) => row.marks,
      sortable: true,
      visible: selectedColumns.marks,
    },
    {
      name: "Actions",
      button: true,
      visible: selectedColumns.actions,
      cell: (row) => (
        <div className="testadd-action-btns">
          <button
            onClick={() => handleCopyQuestion(row.id)}
            className="testadd-copyButton"
          >
            <FaCopy />
            <span className="testadd-tooltip">Copy</span>
          </button>
          <button
            onClick={() => handleEditQuestion(row.id)}
            className="testadd-editButton"
          >
            <FaEdit />
            <span className="testadd-tooltip">Edit</span>
          </button>
          <button
            onClick={() => handlemoveQuestion(row.id)}
            className="testadd-moveButton"
          >
            <FaArrowUp />
            <span className="testadd-tooltip">Move</span>
          </button>
          <button
            onClick={() => handleSetMarks(row.id)}
            className="testadd-addToTestButton"
          >
            M
            <span className="testadd-tooltip">Set Marks</span>
          </button>
          <button
            onClick={() => handleDeleteQuestion(row.id)}
            className="testadd-deleteButton"
          >
            <FaTrash />
            <span className="testadd-tooltip">Delete</span>
          </button>
        </div>
      ),
      width: "300px",
    },
  ].filter((column) => column.visible);


  return (
    <div className="questions-add-page">
      <div className="page-layout">
        <div className="questions-content-area">

          <h3> Test {id}</h3>
          {/* Search bar and filter options */}
          <div className="search-bar">
            <div className="test-search-container">
              <input
                type="text"
                placeholder="Search tests..."
                className="test-search-input"
                value={searchTerm}
                onChange={handleSearch}
              />
              <FaSearch className="testadd-search-icon" />
            </div>

            <div className="testadd-column-dropdown">
              <button className="dropdown-toggle">View</button>
              <div className="dropdown-content">
                <label className="testadd-dropdown-item">
                  <input
                    type="checkbox"
                    value="owner"
                    checked={selectedColumns.owner}
                    onChange={handleColumnChange}
                  />
                  Owner
                </label>
                <label className="testadd-dropdown-item">
                  <input
                    type="checkbox"
                    value="type"
                    checked={selectedColumns.type}
                    onChange={handleColumnChange}
                  />
                  Type
                </label>
                <label className="testadd-dropdown-item">
                  <input
                    type="checkbox"
                    value="marks"
                    checked={selectedColumns.marks}
                    onChange={handleColumnChange}
                  />
                  Marks
                </label>
                <label className="testadd-dropdown-item">
                  <input
                    type="checkbox"
                    value="actions"
                    checked={selectedColumns.actions}
                    onChange={handleColumnChange}
                  />
                  Actions
                </label>
              </div>
            </div>
          </div>

          {filteredQuestions.length === 0 ? (
            <div className="empty-state">
              <p>No questions found for this Test {id}.</p>
              <button className="add-button" onClick={handleAddQuestion}>
                <FaPlus /> Add Your First Question
              </button>
            </div>
          ) : (
            <DataTable
              columns={columns}
              data={questionsToShow}
              // pagination
              paginationPerPage={questionsPerPage}
              onChangePage={paginate}
              highlightOnHover
            />
          )}

          {/* Modal for displaying question and answer */}
          {/* <Modal
            isOpen={modalIsOpen}
            onRequestClose={handleCloseModal}
            contentLabel="test-Details"
            ariaHideApp={false}
            className="test-add-modal"
            overlayClassName="test-add-modal-overlay"
          >
            <div className="test-header">
              <h2>{selectedQuestion?.question}</h2>
              <button onClick={handleCloseModal} className="close-button">&times;</button>
            </div>
            <div className="test-add-modal-body">
              <p><strong>Type:</strong> {selectedQuestion?.type}</p>
              <p><strong>Answer:</strong> {selectedQuestion?.answer}</p>
              {selectedQuestion?.type === "mcq" && (
                <div>
                  <strong>Options:</strong>
                  <ul>
                    {selectedQuestion?.options.map((opt, index) => (
                      <li key={index}>{opt}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            <div className="test-add-modal-footer">
              <button
                onClick={handlePrevQuestion}
                disabled={questionIndex === 0}
                className="navigation-button prev-button"
              >
                Previous
              </button>
              <button
                onClick={handleNextQuestion}
                disabled={questionIndex === questionsToShow.length - 1}
                className="navigation-button next-button"
              >
                Next
              </button>
              <button onClick={handleCloseModal} className="close-modal-button">
                Close
              </button>
            </div>
          </Modal> */}
        </div>
        <div className="test-addpage-btns">
          {rowsPerPage * currentPage < filteredData.length && (
            <button
              className="testadd-load-more-button"
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              Load More
            </button>
          )}
          <button
            className="testadd-full-view-button"
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            Full View
          </button>
        </div>
        <div className="flex items-center space-x-2">
          <div className="pagination-info">
            Showing {Math.min(rowsPerPage * currentPage, filteredData.length)} out of {filteredData.length} Questions
          </div>
        </div>

      </div>
    </div>
  );
}

export default TestAdd;
