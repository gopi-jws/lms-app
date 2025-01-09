import React from "react";
import { useNavigate } from "react-router-dom";
import "./Sheduled.css";
import CurrentRunningTest from "../ThreeTests/CurrentRunningTest/CurrentRunningTest";
import UpcomingTest from "../ThreeTests/UpcommingTest/UpcommingTest";
import PastTest from "../ThreeTests/PastTests/PastTest";

const Scheduled = () => {
  const navigate = useNavigate();

  // Function to navigate to the test details page with the test ID
  const handleViewDetails = (id) => {
    navigate(`/maindashboard/current-running-test-details/${id}`);
    
  };
  // Function to navigate to the upcoming test details
  const handleUpcomingTestDetails = (id) => {
    navigate(`/maindashboard/upcoming-test-details/${id}`);
  };

  return (
    <div className="scheduled-container">
      {/* Pass the function as a prop */}
      <CurrentRunningTest onViewDetails={handleViewDetails} />
      <UpcomingTest onViewDetails={handleUpcomingTestDetails} />
      <PastTest />
    </div>
  );
};

export default Scheduled;
