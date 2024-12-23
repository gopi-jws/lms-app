
import "./Questionindex.css"; // Assuming you have styles for the table
import DataTable from "react-data-table-component";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFilePdf,
  faFolder,
  faArchive,
  faTrash,
  faEdit,
} from "@fortawesome/free-solid-svg-icons";

const Questionindex = ({ rows = [], onEdit, onDelete }) => {
  const [filterText, setFilterText] = useState("");
 const filteredRows = (rows || []).filter(
   (row) =>
     (row.name || "").toLowerCase().includes(filterText.toLowerCase()) ||
     (row.questions || "")
       .toString()
       .toLowerCase()
       .includes(filterText.toLowerCase()) || // Convert questions to string to handle non-string values
     (row.lastModified || "").toLowerCase().includes(filterText.toLowerCase())
 );

  // Define columns for the DataTable
const columns = [
  {
    name: (
      <input
        type="checkbox"
        onChange={(e) => console.log("Select All:", e.target.checked)}
        aria-label="Select All Rows"
      />
    ), // Select All checkbox in the header
    cell: (row) => (
      <input
        type="checkbox"
        onChange={(e) => console.log(`Row Selected: ${row.name}`)}
        aria-label={`Select row ${row.name}`}
      />
    ),
    width: "50px",
    ignoreRowClick: true,
    allowOverflow: true,
  },
  {
    name: "Name",
    selector: (row) => row.name,
    sortable: true,
    width: "200px", 
  },
  {
    name: "Questions",
    selector: (row) => row.questions,
    sortable: true,
    width: "190px", 
  },
  {
    name: "Last Modified",
    selector: (row) => row.lastModified,
    sortable: true,
    format: (row) => {
      const date = new Date(row.lastModified);
      return date instanceof Date && !isNaN(date)
        ? date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })
        : "23-12-2024"; // Return a fallback in case the date is invalid
    },
    width: "200px", // Custom width for Last Modified column
  },
  {
    name: "Actions",
    cell: (row, index) => (
      <div className="action-buttons">
        <button
          className="action-button pdf"
          onClick={() => console.log("PDF", index)}
        >
          <FontAwesomeIcon icon={faFilePdf} />
        </button>
        <button
          className="action-button folder"
          onClick={() => console.log("Folder", index)}
        >
          <FontAwesomeIcon icon={faFolder} />
        </button>
        <button
          className="action-button archive"
          onClick={() => console.log("Archive", index)}
        >
          <FontAwesomeIcon icon={faArchive} />
        </button>
        <button className="action-button edit" onClick={() => onEdit(index)}>
          <FontAwesomeIcon icon={faEdit} />
        </button>
        <button
          className="action-button delete"
          onClick={() => onDelete(index)}
        >
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </div>
    ),
    width: "350px",
    ignoreRowClick: true,
    allowOverflow: true,
    button: true,
  },
];
  return (
    <div className="Questionindex-container py-5">
      <div className="qs-content">
        <div className="header-section">
          <h2 className="qs-title">Question Bank List</h2>
          <input
            type="text"
            placeholder="Search..."
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
            className="qs-search"
          />
        </div>
        <div className="table-container">
          <DataTable
            columns={columns}
            data={filteredRows}
            pagination
            highlightOnHover
            striped
       
          />
        </div>
      </div>
    </div>
  );
};

export default Questionindex;
