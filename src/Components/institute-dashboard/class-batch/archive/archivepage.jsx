import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog, faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { MdOutlineArchive } from 'react-icons/md';
import { format } from 'date-fns';
import { Button } from 'react-bootstrap';
import ClassSideMenu from '../classsidemenu/classsidemenu';
// import './classpage.css';

const initialClasses = [
  { id: '1', name: 'Mathematics', strength: 30, maximumallowed: 50, expiryDate: new Date(2024, 5, 30) },
  { id: '2', name: 'Physics', strength: 10000, maximumallowed: 50, expiryDate: new Date(2024, 6, 15) },
  { id: '3', name: 'Chemistry', strength: 28, maximumallowed: 50, expiryDate: new Date(2024, 7, 1) },
];

const ArchivePage = () => {
  const [classes, setClasses] = useState(initialClasses);
  const [archivedClasses, setArchivedClasses] = useState([]);
  const [trashedClasses, setTrashedClasses] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newClassName, setNewClassName] = useState('');
  const [currentClassId, setCurrentClassId] = useState('');

  const handleSettings = (id) => {
    console.log(`Settings for class ${id}`);
  };

  const handleRename = (id) => {
    setCurrentClassId(id);
    setIsModalOpen(true);
  };

  const handleInputChange = (e) => {
    setNewClassName(e.target.value);
  };

  const handleRenameSubmit = () => {
    if (newClassName) {
      setClasses(classes.map((c) => (c.id === currentClassId ? { ...c, name: newClassName } : c)));
      setIsModalOpen(false);
      setNewClassName('');
    }
  };

  const handleArchive = (id) => {
    const classToArchive = classes.find((c) => c.id === id);
    if (classToArchive) {
      setClasses(classes.filter((c) => c.id !== id));
      setArchivedClasses([...archivedClasses, classToArchive]);
    }
  };

  const handleDelete = (id) => {
    const classToDelete = classes.find((c) => c.id === id);
    if (classToDelete) {
      setClasses(classes.filter((c) => c.id !== id));
      setTrashedClasses([...trashedClasses, classToDelete]);
    }
  };

  const handleUnarchive = (id) => {
    const classToUnarchive = archivedClasses.find((c) => c.id === id);
    if (classToUnarchive) {
      setArchivedClasses(archivedClasses.filter((c) => c.id !== id));
      setClasses([...classes, classToUnarchive]);
    }
  };

  const handleArchiveDelete = (id) => {
    setArchivedClasses(archivedClasses.filter((c) => c.id !== id));
  };

  return (
    <div className="d-flex">
      <ClassSideMenu archivedCount={archivedClasses.length} trashedCount={trashedClasses.length} />

      <div className="container py-5" style={{ marginLeft: '250px', width: 'calc(100% - 250px)' }}>
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
                <td>{cls.name}</td>
                <td>{cls.strength}</td>
                <td>{cls.maximumallowed}</td>
                <td>{format(cls.expiryDate, 'PP')}</td>
                <td>
                  <div className="d-flex">
                    <Button variant="outline-secondary" size="sm" onClick={() => handleSettings(cls.id)} className="me-2">
                      <FontAwesomeIcon icon={faCog} className="h-4 w-4" />
                    </Button>
                    <Button variant="outline-secondary" size="sm" onClick={() => handleRename(cls.id)} className="me-2">
                      <FontAwesomeIcon icon={faEdit} className="h-4 w-4" />
                    </Button>
                    <Button variant="outline-secondary" size="sm" onClick={() => handleArchive(cls.id)} className="me-2">
                      <MdOutlineArchive className="h-4 w-4" style={{ fontSize: '21px' }} />
                    </Button>
                    <Button variant="outline-secondary" size="sm" onClick={() => handleDelete(cls.id)} className="me-2">
                      <FontAwesomeIcon icon={faTrashAlt} className="h-4 w-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for renaming class */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-container">
            <h3>Rename Class</h3>
            <input
              type="text"
              value={newClassName}
              onChange={handleInputChange}
              placeholder="Enter new class name"
              className="input-field"
            />
            <div className="modal-actions">
              <Button variant="outline-primary" onClick={handleRenameSubmit}>Submit</Button>
              <Button variant="outline-secondary" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            </div>
          </div>
        </div>
      )}
      
      {/* Render nested routes here */}
    </div>
  );
};

export default ArchivePage;
