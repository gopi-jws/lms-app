import React, { useState, useEffect } from "react";
import "./DispatchModal.css";

const DispatchModal = ({ isOpen, onClose }) => {
  const [isScheduled, setIsScheduled] = useState(true);
  const [selectedClass, setSelectedClass] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [generateLink, setGenerateLink] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleDispatch = () => {
    console.log({
      isScheduled,
      selectedClass,
      date,
      time,
      generateLink,
    });
    onClose();
  };

  return (
    <div className={`modal-overlay ${isOpen ? "open" : ""}`}>
      <div className="dispatch-modal">
        <div className="modal-header">
          <button
            className={`toggle-button ${isScheduled ? "active" : ""}`}
            onClick={() => setIsScheduled(true)}
          >
            Scheduled
          </button>
          <button
            className={`toggle-button ${!isScheduled ? "active" : ""}`}
            onClick={() => setIsScheduled(false)}
          >
            Unscheduled
          </button>
        </div>
        <div className="modal-body">
          <label className="modal-label" htmlFor="class-select">
            Select Class:
          </label>
          <select
            id="class-select"
            className="modal-input"
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
          >
            <option value="">--Select Class--</option>
            <option value="class1">Class 1</option>
            <option value="class2">Class 2</option>
            <option value="class3">Class 3</option>
          </select>

          {isScheduled && (
            <>
              <label className="modal-label" htmlFor="date-input">
                Select Date:
              </label>
              <input
                id="date-input"
                type="date"
                className="modal-input"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />

              <label className="modal-label" htmlFor="time-input">
                Select Time:
              </label>
              <input
                id="time-input"
                type="time"
                className="modal-input"
                value={time}
                onChange={(e) => setTime(e.target.value)}
              />
            </>
          )}

          <div className="checkbox-container">
            <input
              type="checkbox"
              id="generate-link"
              checked={generateLink}
              onChange={(e) => setGenerateLink(e.target.checked)}
            />
            <label htmlFor="generate-link">Generate Public Test Link</label>
          </div>
        </div>
        <div className="modal-footer">
          <button className="modal-button dispatch" onClick={handleDispatch}>
            Dispatch
          </button>
          <button className="modal-button cancel" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DispatchModal;
