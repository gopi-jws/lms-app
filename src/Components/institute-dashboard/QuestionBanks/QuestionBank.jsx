import React, { useState } from "react";
import { Routes, Route, Outlet } from "react-router-dom"; // Added Outlet
import Trashed from "./Sidebar/Trashed/Trashed";
import Layout from "./Layout/Layout";
import Questionindex from "./Questionindex/Questionindex";
import Archived from "./Archived/Archived";
import All from "../QuestionBanks/All/All";
import Sidebar from "../QuestionBanks/Sidebar/Sidebar"; // Import Sidebar
import Modal from "../QuestionBanks/NewQBModal/Modal";
import ConfirmationModal from "../QuestionBanks/NewQBModal/ConfirmationModal"; // Import confirmation modal
import Header from "../../header/header";
import TopBar from "../class-batch/classtopbar/classtopbar";

const QuestionBank = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [rows, setRows] = useState([]);
  const [editRow, setEditRow] = useState(null); // To track the row being edited

  const handleAddOrUpdateRow = (data) => {
    if (editRow !== null) {
      // Update existing row
      setRows((prevRows) =>
        prevRows.map((row, index) => (index === editRow ? data : row))
      );
    } else {
      // Add new row
      setRows((prevRows) => [...prevRows, data]);
    }
    setIsModalOpen(false);
    setEditRow(null);
  };

  const handleDeleteRow = (index) => {
    setRows((prevRows) => prevRows.filter((_, i) => i !== index));
    setIsConfirmModalOpen(false);
  };

  return (
    <>
    
      <div className="question-bank-layout">
        <Sidebar openModal={() => setIsModalOpen(true)} />
        <div className="content-area">
        
          <Routes>
            {/* Define the parent route with Layout */}
            <Route path="/" element={<Layout />}>
              {/* Child routes */}
              <Route
                index
                element={
                  <Questionindex
                    rows={rows}
                    onEdit={(index) => {
                      setEditRow(index);
                      setIsModalOpen(true);
                    }}
                    onDelete={(index) => {
                      setEditRow(index);
                      setIsConfirmModalOpen(true);
                    }}
                  />
                }
              />
              <Route path="Trashed" element={<Trashed />} />
              <Route path="Archived" element={<Archived />} />
              <Route path="All" element={<All />} />
            </Route>
          </Routes>
        </div>
      </div>

      {isModalOpen && (
        <Modal
          onClose={() => {
            setIsModalOpen(false);
            setEditRow(null);
          }}
          onSubmit={handleAddOrUpdateRow}
          initialData={editRow !== null ? rows[editRow] : null}
        />
      )}
      {isConfirmModalOpen && (
        <ConfirmationModal
          onClose={() => setIsConfirmModalOpen(false)}
          onConfirm={() => handleDeleteRow(editRow)}
        />
      )}
    </>
  );
};

export default QuestionBank;
