import React, { useState } from "react";
import { Button, Form, Col, Row } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import './newclasspage.css';
import TopBar from "../classtopbar/classtopbar";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import DatePicker from "react-datepicker"; // Import DatePicker component
import "react-datepicker/dist/react-datepicker.css"; // Import DatePicker styles

const AddClass = ({ handleAddClass }) => {
    const [className, setClassName] = useState("");
    const [studentsType, setStudentsType] = useState("both");
    const [maxStrength, setMaxStrength] = useState(30);
    const [permission, setPermission] = useState("auto");
    const [expiryDate, setExpiryDate] = useState(null); // Use null for date state
    const [expiryTime, setExpiryTime] = useState(null); // State for time picker
    const [classLink, setClassLink] = useState("");
    const [isLimited, setIsLimited] = useState(false);

    // Handle Change in Form Fields
    const handleClassNameChange = (e) => setClassName(e.target.value);
    const handleMaxStrengthChange = (e) => setMaxStrength(e.target.value);
    const handlePermissionChange = (e) => setPermission(e.target.value);
    const handleExpiryDateChange = (date) => setExpiryDate(date); // Date change handler
    const handleExpiryTimeChange = (time) => setExpiryTime(time); // Time change handler
    const handleStudentsTypeChange = (e) => setStudentsType(e.target.value);

    const handleCheckboxChange = (e) => {
        setIsLimited(e.target.value === "limited");
    };

    // Generate the class link
    const generateLink = () => {
        const link = `https://example.com/class/${Math.random().toString(36).substring(7)}`;
        setClassLink(link);
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        const newClass = {
            className,
            studentsType,
            maxStrength,
            permission,
            expiryDate: new Date(`${expiryDate}T${expiryTime}`), // Combine date and time
            classLink,
        };
        handleAddClass(newClass);
    };

    return (
        <div className="add-class-container py-5" style={{ marginLeft: '248px', width: 'calc(100% - 220px)' }}>
            <TopBar />
            <h2 className="addnewclass-title">Add New Class</h2>
            <Form onSubmit={handleSubmit} className="add-class-form">
                {/* Class Name */}
                <Form.Group controlId="className" className="form-group">
                    <Form.Label className="form-label">Class Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter class name"
                        value={className}
                        onChange={handleClassNameChange}
                        required
                        className="form-control"
                    />
                </Form.Group>

                {/* Students Type (Radio buttons) */}
                <Form.Group className="form-group">
                    <Form.Label className="form-label">Add Students</Form.Label>
                    <div className="radio-buttons">
                        <Form.Check
                            inline
                            label=" Only By Admin"
                            type="radio"
                            value="admin"
                            checked={studentsType === "admin"}
                            onChange={handleStudentsTypeChange}
                        />
                        <Form.Check
                            inline
                            label="Hybrid (Both Way)"
                            type="radio"
                            value="both"
                            checked={studentsType === "both"}
                            onChange={handleStudentsTypeChange}
                        />
                        <Form.Check
                            inline
                            label=" Only By Students "
                            type="radio"
                            value="student"
                            checked={studentsType === "student"}
                            onChange={handleStudentsTypeChange}
                        />
                    </div>
                </Form.Group>

                {/* Show Max Strength only if "Admin Only" is selected */}
                {studentsType === "admin" && (
                    <Form.Group controlId="maxStrength" className="form-group">
                        <Form.Label className="form-label me-3">Max Strength</Form.Label>
                        <div className="strength-students d-flex align-items-center justify-content-start h-auto">
                            <div className="d-flex">
                                <div className="form-check me-3">
                                    <input
                                        type="radio"
                                        name="strengthOption"
                                        value="limited"
                                        checked={isLimited}
                                        onChange={handleCheckboxChange}
                                        className="form-check-input"
                                        id="limited"
                                    />
                                    <label htmlFor="limited" className="form-check-label">Limited</label>
                                </div>

                                <div className="form-check me-3">
                                    <input
                                        type="radio"
                                        name="strengthOption"
                                        value="unlimited"
                                        checked={!isLimited}
                                        onChange={handleCheckboxChange}
                                        className="form-check-input"
                                        id="unlimited"
                                    />
                                    <label htmlFor="unlimited" className="form-check-label">Unlimited</label>
                                </div>
                            </div>

                            {/* Input Field for Limited */}
                            <div
                                className={`me-3 ${isLimited ? "" : "d-none"}`}
                                style={{ width: "100px" }}
                            >
                                <Form.Control
                                    type="number"
                                    value={maxStrength}
                                    onChange={handleMaxStrengthChange}
                                    required={isLimited}
                                    className="form-control"
                                />
                            </div>
                        </div>
                    </Form.Group>
                )}

                {/* Show all other fields when "Admin and themself" or "Students Themself" is selected */}
                {(studentsType === "both" || studentsType === "student") && (
                    <>
                        {/* Permission (Dropdown) */}
                        <Form.Group controlId="permission" className="form-group">
                            <Form.Label className="form-label">Permission</Form.Label>
                            <Form.Control
                                as="select"
                                value={permission}
                                onChange={handlePermissionChange}
                                required
                                className="form-control"
                            >
                                <option value="auto">Auto</option>
                                <option value="manual">Manual</option>
                            </Form.Control>
                        </Form.Group>

                        {/* Expiry Date and Time */}
                        <Form.Group as={Row} className="form-group">
                            <Form.Label className="form-label">Expiry Date and Time</Form.Label>
                            <Col className="d-flex">
                                <DatePicker
                                    selected={expiryDate}
                                    onChange={handleExpiryDateChange}
                                    dateFormat="yyyy-MM-dd"
                                    className="form-control form-date"
                                     placeholderText="Select a date"
                                    required
                                />
                                <div className="d-flex ms-2">
                                    <DatePicker
                                        selected={expiryTime}
                                        onChange={handleExpiryTimeChange}
                                        showTimeSelect
                                        showTimeSelectOnly
                                        timeIntervals={15} // Time intervals (e.g., every 15 minutes)
                                        timeCaption="Time"
                                        dateFormat="h:mm aa" // Custom time format (12-hour format with AM/PM)
                                        className="modal-input"
                                        placeholderText="Select a time"
                                    />
                                </div>
                            </Col>
                        </Form.Group>

                        {/* Class Link */}
                        <Form.Group className="form-group">
                            <Form.Label htmlFor="classLink" className="me-3 mb-0 ">
                                Class Link
                            </Form.Label>
                            <div className="my-3">
                                {classLink ? (
                                    <Form.Control
                                        id="classLink"
                                        value={classLink}
                                        readOnly
                                        type="text"
                                        className="form-control me-2 flex-grow-1"
                                    />
                                ) : (
                                    <Button
                                        variant="outline-primary"
                                        type="button"
                                        onClick={generateLink}
                                        className="generate-link-button"
                                    >
                                        Generate Link
                                    </Button>
                                )}
                                {classLink && (
                                    <Button
                                        variant="outline-primary"
                                        type="button"
                                        onClick={generateLink}
                                        className="generate-link-button ms-2 my-3"
                                    >
                                        Regenerate Link
                                    </Button>
                                )}
                            </div>
                        </Form.Group>
                    </>
                )}

                <Link to="/class">
                    <Button variant="primary" type="submit" className="submit-button">
                        Add Class
                    </Button>
                </Link>
            </Form>
        </div>
    );
};

export default AddClass;
