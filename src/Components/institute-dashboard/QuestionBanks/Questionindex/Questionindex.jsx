import "./Questionindex.css";
import DataTable from "react-data-table-component";
import React, { useState } from "react";
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
import TopBar from "../../class-batch/classtopbar/classtopbar";
import { Link } from "react-router-dom"; // Import Link for navigation

const Questionindex = () => {
  // Static rows for the table with IDs
  const rows = [
    { id: 1, name: "Test 1", questions: 10, lastModified: "2024-12-23T14:00:00" },
    { id: 2, name: "Test 2", questions: 0, lastModified: "2024-12-22T12:00:00" },
    { id: 3, name: "Test 3", questions: 15, lastModified: "2024-12-20T10:30:00" },
    { id: 4, name: "Test 4", questions: 15, lastModified: "2024-12-20T10:30:00" },
  ];

  // State for selected rows
  const [selectedRows, setSelectedRows] = useState([]);
  
  // State for search query
  const [searchQuery, setSearchQuery] = useState("");

  // Filter rows based on the search query
  const filteredRows = rows.filter(
    (row) =>
      row.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      row.questions.toString().includes(searchQuery) ||
      row.lastModified.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle row selection
  const handleRowSelection = (rowId) => {
    if (selectedRows.includes(rowId)) {
      setSelectedRows(selectedRows.filter((id) => id !== rowId)); // Deselect the row
    } else {
      setSelectedRows([...selectedRows, rowId]); // Select the row
    }
  };

  // Handle Select All checkbox
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedRows(filteredRows.map((row) => row.id)); // Select all filtered rows
    } else {
      setSelectedRows([]); // Deselect all
    }
  };

  // Check if all rows are selected
  const isSelectAllChecked = filteredRows.length > 0 && selectedRows.length === filteredRows.length;

  // Define columns for the DataTable
  const columns = [
    {
      name: (
        <input
          type="checkbox"
          checked={isSelectAllChecked}
          onChange={handleSelectAll}
        />
      ), // "Select All" checkbox in the header
      selector: (row) => row.id,
      cell: (row) => (
        <input
          type="checkbox"
          checked={selectedRows.includes(row.id)} // Check if this row is selected
          onChange={() => handleRowSelection(row.id)} // Handle row selection
        />
      ),
      width: "80px",
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
      width: "200px",
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className="action-buttons">
          {/* Add Button */}
          <Link to={`/QuestionBank/${row.id}/add`}>
            <button className="action-button add">
              <FontAwesomeIcon icon={faFolderPlus} />
            </button>
          </Link>
          <button
            className="action-button pdf"
            onClick={() => console.log("PDF", row.id)}
          >
            <FontAwesomeIcon icon={faFilePdf} />
          </button>
          <button
            className="action-button folder"
            onClick={() => console.log("Folder", row.id)}
          >
            <FontAwesomeIcon icon={faFolder} />
          </button>
          <button
            className="action-button archive"
            onClick={() => console.log("Archive", row.id)}
          >
            <FontAwesomeIcon icon={faArchive} />
          </button>
          <button
            className="action-button delete"
            onClick={() => console.log("Delete", row.id)}
          >
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </div>
      ),
      width: "300px",
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  return (
    <div className="Questionindex-container">
      <TopBar />
      <div className="qs-content">
        <div className="header-section">
          <h2 className="qs-title">Question Bank List</h2>
        </div>
        <div className="search-section pb-3">
          <input
            type="text"
            placeholder="Search..."
            className="search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="table-container">
          <DataTable
            columns={columns}
            data={filteredRows} // Use filtered rows based on search query
            pagination
            highlightOnHover
            striped
            onSelectedRowsChange={handleRowSelection} // Handle row selection
            selectableRows={false} // Disable the automatic checkbox rendering
          />
        </div>
      </div>
    </div>
  );
};

export default Questionindex;
