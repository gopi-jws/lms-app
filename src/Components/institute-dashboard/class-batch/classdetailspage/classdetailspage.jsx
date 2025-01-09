import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import Header from "../../../header/header";
import TopBar from "../classtopbar/classtopbar";
import ClassDetailPageSideMenu from "./classdetailpagesidemenu";
import './classdetailspage.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { FaTrash } from 'react-icons/fa';

const ClassDetailsPage = () => {
  const { id } = useParams();
  const location = useLocation();
  const [classDetails, setClassDetails] = useState(null);
  const [activeDropdown, setActiveDropdown] = useState(null); // Track active dropdown for each student
  const [students, setStudents] = useState([
    { id: 1, name: "Karthick", email: "karthick.k@gmail.com", joinDate: "16/06/2023", status: "active" },
    { id: 2, name: "Manikandan", email: "manikandan.r@gmail.com", joinDate: "20/06/2023", status: "inactive" },
    { id: 3, name: "Sivakumar", email: "sivakumar.v@gmail.com", joinDate: "20/04/2023", status: "active" },
    { id: 4, name: "Dinesh", email: "dineshbabu@gmail.com", joinDate: "15/02/2023", status: "inactive" },
    { id: 5, name: "Uthaya", email: "uthaya@gmail.com", joinDate: "16/0/2023", status: "active" },
  ]);
  const [showAddStudentForm, setShowAddStudentForm] = useState(false); // For showing the popup form
  const [newStudent, setNewStudent] = useState({ name: "", email: "", joinDate: new Date().toISOString().split('T')[0], status: "active" });
  const [filterActive, setFilterActive] = useState(false);
  const [filterInActive, setFilterInActive] = useState(false);


  const initialClasses = [
    { id: "1", name: "Class 1", strength: 30, maximumallowed: 50, expiryDate: "2024-06-30" },
    { id: "2", name: "Class 2", strength: 25, maximumallowed: 100, expiryDate: "2024-07-15" },
    { id: "3", name: "Class 3", strength: 28, maximumallowed: 70, expiryDate: "2024-08-01" },
    { id: "4", name: "Class 4", strength: 28, maximumallowed: 70, expiryDate: "2024-08-01" },
  ];

  const classId = location.state?.id || id;

  const filteredStudents = students.filter(student => {
    if (filterActive && !filterInActive) {
      return student.status === 'active'; // Only active students
    } else if (!filterActive && filterInActive) {
      return student.status === 'inactive'; // Only inactive students
    } else {
      return true; // Show all students when neither filter is applied
    }
  });


  useEffect(() => {
    const classDetail = initialClasses.find((cls) => cls.id === classId);
    setClassDetails(classDetail);
  }, [classId]);

  const toggleDropdown = (studentId) => {
    setActiveDropdown((prevActive) => (prevActive === studentId ? null : studentId));
  };

  const toggleStatus = (studentId, status) => {
    setStudents((prevStudents) =>
      prevStudents.map((student) =>
        student.id === studentId ? { ...student, status } : student
      )
    );
    setActiveDropdown(null);
  };

  const deleteStudent = (studentId) => {
    setStudents((prevStudents) => prevStudents.filter((student) => student.id !== studentId));
  };

  const handleAddStudentChange = (e) => {
    const { name, value } = e.target;
    setNewStudent((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleAddStudentSubmit = (e) => {
    e.preventDefault();
    const newStudentWithId = { ...newStudent, id: students.length + 1 };
    setStudents((prevStudents) => [...prevStudents, newStudentWithId]);
    setShowAddStudentForm(false); // Hide the form after submission
  };

  // Add the function here
  const handleShowAddStudentForm = () => {
    setShowAddStudentForm(true);
  };

  // For filtering by active students
  const handleShowActiveStudents = () => {
    setFilterActive(true);
    setFilterInActive(false); // Reset inactive filter
  };

  // For filtering by inactive students
  const handleInActiveStudents = () => {
    setFilterInActive(true);
    setFilterActive(false); // Reset active filter
  };

  // For showing all students
  const handleShowAllStudents = () => {
    setFilterActive(false);
    setFilterInActive(false);
  };

  return (
    <>
      {/* Header */}
      <Header />

    

      {/* Class details page side Menu */}
      <div className="classdetailspage-sidemenu">
        <ClassDetailPageSideMenu
          onAddStudentClick={handleShowAddStudentForm}
          onShowActiveStudents={handleShowActiveStudents}
          onShowAllStudents={handleShowAllStudents} 
          onShowInActiveStudents={handleInActiveStudents}
          />
      </div>

      <div className="classdetailspage-content " style={{ marginLeft: '220px', width: 'calc(100% - 220px)' }}>
          {/* Topbar */}
     
        <div className="classdetailspage-container">
           <TopBar  style={{width:'100%'}}/>
          {classDetails ? (
            <div>
              <h2 className="text-center my-4">{classDetails.name}</h2>


              <table className="table table-bordered">
                <thead className="table-light">
                  <tr>
                    <th className="text-white text-center">Student Name</th>
                    <th className="text-white text-center">Student Email</th>
                    <th className="text-white text-center">Date of Join</th>
                    <th className="text-white text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStudents.map((student) => (
                    <tr key={student.id}>
                      <td>{student.name}</td>
                      <td>{student.email}</td>
                      <td>{student.joinDate}</td>
                      <td className="d-flex justify-content-center">
                        {/* Dropdown toggle */}
                        <div className="dropdown">
                          <button
                            className={`btn btn-sm me-2 ${activeDropdown === student.id ? 'btn-secondary' : 'btn-primary'}`}
                            onClick={() => toggleDropdown(student.id)}
                            data-bs-toggle="dropdown"
                            aria-expanded={activeDropdown === student.id ? "true" : "false"}
                          >
                            {activeDropdown === student.id ? 'Close' : student.status}
                          </button>
                          <ul className={`dropdown-menu ${activeDropdown === student.id ? 'show' : ''}`}>
                            <li>
                              <a
                                className="dropdown-item"
                                href="#"
                                onClick={() => toggleStatus(student.id, 'active')}
                              >
                                Active
                              </a>
                            </li>
                            <li>
                              <a
                                className="dropdown-item"
                                href="#"
                                onClick={() => toggleStatus(student.id, 'inactive')}
                              >
                                Inactive
                              </a>
                            </li>
                          </ul>
                        </div>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => deleteStudent(student.id)}
                          title="Delete"
                        >
                          <FaTrash /> {/* Delete icon from react-icons */}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p>Loading class details...</p>
          )}

          {/* Add Student Button */}
          <div className="text-center mb-4">
            <button className="btn btn-success" onClick={() => setShowAddStudentForm(true)}>
              Add Student
            </button>
          </div>
        </div>

      </div>

      {/* Add Student Form Modal */}
      {/* Add Student Form Modal */}
      {showAddStudentForm && (
        <div className="classdetailpage-addstudent-overlay">
          <div className="classdetailpage-addstudent-dialog">
            <div className="classdetailpage-addstudent-content">
              <div className="classdetailpage-addstudent-header">
                <h5 className="classdetailpage-addstudent-title">Add Student</h5>
                <button
                  type="button"
                  className="close"
                  onClick={() => setShowAddStudentForm(false)}
                >
                  &times;
                </button>
              </div>
              <form onSubmit={handleAddStudentSubmit}>
                <div className="classdetailpage-addstudent-body">
                  <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      value={newStudent.name}
                      onChange={handleAddStudentChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      value={newStudent.email}
                      onChange={handleAddStudentChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Join Date</label>
                    <input
                      type="date"
                      className="form-control"
                      name="joinDate"
                      value={newStudent.joinDate}
                      onChange={handleAddStudentChange}
                      required
                    />
                  </div>
                </div>
                <div className="classdetailpage-addstudent-footer">
                  <button
                    type="button"
                    className="btn btn-secondary Add-close"
                    onClick={() => setShowAddStudentForm(false)}
                  >
                    Close
                  </button>
                  <button type="submit" className="btn btn-primary mb-4   Add-Student">
                    Add Student
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

    </>
  );
};

export default ClassDetailsPage;
