import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import TopBar from "../../class-batch/classtopbar/classtopbar";
import { FaArrowLeft, FaPlus, FaEdit, FaTrash, FaCopy, FaSearch,FaArrowUp } from "react-icons/fa";
import DataTable from "react-data-table-component";
import Modal from "react-modal"; // Importing Modal
import './TestAdd.css'
const TestAdd = () => {
  const { id } = useParams();
  const navigate = useNavigate();
const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Store questions for each question bank ID
  const [questionsByBank, setQuestionsByBank] = useState({
    1: [
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
      }
    ]
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [questionsPerPage, setQuestionsPerPage] = useState(10);
  const [selectedQuestionIds, setSelectedQuestionIds] = useState([]);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isSelectAllChecked, setIsSelectAllChecked] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("");
  const [questionIndex, setQuestionIndex] = useState(0); // Index to track question for navigation
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

  // Search functionality: filter questions based on search query and filter type
  // const filteredQuestions = currentQuestions.filter((question) => {
  //   const matchesSearchQuery = question.question.toLowerCase().includes(searchQuery.toLowerCase());
  //   const matchesFilterType = filterType ? question.type === filterType : true;
  //   return matchesSearchQuery && matchesFilterType;
  // });



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
    cell: (row) => (
      <Link 
        onClick={() => handleQuestionClick(row)} 
        className="question-link"
      >
        {row.question.length > 20 ? `${row.question.substring(0, 20)}...` : row.question}
      </Link>
    ),
  },
  {
    name: "Owner",
    selector: (row) => row.owner,
    sortable: true,
  },
  {
    name: "Type",
    selector: (row) => row.type,
    sortable: true,
  },
  {
    name: "Marks",
    selector: (row) => row.marks,
    sortable: true,
  },
  {
    name: "Actions",
    button: true,
    cell: (row) => (
      <div>
        <button onClick={() => handleCopyQuestion(row.id)} className="copyButton"><FaCopy /></button>
        <button onClick={() => handleEditQuestion(row.id)} className="editButton"><FaEdit /></button>
        <button onClick={() => handlemoveQuestion(row.id)} className="moveButton"><FaArrowUp /></button>
        <button onClick={() => handleSetMarks(row.id)} className="addToTestButton">Set Marks</button>
        <button onClick={() => handleDeleteQuestion(row.id)} className="deleteButton"><FaTrash /></button>
      </div>
    ),
    width: "300px",
  },
];


  return (
    <div className="questions-add-page">
      <div className="page-layout">
        <div className="questions-content-area">
          {/* <div className="addquestion-title">
            <h1>Questions in Test {id}</h1>
            <button className="add-button" onClick={handleAddQuestion}>
              <FaPlus /> Add Question
            </button>
          </div> */}
<h3>Questions in Test {id}</h3>
          {/* Search bar and filter options */}
          <div className="search-bar">
            <div className="search-container">
              <input
                type="text"
                placeholder="Search questions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
              <FaSearch className="search-icon" />
            </div>
            
            <div className="filter-container">
              <div className="filter-select-wrapper">
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="filter-select"
                >
                  <option value="">Table data</option>
                  <option value="mcq">Owner</option>
                  <option value="numerical">Type</option>
                  <option value="truefalse">Marks</option>
                  <option value="descriptive">Descriptive</option>
                </select>
                <span className="filter-arrow"></span>
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
              pagination
              paginationPerPage={questionsPerPage}
              onChangePage={paginate}
              highlightOnHover
            />
          )}

          {/* Modal for displaying question and answer */}
      <Modal
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
</Modal>


          <div className="bulk-actions">
            <button onClick={handleDeleteQuestion} className="bulk-action-button bulk-delete-button">
              <FaTrash /> Delete Selected
            </button>
            
            {/* <button onClick={handleCopyQuestion} className="bulk-action-button bulk-copy-button">
              <FaCopy /> Copy Selected
            </button> */}
            {/* <button onClick={handleAddToTest} className="bulk-action-button bulk-add-button">
              <FaPlus /> Add Selected to Test
            </button> */}
            
          </div>
           <button onClick={() => navigate("/test")} className="back-button">
            <FaArrowLeft /> Back to Test List
          </button>

         
        </div>
      </div>
    </div>
  );
}

export default TestAdd;
