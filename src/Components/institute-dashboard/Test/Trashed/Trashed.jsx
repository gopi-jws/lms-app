import React, { useState } from "react";
import DataTable from "react-data-table-component";
import DispatchModal from "../DispatchModal/DispatchModal";
import {
  FaPaperPlane,
  FaCopy,
  FaFilePdf,
  FaArchive,
  FaTrashAlt,
  FaSearch,
  FaShare,
} from "react-icons/fa";
import "../TestIndex/TestIndex.css";
import TopBar from "../../class-batch/classtopbar/classtopbar";
import ShareModal from "../ShareModal/ShareModal"; // Import the ShareModal component

const data = [
  { id: 1, test: "Test 1", owner: "John Doe", lastModified: "2024-12-23" },
  { id: 2, test: "Test 2", owner: "Jane Smith", lastModified: "2024-12-22" },
 
];
const Trashed = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
          const [isShareModalOpen, setIsShareModalOpen] = useState(false);
          const [searchTerm, setSearchTerm] = useState("");
          const [filteredData, setFilteredData] = useState(data);
          const [emails, setEmails] = useState([]);
        
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
        
          const columns = [
            {
              name: "Test",
              selector: (row) => row.test,
              sortable: true,
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
            },
            {
              name: "Actions",
              cell: (row) => (
                <div className="test-action-buttons">
                 
                  <button
                    className="test-action-button share"
                    aria-label="Share"
                    onClick={() => setIsShareModalOpen(true)}
                  >
                    <FaShare />
                  </button>
                  <button className="test-action-button archive" aria-label="Archive">
                    <FaArchive />
                  </button>
                  <button className="test-action-button delete" aria-label="Delete">
                    <FaTrashAlt />
                  </button>
                </div>
              ),
              width: "350px",
            },
          ];
    
  return (
   <div className="test-index-wrapper">
      <TopBar />
      <div className="test-index-container">
        <div className="test-index-header">
          <h1>Trashed List</h1>
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

        {/* ShareModal component */}
        <ShareModal
          isOpen={isShareModalOpen}
          onClose={() => setIsShareModalOpen(false)}
          emails={emails}
          setEmails={setEmails}
        />

        <DispatchModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      </div>
    </div>
  );
  
}

export default Trashed