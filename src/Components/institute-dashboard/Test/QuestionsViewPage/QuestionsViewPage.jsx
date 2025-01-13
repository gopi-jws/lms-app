import React from 'react';
import { useTestContext } from "../TestContext";
import { useParams } from 'react-router-dom'; // Import useParams

const QuestionsViewPage = () => {
  const { questionsToShow } = useTestContext();
  const { questionId } = useParams(); // Get the 'questionId' from the URL params

  // Find the question with the given questionId
  const selectedQuestion = questionsToShow.find(question => question.id === parseInt(questionId));

  return (
    <div>
      <h1>Question View</h1>

      {/* Display the selected question */}
      {selectedQuestion ? (
        <div>
          <h2>{selectedQuestion.question}</h2>
          <p>{selectedQuestion.answer}</p>
        </div>
      ) : (
        <p>Question not found.</p>
      )}

      {/* Display all questions */}
      <h3>All Questions</h3>
      <ul>
        {questionsToShow.map((question) => (
          <li key={question.id}>
            <h4>{question.question}</h4>
            <p>{question.answer}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuestionsViewPage;
