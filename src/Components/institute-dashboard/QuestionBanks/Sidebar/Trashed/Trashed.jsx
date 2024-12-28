import React from "react";
import DataTable from "react-data-table-component";
import { FaUndo } from "react-icons/fa";
import "./Trashed.css";
import TopBar from "../../../class-batch/classtopbar/classtopbar";


const Trashed = () => {
  const trashedData = [
    { name: "Sample 1", questions: 10, lastModified: "2024-12-15" },
  ];

  // Define the columns for the DataTable
  const columns = [
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
          aria-label={`Restore ${row.name}`}
        >
          <FaUndo className="unarchive-icon" />
        </button>
      ),
    },
  ];

  return (
    <div className="archived-page">
  <TopBar />
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
          noHeader
        />
      </div>
    </div>
  );
};

export default Trashed;
