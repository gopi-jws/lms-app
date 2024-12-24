import React from "react";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUndo, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { format } from "date-fns";
import './trashpage.css';

const TrashPage = ({ trashedClasses, handleRestore, handleTrashDelete }) => {
  return (
    <div className="container py-5" style={{ marginLeft: '220px', width: 'calc(100% - 220px)' }}>
      {trashedClasses.length > 0 ? (
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
            {trashedClasses.map((cls) => (
              <tr key={cls.id}>
                <td>{cls.name}</td>
                <td>{cls.strength}</td>
                <td>{cls.maximumallowed}</td>
                <td>{format(cls.expiryDate, "PP")}</td>
                <td>
                  <div className="d-flex">
                    {/* Restore Button */}
                    <Button variant="outline-secondary" size="sm" onClick={() => handleRestore(cls.id)} className="me-2">
                      <FontAwesomeIcon icon={faUndo} className="h-4 w-4" />
                    </Button>
                    {/* Permanently Delete Button */}
                    <Button variant="outline-secondary" size="sm" onClick={() => handleTrashDelete(cls.id)} className="me-2">
                      <FontAwesomeIcon icon={faTrashAlt} className="h-4 w-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="No-trash">
          <p>No trashed classes available.</p>
        </div>
      )}
    </div>
  );
};

export default TrashPage;
