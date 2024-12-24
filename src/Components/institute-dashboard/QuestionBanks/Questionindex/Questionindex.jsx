import "./Questionindex.css";
import DataTable from "react-data-table-component";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFilePdf,
  faFolder,
  faArchive,
  faTrash,
  faEdit,
} from "@fortawesome/free-solid-svg-icons";
import TopBar from "../../class-batch/classtopbar/classtopbar";
import { Link } from "react-router-dom"; // Import Link for navigation

const Questionindex = () => {
  // Static rows for the table with IDs
  const rows = [
    {
      id: 1, // Adding an ID for each question bank
      name: "Test 1",
      questions: 10,
      lastModified: "2024-12-23T14:00:00",
    },
    {
      id: 2, // Adding an ID for each question bank
      name: "Test 2",
      questions: 0, // This one has no questions
      lastModified: "2024-12-22T12:00:00",
    },
    {
      id: 3, // Adding an ID for each question bank
      name: "Test 3",
      questions: 15,
      lastModified: "2024-12-20T10:30:00",
    },
  ];

  // Define columns for the DataTable
  const columns = [
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
      width: "200px",
      cell: (row) => (
        <Link to={`/QuestionBank/${row.id}/add`}>
          <button className="qb-button">{row.name}</button>
        </Link>
      ),
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
      cell: (row) => (
        <div className="action-buttons">
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
      width: "350px",
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  return (
    <div className="Questionindex-container py-5">
      <TopBar />
      <div className="qs-content">
        <div className="header-section">
          <h2 className="qs-title">Question Bank List</h2>
        </div>
        <div className="table-container">
          <DataTable
            columns={columns}
            data={rows} // Static rows
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
