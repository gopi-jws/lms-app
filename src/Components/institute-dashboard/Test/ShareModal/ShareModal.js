import React from "react";
import { WithContext as ReactTags } from "react-tag-input";
import { FaPaperPlane, FaShare, FaTimes } from "react-icons/fa";
import "./ShareModal.css";

const ShareModal = ({ isOpen, onClose, emails, setEmails }) => {
  if (!isOpen) return null;

  const handleEmailChange = (newTags) => {
    setEmails(newTags);
  };

  return (
    <div className={`share-modal-overlay ${isOpen ? "active" : ""}`}>
      <div className="share-modal">
        <button className="close-button" onClick={onClose}>
          <FaTimes />
          <span className="sr-only">Close</span>
        </button>
        <h2 className="modal-title">
          <FaShare className="modal-icon" />
          Share Test
        </h2>
        <div className="modal-content">
          <label htmlFor="email-input" className="modal-label">
            Enter Emails:
          </label>
          <ReactTags
            tags={emails}
            handleDelete={(index) => {
              const newTags = emails
                .slice(0, index)
                .concat(emails.slice(index + 1));
              setEmails(newTags);
            }}
            handleAddition={(tag) => setEmails([...emails, tag])}
            placeholder="Type and press enter to add emails..."
            classNames={{
              tags: "react-tags-wrapper",
              tagInput: "react-tags-input",
              tag: "react-tags-tag",
              remove: "react-tags-remove",
            }}
          />
        </div>
        <div className="share-modal-actions">
          <button className="share-action-button verify-button"> Can Edit
         
           
          </button>
          <button className="share-action-button invite-button">
            
            Invite
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShareModal;
