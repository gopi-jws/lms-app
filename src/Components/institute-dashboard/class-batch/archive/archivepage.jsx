import React from 'react';
import { Button } from 'react-bootstrap';

const ArchivePage = ({ archivedClasses, handleUnarchive, handleArchiveDelete }) => {
    
  return (
    <div className="container py-5">
      <h2>Archived Classes</h2>
      {archivedClasses.length === 0 ? (
        <p>No archived classes.</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Class Name</th>
              <th>Strength</th>
              <th>Maximum Allowed</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {archivedClasses.map((cls) => (
              <tr key={cls.id}>
                <td>{cls.name}</td>
                <td>{cls.strength}</td>
                <td>{cls.maximumallowed}</td>
                <td>
                  <div className="d-flex">
                    <Button variant="outline-secondary" size="sm" onClick={() => handleUnarchive(cls.id)} className="me-2">
                      Unarchive
                    </Button>
                    <Button variant="outline-danger" size="sm" onClick={() => handleArchiveDelete(cls.id)} className="me-2">
                      Delete
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ArchivePage;
