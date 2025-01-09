import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { 
  Button, 
  TextField, 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  Grid,
  Checkbox,
  FormControlLabel,
  Select,
  MenuItem,
  InputLabel,
  FormControl
} from '@mui/material';
import "./DispatchModal.css";

const DispatchModal = ({ isOpen, onClose, scheduledTests = [] }) => {
  const [isScheduled, setIsScheduled] = useState(true);
  const [multiClass, setMultiClass] = useState([]);
  const [date, setDate] = useState(null);
  const [time, setTime] = useState(null);
  const [availabilityMessage, setAvailabilityMessage] = useState("");
  const [isChecking, setIsChecking] = useState(false);
  const [duration, setDuration] = useState("");
  const [entryType, setEntryType] = useState("sharp-time");
  const [publishResult, setPublishResult] = useState("immediate");
  const [resultDelay, setResultDelay] = useState("");
  const [generateLink, setGenerateLink] = useState(false);
  const [linkLimit, setLinkLimit] = useState("");
  const [emailOnly, setEmailOnly] = useState(false);
  const [emailThroughEmail, setEmailThroughEmail] = useState(false);
  const [optionalName, setOptionalName] = useState("");
  const [attemptLimit, setAttemptLimit] = useState("");
  const [overlappingTest, setOverlappingTest] = useState(null);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  useEffect(() => {
    if (date && time) {
      handleCheckAvailability();
    }
  }, [date, time]);

  const handleCheckAvailability = () => {
    setIsChecking(true);
    setAvailabilityMessage("");
    setOverlappingTest(null);

    setTimeout(() => {
      const existingTest = scheduledTests?.find(
        (test) =>
          test.date === date?.toISOString().split("T")[0] &&
          test.time === time?.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      );

      if (existingTest) {
        setAvailabilityMessage("This date and time is not available.");
        setOverlappingTest(existingTest);
      } else {
        setAvailabilityMessage("This date and time is available.");
      }
      setIsChecking(false);
    }, 1500);
  };

  const handleClassChange = (e) => {
    const { value, checked } = e.target;
    setMultiClass(prev => 
      checked ? [...prev, value] : prev.filter(item => item !== value)
    );
  };

  const handleDispatch = (e) => {
    e.preventDefault();
    console.log({
      isScheduled,
      multiClass,
      date,
      time,
      duration,
      entryType,
      publishResult,
      resultDelay,
      generateLink,
      linkLimit,
      emailOnly,
      emailThroughEmail,
      optionalName,
      attemptLimit,
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle className="customize-title">Dispatch Test</DialogTitle>
      <DialogContent>
        <form onSubmit={handleDispatch}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <div className="toggle-container mt-4">
                <Button
                  className={`toggle-button ${isScheduled ? "active" : ""}`}
                  onClick={() => setIsScheduled(true)}
                >
                  Scheduled
                </Button>
                <Button
                  className={`toggle-button ${!isScheduled ? "active" : ""}`}
                  onClick={() => setIsScheduled(false)}
                >
                  Unscheduled
                </Button>
              </div>
            </Grid>
            <Grid item xs={12}>
              <InputLabel>Select Classes:</InputLabel>
              <div className="checkbox-group">
                {["Class 1", "Class 2", "Class 3 " , "Class 4" ].map((className) => (
                  <FormControlLabel
                    key={className}
                    control={
                      <Checkbox
                        checked={multiClass.includes(className.toLowerCase().replace(" ", ""))}
                        onChange={handleClassChange}
                        value={className.toLowerCase().replace(" ", "")}
                      />
                    }
                    label={className}
                  />
                ))}
              </div>
            </Grid>
            <Grid item xs={12} >
              <TextField
                label="Enter Email to Send"
                multiline
                rows={4}
                fullWidth
                value={optionalName}
                onChange={(e) => setOptionalName(e.target.value)}
                margin="normal"
              />
            </Grid>
            {isScheduled && (
              <>
                <Grid item xs={12} sm={6}>
                  <DatePicker
                    selected={date}
                    onChange={(date) => setDate(date)}
                    dateFormat="yyyy/MM/dd"
                    placeholderText="Select a date"
                    showMonthDropdown
                    showYearDropdown
                    dropdownMode="select"
                    customInput={<TextField label="Select Date" fullWidth />}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <DatePicker
                    selected={time}
                    onChange={(time) => setTime(time)}
                    showTimeSelect
                    showTimeSelectOnly
                    timeIntervals={15}
                    timeCaption="Time"
                    dateFormat="h:mm aa"
                    placeholderText="Select a time"
                    customInput={<TextField label="Select Time" fullWidth />}
                  />
                </Grid>
                <Grid item xs={12}>
                  <div className="availability-container">
                    {isChecking && (
                      <div className="loader">
                        <div className="spinner"></div>
                        <span>Checking availability...</span>
                      </div>
                    )}
                    {availabilityMessage && (
                      <p className={`availability-message ${availabilityMessage.includes("available") ? "available" : "unavailable"}`}>
                        {availabilityMessage}
                      </p>
                    )}
                  </div>
                </Grid>
                {overlappingTest && (
                  <Grid item xs={12}>
                    <div className="warning-box">
                      <h3>Warning: Overlapping Test</h3>
                      <p>Test Name: {overlappingTest.name}</p>
                      <p>Owner: {overlappingTest.owner}</p>
                      <p>Start Time: {overlappingTest.startTime}</p>
                      <p>End Time: {overlappingTest.endTime}</p>
                      <p>Overlapped Classes: {overlappingTest.overlappedClasses.join(", ")}</p>
                    </div>
                  </Grid>
                )}
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Enter Time (Minutes)"
                    type="number"
                    fullWidth
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth margin="normal">
                    <InputLabel>Test Entry Type</InputLabel>
                    <Select
                      value={entryType}
                      onChange={(e) => setEntryType(e.target.value)}
                    >
                      <MenuItem value="sharp-time">Sharp Time</MenuItem>
                      <MenuItem value="sharp-time-allowed">Sharp Time But Can Be Allowed</MenuItem>
                      <MenuItem value="by-organizer">By Test Organizer</MenuItem>
                      <MenuItem value="allow-anytime">Allow Anytime Before Test Finishes</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth margin="normal">
                    <InputLabel>Publish Result</InputLabel>
                    <Select
                      value={publishResult}
                      onChange={(e) => setPublishResult(e.target.value)}
                    >
                      <MenuItem value="immediate">Show Result Immediately</MenuItem>
                      <MenuItem value="after-time">Show After Specified Time</MenuItem>
                      <MenuItem value="manual">Publish Manually</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                {publishResult === "after-time" && (
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Enter Delay Time (Minutes)"
                      type="number"
                      fullWidth
                      value={resultDelay}
                      onChange={(e) => setResultDelay(e.target.value)}
                      margin="normal"
                    />
                  </Grid>
                )}
              </>
            )}
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={generateLink}
                    onChange={() => setGenerateLink(!generateLink)}
                  />
                }
                label="Generate Dispatch Link"
              />
            </Grid>
            {generateLink && (
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Enter Link Limit"
                  type="number"
                  fullWidth
                  value={linkLimit}
                  onChange={(e) => setLinkLimit(e.target.value)}
                  margin="normal"
                />
              </Grid>
            )}
            <Grid item xs={12} sm={6}>
              <TextField
                label="Only allow first"
                type="number"
                fullWidth
                // value={emailOnly ? "1" : ""}
                onChange={(e) => setEmailOnly(e.target.value !== "")}
                margin="normal"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={emailThroughEmail}
                    onChange={() => setEmailThroughEmail(!emailThroughEmail)}
                  />
                }
                label="Only Allow Verified Email"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Attempt Limit"
                type="number"
                fullWidth
                value={attemptLimit}
                onChange={(e) => setAttemptLimit(e.target.value)}
                margin="normal"
              />
            </Grid>
          </Grid>
          <DialogActions>
            <Button onClick={onClose} variant="outlined" color="secondary" className="cancel-button">
              Cancel
            </Button>
            <Button type="submit" variant="contained" color="primary" className="dispatch-button">
              Dispatch
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default DispatchModal;

