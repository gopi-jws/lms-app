
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const ClassDetailsPage = () => {
  const location = useLocation(); 
  const [classDetails, setClassDetails] = useState(null);

  const { id } = location.state || {}; 

  useEffect(() => {
    if (id) {
      const fetchedClassDetails = {
        id,
        name: `Class ${id}`,
        description: "This is a detailed description of the class.",
        strength: 20,
        maximumAllowed: 30,
        expiryDate: "2025-12-31",
      };

      setClassDetails(fetchedClassDetails);
    }
  }, [id]);

  return (
    <div className="container">
      <h1>Class Details</h1>
      {classDetails ? (
        <div>
          <h3>{classDetails.name}</h3>
          <p><strong>Strength:</strong> {classDetails.strength}</p>
          <p><strong>Maximum Allowed:</strong> {classDetails.maximumAllowed}</p>
          <p><strong>Expiry Date:</strong> {classDetails.expiryDate}</p>
          <p>{classDetails.description}</p>
        </div>
      ) : (
        <p>Loading class details...</p>
      )}
    </div>
  );
};

export default ClassDetailsPage;
