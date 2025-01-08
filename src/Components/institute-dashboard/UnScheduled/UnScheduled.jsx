import React, { useState, useEffect } from "react";
import { FaBook, FaUserAlt, FaCalendarAlt, FaRegFileAlt } from "react-icons/fa";
import "./UnScheduled.css";

// Sample unscheduled tests data
const unscheduledTests = [
  {
    id: 1,
    testName: "Advanced Mathematics",
    owner: "Dr. Jane Smith",
    doc: "2025-01-15",
    totalAttempts: 5,
    status: "Writing Now",
  },
  {
    id: 2,
    testName: "Physics Basics",
    owner: "Dr. John Doe",
    doc: "2025-02-20",
    totalAttempts: 3,
    status: "Writing Now",
  },
  {
    id: 3,
    testName: "Physics Basics",
    owner: "Dr. John Doe",
    doc: "2025-02-20",
    totalAttempts: 3,
    status: "Writing Now",
  },
  {
    id: 4,
    testName: "Physics Basics",
    owner: "Dr. John Doe",
    doc: "2025-02-20",
    totalAttempts: 3,
    status: "Writing Now",
  },
  // Add more tests as needed
];

const UnScheduled = ({ onViewDetails }) => {
      const unscheduledTests = [ 
        {
          id: 1,
          title: 1,
          name: "Advanced Mathematics",
          owner: "Dr. Jane Smith",
         doc: "01-01-2025",
         totalattempt : "99",
          hoursAllotted: 2, 
          endTime: new Date(Date.now() + 2 * 60 * 60 * 1000),
          attendingStudents: [
            { email: "student1@example.com", joinTime: "09:00 AM" },
            { email: "student2@example.com", joinTime: "09:05 AM" },
            { email: "student3@example.com", joinTime: "09:15 AM" },
            { email: "student4@example.com", joinTime: "09:25 AM" },
            { email: "student5@example.com", joinTime: "09:25 AM" },
            { email: "student6@example.com", joinTime: "09:27 AM" },
          ],
        },
        {
          id: 2,
          title: 2,
          name: "Physics Basics",
           doc: "02-01-2025",
             totalattempt : "125",
          owner: "Dr. John Doe",
          hoursAllotted: 3, 
          endTime: new Date(Date.now() + 3 * 60 * 60 * 1000),
          attendingStudents: [
            { email: "studentA@example.com", joinTime: "10:00 AM" },
            { email: "studentB@example.com", joinTime: "10:10 AM" },
            { email: "studentC@example.com", joinTime: "10:15 AM" },
          ],
        },
      ];
    
      const [timeLeft, setTimeLeft] = useState({});
      const [expandedTests, setExpandedTests] = useState([]);
      const [showOtherTests, setShowOtherTests] = useState(false);
    
      // Function to calculate time left for the test based on end time and current time
      function calculateTimeLeft(test) {
        const difference = test.endTime.getTime() - new Date().getTime();
        let timeLeft = {};
    
        if (difference > 0) {
          timeLeft = {
            hours: Math.floor((difference / (1000 * 60 * 60)) % 24).toString().padStart(2, "0"),
            minutes: Math.floor((difference / 1000 / 60) % 60).toString().padStart(2, "0"),
            seconds: Math.floor((difference / 1000) % 60).toString().padStart(2, "0"),
          };
        }
    
        return timeLeft;
      }
    
      // Update the time left for each test every second
      useEffect(() => {
        const timer = setInterval(() => {
          const updatedTimeLeft = {};
          unscheduledTests.forEach((test) => {
            updatedTimeLeft[test.id] = calculateTimeLeft(test);
          });
          setTimeLeft(updatedTimeLeft);
        }, 1000);
    
        return () => clearInterval(timer);
      }, []);
    
      const toggleTestDetails = (testId) => {
        setExpandedTests((prevExpandedTests) =>
          prevExpandedTests.includes(testId)
            ? prevExpandedTests.filter((id) => id !== testId)
            : [...prevExpandedTests, testId]
        );
      };
    
      const toggleShowOtherTests = () => {
        setShowOtherTests(!showOtherTests);
      };
    
 return (
    <div className="current-running-test">
      {/* Show the first test by default */}
      {unscheduledTests.slice(0, 1).map((test) => (
        <div key={test.id}>
          <div className="testdetails-header">
            <p> UnScheduled Test {test.title}</p>
            <h2>{test.name}</h2>
            <button onClick={() => onViewDetails(test.id)} className="view-details-btn">
              View Details
            </button>
          </div>
          <hr />
          <div className="test-info">
            <div className="info-group">
              <div className="detail-item">
                <span className="detail-label">Owner:</span>
                <span className="detail-value">{test.owner}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Hours:</span>
                <span className="detail-value">{test.hoursAllotted}</span>
              </div>
               <div className="detail-item">
                <span className="detail-label">Total Attempt:</span>
                <span className="detail-value">{test.totalattempt}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Status:</span>
                <span className="detail-value status-writing">Writing Now</span>
              </div>
            </div>
            <div className="timer">
              <h3>Date of Creating</h3>
              <div className="countdown">
                {/* <span className="time-unit">{timeLeft[test.id]?.hours}</span>:
                <span className="time-unit">{timeLeft[test.id]?.minutes}</span>:
                <span className="time-unit">{timeLeft[test.id]?.seconds}</span> */}
                  <span className="time-unit">{test.doc}</span> 

              </div>
            </div>
          </div>

          <div className="students-section">
            {expandedTests.includes(test.id) && (
              <table className="students-table">
                <thead>
                  <tr>
                    <th>Email</th>
                    <th>Join Time</th>
                  </tr>
                </thead>
                <tbody>
                  {test.attendingStudents.map((student, index) => (
                    <tr key={index}>
                      <td>{student.email}</td>
                      <td>{student.joinTime}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            <button className="expand-btn" onClick={() => toggleTestDetails(test.id)}>
              {expandedTests.includes(test.id) ? 'Show Less' : 'Show More'}
              <span className={`arrow ${expandedTests.includes(test.id) ? 'up' : 'down'}`}></span>
            </button>
          </div>
        </div>
      ))}

      {/* Show Other Tests button */}
      <button className="view-details-btn mb-3 d-flex" onClick={toggleShowOtherTests}>
        {showOtherTests ? 'Show Less Other UnScheduled Tests' : 'Show Other UnScheduled Tests'}
      </button>

      {/* Show other tests if "Show Other Tests" is clicked */}
      {showOtherTests && unscheduledTests.slice(1).map((test) => (
        <div key={test.id} className="unschedueld-test-details-card">
          <div className="testdetails-header">
            <p>UnScheduled Test {test.title}</p>
            <h2>{test.name}</h2>
            <button onClick={() => onViewDetails(test.id)} className="view-details-btn">
              View Details
            </button>
          </div>
          <hr />
          <div className="test-info">
            <div className="info-group">
              <div className="detail-item">
                <span className="detail-label">Owner:</span>
                <span className="detail-value">{test.owner}</span>
              </div>
              
              <div className="detail-item">
                <span className="detail-label">Hours:</span>
                <span className="detail-value">{test.hoursAllotted}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Total Attempt:</span>
                <span className="detail-value">{test.totalattempt}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Status:</span>
                <span className="detail-value status-writing">Writing Now</span>
              </div>
            </div>
            <div className="timer">
              <h3>Date of Creating</h3>
              <div className="countdown">
                {/* <span className="time-unit">{timeLeft[test.id]?.hours}</span>:
                <span className="time-unit">{timeLeft[test.id]?.minutes}</span>:
                <span className="time-unit">{timeLeft[test.id]?.seconds}</span> */}
                 <span className="time-unit">{test.doc}</span> 
              </div>
            </div>
          </div>

          <div className="students-section">
            {expandedTests.includes(test.id) && (
              <table className="students-table">
                <thead>
                  <tr>
                    <th>Email</th>
                    <th>Join Time</th>
                  </tr>
                </thead>
                <tbody>
                  {test.attendingStudents.map((student, index) => (
                    <tr key={index}>
                      <td>{student.email}</td>
                      <td>{student.joinTime}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            <button className="expand-btn" onClick={() => toggleTestDetails(test.id)}>
              {expandedTests.includes(test.id) ? 'Show Less' : 'Show More'}
              <span className={`arrow ${expandedTests.includes(test.id) ? 'up' : 'down'}`}></span>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UnScheduled;
