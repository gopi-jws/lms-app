import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog, faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { MdOutlineArchive } from "react-icons/md";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import "./classpage.css";
import { FaArrowLeft, FaPlus, FaEdit, FaTrash, FaCopy } from "react-icons/fa";
const ClassPage = ({ classes, handleRename, handleSettings, handleArchive, handleTrash }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newClassName, setNewClassName] = useState("");
  const [editingClassId, setEditingClassId] = useState(null);
  const [selectedRows, setSelectedRows] = useState([]);
  const [isAllChecked, setIsAllChecked] = useState(false);
  const [searchTerm, setSearchTerm] = useState(""); // State to store search term

  // Handle "Check All" checkbox
  const handleCheckAll = () => {
    if (isAllChecked) {
      setSelectedRows([]); // Uncheck all
    } else {
      setSelectedRows(classes.map((cls) => cls.id)); // Check all
    }
    setIsAllChecked(!isAllChecked);
  };

  // Handle individual row checkbox
  const handleRowCheck = (classId) => {
    setSelectedRows((prevSelected) =>
      prevSelected.includes(classId)
        ? prevSelected.filter((id) => id !== classId) // Uncheck
        : [...prevSelected, classId] // Check
    );
  };

  const handleOpenRenameModal = (classId) => {
    const classToRename = classes.find((cls) => cls.id === classId);
    if (classToRename) {
      setNewClassName(classToRename.name);
      setEditingClassId(classId);
      setIsModalOpen(true);
    }
  };

  const handleInputChange = (e) => {
    setNewClassName(e.target.value);
  };

  const handleRenameSubmit = () => {
    if (newClassName.trim()) {
      handleRename(editingClassId, newClassName);
      setIsModalOpen(false);
    }
  };

  // Filter classes based on search term
  const filteredClasses = classes.filter((cls) =>
    cls.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="class-page-container p-5" style={{ marginLeft: "238px", width: "calc(100% - 220px)" }}>
        <div className="classpage-button-container d-flex justify-content-between mb-4 p-5 mt-4">
  
   {/* Search input */}
  <div className="classpage-search-container">
    <input
      type="text"
      placeholder="Search by class name"
      className="classpage-search-input"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
  </div>
  
  
  
  
  {/* Add Class Button */}
  <Link to="/class/addclass" className="class-page-add-class-btn">
    Add Class
  </Link>

</div>
    <table className="table">
          <thead>
            <tr>
              <th>
                <input
                  type="checkbox"
                  checked={isAllChecked}
                  onChange={handleCheckAll}
                />
              </th>
              <th>Class Name</th>
              <th>Strength</th>
              <th>Maximum Allowed</th>
              <th>Expiry Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredClasses.map((cls) => (
              <tr key={cls.id}>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedRows.includes(cls.id)}
                    onChange={() => handleRowCheck(cls.id)}
                  />
                </td>
                <td>
                  <Link
                    to={`/class/${cls.id}/classdetailpage`}
                    state={{ id: cls.id }}
                  >
                    {cls.name}
                  </Link>
                </td>
                <td>{cls.strength}</td>
                <td>{cls.maximumallowed}</td>
                <td>{format(cls.expiryDate, "PP")}</td>
                <td>
                  <div className="d-flex">
                    <Button
                      variant="outline-secondary"
                      size="sm"
                      onClick={() => handleSettings(cls.id)}
                      className="me-2"
                    >
                      <FontAwesomeIcon icon={faCog} className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline-secondary"
                      size="sm"
                      onClick={() => handleOpenRenameModal(cls.id)}
                      className="me-2"
                    >
                      <FontAwesomeIcon icon={faEdit} className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline-secondary"
                      size="sm"
                      onClick={() => handleArchive(cls.id)}
                      className="me-2"
                    >
                      <MdOutlineArchive
                        className="h-4 w-4"
                        style={{ fontSize: "21px" }}
                      />
                    </Button>
                    <Button
                      variant="outline-secondary"
                      size="sm"
                      onClick={() => handleTrash(cls.id)}
                      className="me-2"
                    >
                      <FontAwesomeIcon icon={faTrashAlt} className="h-4 w-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {isModalOpen && (
          <div className="classpage-modal-overlay">
            <div className="classpage-modal-container">
              <h3>Rename Class</h3>
              <input
                type="text"
                value={newClassName}
                onChange={handleInputChange}
                placeholder="Enter new class name"
                className="class-overlay-input-field"
              />
              <div className="class-overlay-modal-actions">
                <Button variant="outline-primary" onClick={handleRenameSubmit}>
                  Submit
                </Button>
                <Button
                  variant="outline-secondary"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        )}
         <div className="bulk-actions">
                                  <button  className="bulk-action-button bulk-delete-button">
                                    <FaTrash /> Delete Selected
                                  </button>
                                  <button  className="bulk-action-button bulk-copy-button">
                                    <FaCopy /> Copy Selected
                                  </button>
                                  
                                </div>
      </div>
    </>
  );
};

export default ClassPage;
