import React, { useState } from 'react';
import DataTable from 'react-data-table-component';
import './TeachersIndex.css';
import {
  FaPaperPlane,
  FaCopy,
  FaFilePdf,
  FaArchive,
  FaTrashAlt,
  FaSearch,
  FaShare,
   FaTrash,
  FaCheckCircle,
  FaTimesCircle,
  FaUserPlus,
} from "react-icons/fa";

const TeachersIndex = () => {
  const [teachersData, setTeachersData] = useState([
    { id: 1, email: 'teacher1@example.com', date: '26-12-2024', status: 'Inactive' },
    { id: 2, email: 'teacher2@example.com', date: '27-12-2024', status: 'Active' },
    { id: 3, email: 'teacher3@example.com', date: '27-12-2024', status: 'Active' },
  ]);

  const [searchTerm, setSearchTerm] = useState(''); // New state for search term

  // Action Handlers
  const handleActivate = (id) => {
    const updatedData = teachersData.map((teacher) =>
      teacher.id === id ? { ...teacher, status: 'Active' } : teacher
    );
    setTeachersData(updatedData);
  };

  const handleDeactivate = (id) => {
    const updatedData = teachersData.map((teacher) =>
      teacher.id === id ? { ...teacher, status: 'Inactive' } : teacher
    );
    setTeachersData(updatedData);
  };

  const handleDelete = (id) => {
    const updatedData = teachersData.filter((teacher) => teacher.id !== id);
    setTeachersData(updatedData);
  };

  // Filter data based on search term
  const filteredData = teachersData.filter(
    (teacher) =>
      teacher.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teacher.date.includes(searchTerm)
  );

  // Define Table Columns
  const columns = [
  {
    name: 'Teachers Emails',
    selector: (row) => row.email,
    sortable: true,
    cell: (row) => <div className="email-cell">{row.email}</div>,
  },
  {
    name: 'Added Date',
    selector: (row) => row.date,
    sortable: true,
    cell: (row) => (
      <div className={"status-badge "}>
        {row.date}
      </div>
    ),
  },
  {
    name: 'Actions',
    cell: (row) => (
      <div className="action-buttons">
        <button
          className={`btn btn-activate ${row.status === 'Active' ? 'active' : 'inactive'}`}
          onClick={() => handleActivate(row.id)}
          disabled={row.status === 'Active'}
        >
          <FaCheckCircle />
        </button>
        <button
          className={`btn btn-deactivate ${row.status === 'Inactive' ? 'active' : 'inactive'}`}
          onClick={() => handleDeactivate(row.id)}
          disabled={row.status === 'Inactive'}
        >
          <FaTimesCircle />
        </button>
        <button
          className="btn btn-delete"
          onClick={() => handleDelete(row.id)}
        >
          <FaTrashAlt />
        </button>
      </div>
    ),
  },
];

  const customStyles = {
    headRow: {
      style: {
        backgroundColor: '#f8f9fa',
        color: '#495057',
        fontSize: '14px',
        fontWeight: 'bold',
      },
    },
    rows: {
      style: {
        fontSize: '14px',
        '&:nth-of-type(odd)': {
          backgroundColor: '#f8f9fa',
        },
      },
    },
  };

  return (
    <div className="teachers-index">
      <div className="content-wrapper">
        <div className="header-container">
          <h1>Teachers List</h1>
          {/* <button className="btn btn-add-teachers">
            <FaUserPlus /> Add Teachers
          </button> */}
        </div>
        <div className="search-container">
          <input
            type="text"
            placeholder="Search teachers..."
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} // Update searchTerm on input change
          />
          {/* <FaSearch className="search-icon " /> */}
        </div>
        <DataTable
          columns={columns}
          data={filteredData} // Use filtered data for the table
          selectableRows
          pagination
          highlightOnHover
          customStyles={customStyles}
          className="teachers-table"
        />

        <div className="bulk-actions">
                            <button  className="bulk-action-button bulk-delete-button">
                              <FaTrash /> Delete Selected
                            </button>
                            <button  className="bulk-action-button bulk-copy-button">
                              <FaCopy /> Copy Selected
                            </button>
                            
                          </div>
      </div>
    </div>
  );
};

export default TeachersIndex;
