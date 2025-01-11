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
  FaShare,
  FaTag,
  FaEllipsisH,
  FaDownload 
} from "react-icons/fa";
import "./TestIndex.css";
import ShareModal from "../ShareModal/ShareModal";
import { Link } from "react-router-dom";
import TablePagination from "../../../../TablePagination";

const data = [
  { id: 1, test: "Test 1", owner: "John Doe",status :"Published", lastModified: "2days ego by You" },
  { id: 2, test: "Test 2", owner: "Jane Smith", status :"notpublished", lastModified: "1month ago by You" },
  { id: 3, test: "Test 3", owner: "Mark Johnson",status :"Published",  lastModified: "5days ago by You" },
  { id: 4, test: "Test 4", owner: "Mark Johnson", status :"Published", lastModified: "30mns ago by You" },
  { id: 5, test: "Test 5", owner: "Mark Johnson", status :"notpublished", lastModified: "2month ago by You" },
  { id: 6, test: "Test 6", owner: "Mark Johnson", status :"Published", lastModified: "1day ago by You" },
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
  const [tags, setTags] = useState(["Urgent", "Review", "Completed"]);
  const [newTag, setNewTag] = useState("");
  const [showTagOptions, setShowTagOptions] = useState(false);
  const [showMoreOptions, setShowMoreOptions] = useState(false);
   const [rowsPerPage, setRowsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

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
      setSelectedRows(filteredData.map((row) => row.id));
    } else {
      setSelectedRows([]);
    }
  };

  const handleRowSelect = (id) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter((rowId) => rowId !== id));
    } else {
      setSelectedRows([...selectedRows, id]);
    }
  };

  const handleAddTag = () => {
    if (newTag.trim()) {
      setTags([...tags, newTag]);
      setNewTag("");
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
      width: "150px",
    },
    {
      name: "Owner",
      selector: (row) => row.owner,
      sortable: true,
    },
     {
      name: "Status",
      selector: (row) => row.status,
      sortable: true,
    },
    {
      name: "Last Modified",
      selector: (row) => row.lastModified,
      sortable: true,
      width: "170px",
    },
   {
  name: "Actions",
  cell: (row) => (
    <div className="test-action-buttons">
      <button
        className="test-action-button dispatch"
        aria-label="Dispatch"
        onClick={() => setIsModalOpen(true)}
      >
        <FaPaperPlane />
        <span className="tooltip-text">Dispatch</span>
      </button>
      <button className="test-action-button copy" aria-label="Copy">
        <FaCopy />
        <span className="tooltip-text">Copy</span>
      </button>
      <button className="test-action-button pdf" aria-label="Download PDF">
        <FaFilePdf />
        <span className="tooltip-text">Download PDF</span>
      </button>
      <button
        className="test-action-button share"
        aria-label="Share"
        onClick={() => setIsShareModalOpen(true)}
      >
        <FaShare />
        <span className="tooltip-text">Share</span>
      </button>
      <button className="test-action-button archive" aria-label="Archive">
        <FaArchive />
        <span className="tooltip-text">Archive</span>
      </button>
      <button className="test-action-button delete" aria-label="Delete">
        <FaTrashAlt />
        <span className="tooltip-text">Delete</span>
      </button>
    </div>
  ),
  width: "250px",
},

  ];

  const conditionalRowStyles = [
    {
      when: (row) => selectedRows.includes(row.id),
      style: {
        backgroundColor: "#f0f8ff",
        color: "#000",
      },
    },
  ];

  return (
    <div className="test-index-wrapper">
      <div className="test-index-container">
        <div className="test-index-header">
          <h1 className="test-index-title">Test List</h1>
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
          {selectedRows.length > 0 && (
          <div className="bulk-actions">
            <button className="bulk-action-button bulk-delete-button">
              <FaTrash  className="bulk-icon"/>
              <span className="tooltip-text">Delete </span>
            </button>
            <div className="divider"></div>
            <button className="bulk-action-button bulk-archive-button">
              <FaArchive className="bulk-icon"/>
              <span className="tooltip-text">Archive </span>
            </button>
            <div className="divider"></div>
            <button className="bulk-action-button bulk-download-button">
           <FaDownload className="bulk-icon" />

              <span className="tooltip-text">Download </span>
            </button>
            <div className="divider"></div>
            <div className="bulk-action-button">
              <button
                className="bulk-tag-button bulk-icon"
                onClick={() => setShowTagOptions(!showTagOptions)}
              >
                <FaTag />
                <span className="tooltip-text">Tag</span>
              </button>
              {showTagOptions && (
                <div className="tag-options">
                  <ul>
                    {tags.map((tag, index) => (
                      <li key={index}>{tag}</li>
                    ))}
                  </ul>
                  <input
                    type="text"
                    placeholder="New tag"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                  />
                  <button onClick={handleAddTag}>Add Tag</button>
                </div>
              )}
            </div>
            <div className="divider"></div>
            <div className="bulk-action-button">
              <button
                className="more-button"
                onClick={() => setShowMoreOptions(!showMoreOptions)}
              >
               More
              </button>
              {showMoreOptions && (
                <div className="more-options">
                  <ul>
                    <li>Rename</li>
                    <li>Make a Copy</li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}
        </div>
      
        <DataTable
           columns={columns}
          data={filteredData.slice(0, rowsPerPage * currentPage)}
          pagination={false}
          conditionalRowStyles={conditionalRowStyles}
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
      </div>
      <div className="flex items-center space-x-2">
            <div className="pagination-info">
              Showing {Math.min(rowsPerPage * currentPage, filteredData.length)} out of {filteredData.length} Tests
            </div>
            {rowsPerPage * currentPage < filteredData.length && (
              <button
                variant="outline"
                size="sm"
                className="load-more-button"
                onClick={() => setCurrentPage(currentPage + 1)}
              >
                Load More
              </button>
            )}
          </div>
    </div>
  );
};

export default TestIndex;
