import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog, faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { MdOutlineArchive } from "react-icons/md";
import { format } from "date-fns";
import { Link } from 'react-router-dom';
import './classpage.css';

const ClassPage = ({ classes, handleRename, handleSettings, handleArchive, handleTrash,  }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newClassName, setNewClassName] = useState("");
  const [editingClassId, setEditingClassId] = useState(null);

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

  return (
    <div className="container py-5" style={{ marginLeft: '220px', width: 'calc(100% - 220px)' }}>
      <table className="table">
        <thead>
          <tr>
            <th>Class Name</th>
            <th>Strength</th>
            <th>Maximum Allowed</th>
            <th>Expiry Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {classes.map((cls) => (
            <tr key={cls.id}>
              <td>
                {/* Use Link to navigate to details page */}
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
                  <Button variant="outline-secondary" size="sm" onClick={() => handleSettings(cls.id)} className="me-2">
                    <FontAwesomeIcon icon={faCog} className="h-4 w-4" />
                  </Button>

                  <Button variant="outline-secondary" size="sm" onClick={() => handleOpenRenameModal(cls.id)} className="me-2">
                    <FontAwesomeIcon icon={faEdit} className="h-4 w-4" />
                  </Button>

                  <Button variant="outline-secondary" size="sm" onClick={() => handleArchive(cls.id)} className="me-2">
                    <MdOutlineArchive className="h-4 w-4" style={{ fontSize: '21px' }} />
                  </Button>

                  <Button variant="outline-secondary" size="sm" onClick={() => handleTrash(cls.id)} className="me-2">
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
              <Button variant="outline-primary" onClick={handleRenameSubmit}>Submit</Button>
              <Button variant="outline-secondary" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            </div>
          </div>
        </div>
      )}

      <div className="classpage-button-container">
        <Link to="/class/addclass" className="class-page-add-class-btn">
          Add Class
        </Link>
      </div>
    </div>
  );
};

export default ClassPage;
