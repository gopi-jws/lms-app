import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import TopBar from "../../class-batch/classtopbar/classtopbar";
import { FaArrowLeft, FaPlus, FaEdit, FaTrash, FaCopy, FaSearch } from "react-icons/fa";
import DataTable from "react-data-table-component";
import Modal from "react-modal"; // Importing Modal
import "./QuestionsAdd.css";
import 'bootstrap/dist/css/bootstrap.min.css';

const QuestionsAdd = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Store questions for each question bank ID
  const [questionsByBank, setQuestionsByBank] = useState({
    1: [
      {
        id: 1,
        question: "What is React?",
        answer: "A JavaScript library for building UIs",
        type: "mcq",
        options: ["A JavaScript library", "A programming language", "A database", "A framework"],
        correctAnswer: "A JavaScript library"
      },
      {
        id: 2,
        question: "What is the result of 5 + 3?",
        answer: "8",
        type: "numerical"
      },
      {
        id: 3,
        question: "Is React a JavaScript library?",
        answer: "True",
        type: "truefalse"
      },
      {
        id: 4,
        question: "Explain the concept of JSX in React.",
        answer: "JSX is a syntax extension for JavaScript that looks similar to XML, used to define UI components in React.",
        type: "descriptive"
      },
      {
        id: 5,
        question: "What is JSX?",
        answer: "A syntax extension for JavaScript that looks similar to XML",
        type: "mcq",
        options: ["A database", "A JavaScript library", "A syntax extension for JavaScript", "A framework"],
        correctAnswer: "A syntax extension for JavaScript"
      }
    ],
    // Add more question banks as needed
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [questionsPerPage, setQuestionsPerPage] = useState(10);
  const [selectedQuestionIds, setSelectedQuestionIds] = useState([]); // Track selected questions
  const [selectedQuestion, setSelectedQuestion] = useState(null); // For full question details
  const [modalIsOpen, setModalIsOpen] = useState(false); // State to control modal visibility
  const [isSelectAllChecked, setIsSelectAllChecked] = useState(false); // State for "select all"
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const [filterType, setFilterType] = useState(""); // Filter for question type
  const [isPopupVisible, setIsPopupVisible] = useState(false);  //popup visible
  const [searchTerm, setSearchTerm] = useState("");
  const [searchfilteredQuestions, setSearchFilteredQuestions] = useState([]);

  useEffect(() => {
    console.log("Fetching questions for Question Bank ID:", id);
  }, [id]);

  const handleAddQuestion = () => {
    console.log("Add question");
  };

  const handleEditQuestion = (questionId) => {
    console.log("Edit question", questionId);
  };

  const handleDeleteQuestion = () => {
    console.log("Delete selected questions", selectedQuestionIds);
  };

  const handleCopyQuestion = () => {
    console.log("Copy selected questions", selectedQuestionIds);
  };

  const handleAddToTest = () => {
    if (selectedQuestionIds.length > 0) {
      console.log("Add selected questions to test", selectedQuestionIds);
      setIsPopupVisible(true); // Show the popup after adding questions
    }
  };

  const handleQuestionClick = (question) => {
    setSelectedQuestion(question);
    setModalIsOpen(true); // Open modal on question click
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
      setSelectedQuestionIds(currentQuestions.map((row) => row.id)); // Select all
    }
    setIsSelectAllChecked(!isSelectAllChecked); // Toggle the "select all" checkbox state
  };

  const currentQuestions = questionsByBank[id] || [];

  // Search functionality: filter questions based on search query and filter type
  const filteredQuestions = currentQuestions.filter((question) => {
    const matchesSearchQuery = question.question.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilterType = filterType ? question.type === filterType : true;
    return matchesSearchQuery && matchesFilterType;
  });

  // Pagination logic
  const indexOfLastQuestion = currentPage * questionsPerPage;
  const indexOfFirstQuestion = indexOfLastQuestion - questionsPerPage;
  const questionsToShow = filteredQuestions.slice(indexOfFirstQuestion, indexOfLastQuestion);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleQuestionsPerPageChange = (event) => {
    const newLimit = parseInt(event.target.value, 10);
    setQuestionsPerPage(newLimit);
    setCurrentPage(1);
  };

  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
  
    // Extract all questions from the question banks
    const allQuestions = Object.values(questionsByBank).flat();
  
    // Filter questions based on the search term
    const filtered = allQuestions.filter((question) =>
      question.question.toLowerCase().includes(value) ||
      question.answer.toLowerCase().includes(value) ||
      (question.type && question.type.toLowerCase().includes(value))
    );
  
    // Update the filteredQuestions state
    setSearchFilteredQuestions(filtered);
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
    },
    {
      name: "Question",
      selector: (row) => row.question,
      sortable: true,
      cell: (row) => <span onClick={() => handleQuestionClick(row)}>{row.question}</span>,
    },
    {
      name: "Type",
      selector: (row) => row.type,
      sortable: true,
    },
    {
      name: "Actions",
      button: true,
      cell: (row) => (
        <div className="questionadd-action-btns">
          <button onClick={() => handleCopyQuestion(row.id)} className="copyButton">
            <FaCopy />
            <span className="questionadd-tooltip">Copy</span></button>
          <button onClick={() => handleEditQuestion(row.id)} className="editButton">
            <FaEdit />
            <span className="questionadd-tooltip">Edit</span></button>
          <button onClick={() => handleAddToTest(row.id)} className="addToTestButton">
            <span className="questionadd-tooltip">Add To Test</span>
            T</button>
          <button onClick={() => handleDeleteQuestion(row.id)} className="deleteButton">
            <FaTrash />
            <span className="questionadd-tooltip">Delete</span>
          </button>
        </div>
      ),
      width: "250px",
    },
  ];

  return (
    <div className="questions-add-page">
      {/* <TopBar /> */}
      <div className="page-layout">
        <div className="questions-content-area">
          <div className="addquestion-title">
            <h1>Questions in QB {id}</h1>
            {/* <button className="add-button" onClick={handleAddQuestion}>
              <FaPlus /> Add Question
            </button> */}

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
                  <button onClick={() => navigate("/Questionbank")} className="qb-addtest-back-button">
                    <FaArrowLeft /> Back Question Bank
                  </button>

                  <button onClick={() => setIsPopupVisible(false)} className="qb-addtest-close-popup-button">Close</button>
                </div>

              </div>
            </div>
          )}
        </div>

          </div>

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
            <div className="filter-container">
              <div className="filter-select-wrapper">
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="filter-select"
                >
                  <option value="">All Types</option>
                  <option value="mcq">MCQ</option>
                  <option value="numerical">Numerical</option>
                  <option value="truefalse">True/False</option>
                  <option value="descriptive">Descriptive</option>
                </select>
                <span className="filter-arrow"></span>
              </div>
            </div>

          </div>

          {filteredQuestions.length === 0 ? (
            <div className="empty-state">
              <p>No questions found for this Question Bank.</p>
              <button className="add-button" onClick={handleAddQuestion}>
                <FaPlus /> Add Your First Question
              </button>
            </div>
          ) : (
            <DataTable
              columns={columns}
              data={questionsToShow}
              paginationPerPage={questionsPerPage}
              onChangePage={paginate}
              highlightOnHover
            />
          )}

          {/* Modal for displaying question and answer */}
          <Modal
            isOpen={modalIsOpen}
            onRequestClose={() => setModalIsOpen(false)}
            contentLabel="Question Details"
            ariaHideApp={false}
            className="question-modal"
          >
            <div className="modal-content">
              <h2>{selectedQuestion?.question}</h2>
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
              <button onClick={() => setModalIsOpen(false)} className="close-modal-button">Close</button>
            </div>
          </Modal>
          <div className="bulk-actions">
            {/* <button onClick={handleDeleteQuestion} className="bulk-action-button bulk-delete-button">
              <FaTrash /> Delete Selected
            </button>
            <button onClick={handleCopyQuestion} className="bulk-action-button bulk-copy-button">
              <FaCopy /> Copy Selected
            </button> */}
          </div>
        </div>
        

      </div>
    </div>
  );
};

export default QuestionsAdd;
