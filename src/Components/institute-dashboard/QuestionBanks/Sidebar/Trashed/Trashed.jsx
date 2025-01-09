import React, { useState } from "react";
import DataTable from "react-data-table-component";
import { FaUndo } from "react-icons/fa";
import "./Trashed.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFilePdf,
  faFolder,
  faFolderOpen,
  faFolderPlus,
  faArchive,
  faTrash,
  faEdit,
} from "@fortawesome/free-solid-svg-icons";
const Trashed = () => {
  const trashedData = [
    { id: 1, name: "Sample 1", questions: 10, lastModified: "2024-12-15" },
    { id: 2, name: "Sample 2", questions: 20, lastModified: "2024-12-20" },
    { id: 3, name: "Sample 3", questions: 15, lastModified: "2024-12-18" },
  ];

  const [selectedRows, setSelectedRows] = useState([]); // Track selected rows
  const [isAllChecked, setIsAllChecked] = useState(false); // Track "Check All" state

  // Handle "Check All" functionality
  const handleCheckAll = () => {
    if (isAllChecked) {
      setSelectedRows([]);
    } else {
      setSelectedRows(trashedData.map((row) => row.id));
    }
    setIsAllChecked(!isAllChecked);
  };

  // Handle individual row selection
  const handleRowSelect = (id) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter((rowId) => rowId !== id));
    } else {
      setSelectedRows([...selectedRows, id]);
    }
  };

  // Define the columns for the DataTable
  const columns = [
  {
    name: (
      <input
        type="checkbox"
        checked={isAllChecked}
        onChange={handleCheckAll}
        aria-label="Select All"
      />
    ),
    cell: (row) => (
      <input
        type="checkbox"
        checked={selectedRows.includes(row.id)}
        onChange={() => handleRowSelect(row.id)}
        aria-label={`Select ${row.name}`}
      />
    ),
    ignoreRowClick: true,
    allowOverflow: true,
    button: true,
    width: "50px", // Adjust width for checkbox column
  },
  {
    name: "Name",
    selector: (row) => row.name,
    sortable: true,
  },
  {
    name: "Questions",
    selector: (row) => row.questions,
    sortable: true,
  },
  {
    name: "Last Modifications",
    selector: (row) => row.lastModified,
    sortable: true,
  },
  {
    name: "Actions",
    cell: (row) => (
      <div className="action-buttons">
        <button
          className="archived-action-button"
          aria-label={`Restore ${row.name}`}
        >
          <FaUndo className="unarchive-icon" />
        </button>
        <button
          className="action-button delete"
          onClick={() => console.log("Delete", row.id)}
          aria-label={`Delete ${row.name}`}
        >
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </div>
    ),
    ignoreRowClick: true,
    allowOverflow: true,
    button: true,
     width: "190px"
  },
 
  
];


  return (
    <div className="archived-page">
      <div className="archived-title-container">
        <h2 className="archived-title py-3">Trashed Contents</h2>
      </div>

      <div className="archived-table-container m-2">
        <DataTable
          columns={columns}
          data={trashedData}
          pagination
          highlightOnHover
          striped
          selectableRowSelected={(row) => selectedRows.includes(row.id)} // Highlight selected rows
        />
      </div>
    </div>
  );
};

export default Trashed;
