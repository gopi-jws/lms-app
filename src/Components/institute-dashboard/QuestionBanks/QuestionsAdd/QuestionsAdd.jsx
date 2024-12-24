import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AddQuestionSidebar from "../AddQuestionSidebar/AddQuestionSidebar"; // Sidebar import
import TopBar from "../../class-batch/classtopbar/classtopbar";


const QuestionsAdd = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  console.log("Navigating to Add Question for Question Bank ID:", id);

  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Question added:", { question, answer });
    navigate(`/QuestionBank/${id}`); // Redirect back to the question bank details
  };

  return (
    <div className="questions-add-page">
      {/* Header */}
 

      <div className="page-layout">
    <TopBar />

        {/* Main Content */}
        <div className="content-area">
          <h2>Add Question to Question Bank {id}</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Question:</label>
              <input
                type="text"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Answer:</label>
              <input
                type="text"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                required
              />
            </div>
            <button type="submit">Add Question</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default QuestionsAdd;
