import React, { useState } from "react";
import DataTable from "react-data-table-component";
import DispatchModal from "../DispatchModal/DispatchModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  FaPaperPlane,
  FaCopy,
  
  FaFilePdf,
  FaArchive,
  FaTrashAlt,
  FaSearch,
FaTrash,
  FaShare
} from "react-icons/fa";
import {
  faFilePdf,
  faFolder,
  faFolderOpen,
  faFolderPlus,  // Add this line
  faArchive,
  faTrash,
  faEdit,
} from "@fortawesome/free-solid-svg-icons";
import "./TestIndex.css";
import ShareModal from "../ShareModal/ShareModal";
import { Link } from "react-router-dom"; // Import Link for navigation

const data = [
  { id: 1, test: "Test 1", owner: "John Doe", lastModified: "2024-12-23" },
  { id: 2, test: "Test 2", owner: "Jane Smith", lastModified: "2024-12-22" },
  { id: 3, test: "Test 3", owner: "Mark Johnson", lastModified: "2024-12-20" },
  { id: 4, test: "Test 4", owner: "Mark Johnson", lastModified: "2024-12-20" },
  { id: 5, test: "Test 5", owner: "Mark Johnson", lastModified: "2024-12-20" },
  { id: 6, test: "Test 6", owner: "Mark Johnson", lastModified: "2024-12-20" },
];
const mockScheduledTests = [
  { date: "2025-01-05", time: "10:30 AM" },
  { date: "2025-01-06", time: "2:00 PM" },
];

const TestIndex = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState(data);
  const [emails, setEmails] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);

  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchTerm(value);
    const filtered = data.filter(
      (item) =>
        item.test.toLowerCase().includes(value) ||
        item.owner.toLowerCase().includes(value) ||
        item.lastModified.includes(value)
    );
    setFilteredData(filtered);
  };

  const handleSelectAll = (event) => {
    if (event.target.checked) {
      setSelectedRows(filteredData.map((row) => row.id)); // Select all visible rows
    } else {
      setSelectedRows([]); // Deselect all
    }
  };

  const handleRowSelect = (id) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter((rowId) => rowId !== id));
    } else {
      setSelectedRows([...selectedRows, id]);
    }
  };

 const columns = [
  {
    name: (
      <input
        type="checkbox"
        onChange={handleSelectAll}
        checked={
          selectedRows.length > 0 &&
          selectedRows.length === filteredData.length
        }
      />
    ),
    cell: (row) => (
      <input
        type="checkbox"
        checked={selectedRows.includes(row.id)}
        onChange={() => handleRowSelect(row.id)}
      />
    ),
    width: "50px",
  },
  {
    name: "Test Names",
    selector: (row) => row.test,
    sortable: true,
    cell: (row) => (
      <Link to={`/test/${row.id}/movetest`}>
        <span className="row-link">{row.test}</span>
      </Link>
    ),
    width: "200px",
  },
  {
    name: "Owner",
    selector: (row) => row.owner,
    sortable: true,
  },
  {
    name: "Last Modified",
    selector: (row) => row.lastModified,
    sortable: true,
    width: "150px",
  },
  {
    name: "Actions",
    cell: (row) => (
      <div className="test-action-buttons">
        <button
          className="test-action-button dispatch"
          aria-label="Dispatch"
          title="Dispatch"
          onClick={() => setIsModalOpen(true)}
        >
          <FaPaperPlane />
        </button>
        <button
          className="test-action-button copy"
          aria-label="Copy"
          title="Copy"
        >
          <FaCopy />
        </button>
        <button
          className="test-action-button pdf"
          aria-label="Download PDF"
          title="Download PDF"
        >
          <FaFilePdf />
        </button>
        <button
          className="test-action-button share"
          aria-label="Share"
          title="Share"
          onClick={() => setIsShareModalOpen(true)}
        >
          <FaShare />
        </button>
        <button
          className="test-action-button archive"
          aria-label="Archive"
          title="Archive"
        >
          <FaArchive />
        </button>
        <button
          className="test-action-button delete"
          aria-label="Delete"
          title="Delete"
        >
          <FaTrashAlt />
        </button>
      </div>
    ),
    width: "350px",
  },
];


  return (
    <div className="test-index-wrapper">
      <div className="test-index-container">
        <div className="test-index-header">
          <h1>Test List</h1>
          <div className="test-index-actions">
            <div className="test-search-container">
              <input
                type="text"
                placeholder="Search tests..."
                className="test-search-input"
                value={searchTerm}
                onChange={handleSearch}
              />
              <FaSearch className="test-search-icon" />
            </div>
          </div>
        </div>

        <DataTable
          columns={columns}
          data={filteredData}
          pagination
          paginationPerPage={5}
          paginationRowsPerPageOptions={[5, 10, 15]}
        />

        <ShareModal
          isOpen={isShareModalOpen}
          onClose={() => setIsShareModalOpen(false)}
          emails={emails}
          setEmails={setEmails}
        />

        <DispatchModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
           scheduledTests={mockScheduledTests} 
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

export default TestIndex;
