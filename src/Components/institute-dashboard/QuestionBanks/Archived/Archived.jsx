import React, { useState } from "react";
import DataTable from "react-data-table-component";
import { FaUndo } from "react-icons/fa";
import "./Archived.css";

const Archived = () => {
  const [selectedRows, setSelectedRows] = useState([]); // Tracks selected rows
  const [isAllChecked, setIsAllChecked] = useState(false); // Tracks "Check All" state

  const archivedData = [
    { id: 1, name: "Sample 1", questions: 10, lastModified: "2024-12-15" },
    { id: 2, name: "Sample 2", questions: 20, lastModified: "2024-12-20" },
  ];

  // Handle "Check All" functionality
  const handleCheckAll = () => {
    if (isAllChecked) {
      setSelectedRows([]);
    } else {
      setSelectedRows(archivedData.map((row) => row.id));
    }
    setIsAllChecked(!isAllChecked);
  };

  // Handle individual checkbox toggle
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
      width: "50px", // Adjust column width for checkboxes
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
        <button
          className="archived-action-button"
          aria-label={`Unarchive ${row.name}`}
        >
          <FaUndo className="unarchive-icon" />
        </button>
      ),
    },
  ];

  return (
    <div className="archived-page">
      <div className="archived-title-container">
        <h2 className="archived-title py-3">Archived Contents</h2>
      </div>

      <div className="archived-table-container py-3 m-2">
        <DataTable
          columns={columns}
          data={archivedData}
          pagination
          highlightOnHover
          striped
          selectableRowSelected={(row) => selectedRows.includes(row.id)} // Highlight selected rows
        />
      </div>
    </div>
  );
};

export default Archived;
