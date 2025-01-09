import React, { useState, useEffect, useRef } from "react";
import "./UpcommingTest.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // Import the styles for the DatePicker
const UpcomingTest = ({ onViewDetails }) => {
  const upcomingTests = [
    {
      id: 1,
      title: "Upcoming Test 1",
      name: "Advanced Mathematics",
      owner: "Dr. Jane Smith",
      hoursAllotted: 2,
      candidates: 75,
      startTime: new Date(Date.now() + 2 * 60 * 60 * 1000), // Start time after 2 hours
      attendingStudents: [
        { email: "student1@example.com", joinTime: "09:00 AM" },
        { email: "student2@example.com", joinTime: "09:05 AM" },
      ],
    },
    {
      id: 2,
      title: "Upcoming Test 2",
      name: "Physics Basics",
      owner: "Dr. John Doe",
      hoursAllotted: 3,
      candidates: 95,
      startTime: new Date(Date.now() + 5 * 60 * 60 * 1000), // Start time after 5 hours
      attendingStudents: [
        { email: "studentA@example.com", joinTime: "10:00 AM" },
        { email: "studentB@example.com", joinTime: "10:10 AM" },
      ],
    },
    {
      id: 3,
      title: "Upcoming Test 3",
      name: "Physics Basics",
      owner: "Dr. John Doe",
      hoursAllotted: 3,
      candidates: 95,
      startTime: new Date(Date.now() + 5 * 60 * 60 * 1000), // Start time after 5 hours
      attendingStudents: [
        { email: "studentA@example.com", joinTime: "10:00 AM" },
        { email: "studentB@example.com", joinTime: "10:10 AM" },
      ],
    },
  ];

  const [expandedTests, setExpandedTests] = useState([]);
  const [showOtherTests, setShowOtherTests] = useState(false);
  const [showModifyPopup, setShowModifyPopup] = useState(false);
  const [showTerminatePopup, setShowTerminatePopup] = useState(false);
  const [newTestDate, setNewTestDate] = useState(null); // State to hold the new date
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null); // Reference to the menu
  const burgerBtnRef = useRef(null); // Reference to the burger button

  function calculateTimeLeft(test) {
    const difference = test.startTime.getTime() - new Date().getTime();
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

  const toggleModifyPopup = () => {
    setShowModifyPopup(!showModifyPopup);
  };

  const toggleTerminatePopup = () => {
    setShowTerminatePopup(!showTerminatePopup);
  };

  const handleSaveChanges = () => {
    // Close the Modify popup after saving the changes
    setShowModifyPopup(false);

    // Add any other logic you need for saving the changes, like calling an API or updating the state
  };

  const handleConfirmTerminate = () => {
    // Close the Terminate popup after confirming
    setShowTerminatePopup(false);

    // Add any other logic for terminating the test
  };

  // Toggle dropdown menu visibility
  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  // Close menu when clicking outside
  const handleClickOutside = (event) => {
    if (
      menuRef.current && !menuRef.current.contains(event.target) &&
      burgerBtnRef.current && !burgerBtnRef.current.contains(event.target)
    ) {
      setIsMenuOpen(false);
    }
  };
const [newTestDateTime, setNewTestDateTime] = useState(""); // Holds the selected date and time

  // Add event listener for click outside when component mounts
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="upcoming-test">
      {/* Show the first test by default */}
      {upcomingTests.slice(0, 1).map((test) => (
        <div key={test.id} className="test-card1">
          <div className="testdetails-header">
            <p>{test.title}</p>
            <h2>{test.name}</h2>
           

            {/* Burger Menu for Modify and Terminate Options */}
            <div className="burger-menu">
               <button onClick={() => onViewDetails(test.id)} className="view-details-btn">
              View Details
            </button>
              <button
                ref={burgerBtnRef}
                onClick={toggleMenu}
                className="burger-btn"
              >
                ☰
              </button>

              {/* Dropdown Menu */}
              {isMenuOpen && (
                <div ref={menuRef} className="menu-dropdown">
                  <button className="menu-item" onClick={toggleModifyPopup}>Modify</button>
                  <button className="menu-item" onClick={toggleTerminatePopup}>Terminate</button>
                </div>
              )}
            </div>
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
                <span className="detail-label">Candidates:</span>
                <span className="detail-value">{test.candidates}</span>
              </div>
            </div>
            <div className="timer">
              <h3>Time Remaining</h3>
              <div className="countdown">
                <span className="time-unit">{calculateTimeLeft(test)?.hours}</span>:
                <span className="time-unit">{calculateTimeLeft(test)?.minutes}</span>:
                <span className="time-unit">{calculateTimeLeft(test)?.seconds}</span>
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
              {expandedTests.includes(test.id) ? "Show Less" : "Show More"}
              <span className={`arrow ${expandedTests.includes(test.id) ? "up" : "down"}`}></span>
            </button>
          </div>

        

          {/* Show other tests if "Show Other Tests" is clicked */}
          {showOtherTests &&
            upcomingTests.slice(1).map((test) => (
              <div key={test.id} className="test-card2">
                <div className="testdetails-header">
                  <p>{test.title}</p>
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
                      <span className="detail-label">Candidates:</span>
                      <span className="detail-value">{test.candidates}</span>
                    </div>
                  </div>
                  <div className="timer">
                    <h3>Time Remaining</h3>
                    <div className="countdown">
                      <span className="time-unit">{calculateTimeLeft(test)?.hours}</span>:
                      <span className="time-unit">{calculateTimeLeft(test)?.minutes}</span>:
                      <span className="time-unit">{calculateTimeLeft(test)?.seconds}</span>
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
                    {expandedTests.includes(test.id) ? "Show Less" : "Show More"}
                    <span className={`arrow ${expandedTests.includes(test.id) ? "up" : "down"}`}></span>
                  </button>
                </div>
              </div>
            ))}
              {/* Show Other Tests button */}
          <button className="view-details-btn mt-3 d-flex" onClick={toggleShowOtherTests}>
            {showOtherTests ? "Show Less Other Upcoming Tests" : "Show Other Upcoming Tests"}
          </button>
        </div>
      ))}

      {/* Modify Popup */}
     {showModifyPopup && (
  <div className="action-modal">
    <h3>Modify Test</h3>
    <p>Select a new time and date for the test:</p>

    {/* Date and Time Picker using react-datepicker */}
          <DatePicker
            selected={newTestDate}
            onChange={(date) => setNewTestDate(date)} // Set the selected date
            showTimeSelect
            dateFormat="Pp" // Format to show date and time (can be customized)
            timeFormat="HH:mm" // Optional: Customize the time format
            timeIntervals={15} // Optional: Adjust the time intervals
            className="date-time-picker"
            placeholderText="Enter Time And Date"
          />

    <button className="action-btn confirm" onClick={handleSaveChanges}>
      Save Changes
    </button>
    <button className="action-btn cancel" onClick={toggleModifyPopup}>
      Cancel
    </button>
  </div>
)}


      {/* Terminate Popup */}
      {showTerminatePopup && (
        <div className="action-modal">
          <h3>Terminate Test</h3>
          <p>Are you sure you want to terminate this test?</p>
          <button className="action-btn confirm" onClick={handleConfirmTerminate}>Yes Terminate Test</button>
          <button className="action-btn cancel" onClick={toggleTerminatePopup}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default UpcomingTest;
