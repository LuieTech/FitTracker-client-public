import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getClientById, deleteClientById, updateComment, updateEmail } from "../../services/client.service";
import ClientExercises from "./ClientExercises";
import { getAvatarUrl } from "../../utils/avatar";

function ClientDetails() {
  const { clientId } = useParams();
  const navigate = useNavigate();
  const [client, setClient] = useState(null);
  const [status, setStatus] = useState("active");
  const [showExercises, setShowExercises] = useState(false);
  const [notification, setNotification] = useState("");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [editModeComment, setEditModeComment] = useState(false);
  const [editModeEmail, setEditModeEmail] = useState(false);
  const [editedComment, setEditedComment] = useState("");
  const [editedEmail, setEditedEmail] = useState("");

  const handleSaveComment = async () => {
    try {
      await updateComment(clientId, { comment: editedComment });
      // Refresh client data from server to show updated values
      await getClient();
      setEditModeComment(false);
      setNotification("Comment updated successfully!");
    } catch (err) {
      setNotification(
        `Failed to update comment: ${
          err.response?.data?.message || err.message || err
        }`
      );
    }
  };

  const handleCancelComment = () => {
    setEditedComment(client?.comment || "");
    setEditModeComment(false);
  };

  const handleSaveEmail = async () => {
    try {
      await updateEmail(clientId, { email: editedEmail });
      // Refresh client data from server to show updated values
      await getClient();
      setEditModeEmail(false);
      setNotification("Email updated successfully!");
    } catch (err) {
      setNotification(
        `Failed to update email: ${
          err.response?.data?.message || err.message || err
        }`
      );
    }
  };

  const handleCancelEmail = () => {
    setEditedEmail(client?.email || "");
    setEditModeEmail(false);
  };
  

  const getClient = async () => {
    try {
      const client = await getClientById(clientId);
      const response = await client;
      response && setClient(response);
    } catch {
      setNotification("Error loading client details");
    }
  };

  useEffect(() => {
    getClient();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clientId]);

  useEffect(() => {
    if (client) {
      setEditedComment(client.comment || "");
      setEditedEmail(client.email || "");
    }
  }, [client]);

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const handleDeleteClient = async () => {
    try {
      await deleteClientById(clientId);
      setNotification("Client deleted successfully!");
      setTimeout(() => {
        navigate("/home/clients");
      }, 1500);
    } catch (err) {
      setNotification(
        `Failed to delete client: ${
          err.response?.data?.message || err.message || err
        }`
      );
      setShowDeleteConfirm(false);
    }
  };

  return (
    <div
      className="container bg-white rounded shadow-sm p-3 p-md-4 mx-auto"
      style={{ maxWidth: "850px" }}
    >
      {notification && (
        <div
          className="alert alert-info alert-dismissible fade show"
          role="alert"
          style={{
            position: "fixed",
            top: "70px",
            right: "10px",
            left: "10px",
            zIndex: 1050,
            maxWidth: "500px",
            margin: "0 auto",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          }}
        >
          {notification}
          <button
            type="button"
            className="btn-close"
            onClick={() => setNotification("")}
            aria-label="Close"
          ></button>
        </div>
      )}
      <div className="d-flex justify-content-between align-items-center mb-3 mb-md-4 gap-2">
        <h4 className="fw-bold mb-0 fs-5 fs-md-4">Client Details</h4>
        {/* Delete Client Button */}
        <button
          className="btn btn-danger btn-sm d-flex align-items-center gap-1"
          onClick={() => setShowDeleteConfirm(true)}
        >
          <i className="bi bi-trash"></i> 
          <span className="d-none d-sm-inline">Delete</span>
        </button>
      </div>

      {/* Avatar and Basic Info Section */}
      <div className="d-flex flex-column flex-md-row align-items-center align-items-md-start gap-3 mb-4 pb-3 border-bottom">
        <div className="flex-shrink-0">
          <img
            src={getAvatarUrl(clientId, 150)}
            alt="client avatar"
            className="rounded-circle shadow-sm"
            style={{ width: "100px", height: "100px", objectFit: "cover" }}
          />
        </div>
        <div className="flex-grow-1 text-center text-md-start w-100">
          <div className="mb-3">
            <label className="form-label text-muted small d-block mb-1">Name</label>
            <h5 className="text-secondary fs-5 mb-0">{client?.name}</h5>
          </div>
          <div className="row g-2">
            <div className="col-12">
              <label className="form-label text-muted small d-block mb-1">
                <i className="bi bi-telephone me-1"></i>Mobile phone
              </label>
              <p className="text-secondary mb-0">{client?.phoneNumber}</p>
            </div>
            <div className="col-12">
              <label className="form-label text-muted small d-block mb-1">
                <i className="bi bi-envelope me-1"></i>Email
              </label>
              {editModeEmail ? (
                <div>
                  <input
                    type="email"
                    className="form-control form-control-sm mb-2"
                    value={editedEmail}
                    onChange={(e) => setEditedEmail(e.target.value)}
                    placeholder="Enter email address..."
                  />
                  <div className="d-flex gap-2">
                    <button
                      type="button"
                      className="btn btn-primary btn-md-sm btn-sm"
                      onClick={handleSaveEmail}
                      style={{ 
                        padding: '2px 8px',
                        fontSize: '0.875rem'
                      }}
                    >
                      <i className="bi bi-check-lg me-1"></i>Save
                    </button>
                    <button
                      type="button"
                      className="btn btn-outline-secondary btn-md-sm btn-sm"
                      onClick={handleCancelEmail}
                      style={{ 
                        padding: '2px 8px',
                        fontSize: '0.875rem'
                      }}
                    >
                      <i className="bi bi-x-lg me-1"></i>Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <p 
                  className="text-secondary mb-0 text-break"
                  onClick={() => setEditModeEmail(true)}
                  style={{ 
                    cursor: 'pointer',
                    padding: '4px 8px',
                    borderRadius: '4px',
                    transition: 'background-color 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#f8f9fa';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                >
                  {client?.email || "Click to add email..."}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Comment/Notes Section */}
      <div className="mb-3 pb-3 border-bottom">
        <label className="form-label text-muted small d-block mb-2">
          <i className="bi bi-chat-left-text me-1"></i>Notes / Comments
        </label>
        {editModeComment ? (
          <div>
            <textarea
              className="form-control mb-2"
              value={editedComment}
              onChange={(e) => setEditedComment(e.target.value)}
              placeholder="Add notes or comments about this client..."
              rows="3"
              maxLength="200"
              style={{ 
                resize: 'vertical',
                fontSize: '0.9rem',
                minHeight: '60px',
                maxHeight: '150px'
              }}
            />
            <div className="d-flex gap-2">
              <button
                type="button"
                className="btn btn-primary btn-sm"
                onClick={handleSaveComment}
                style={{ 
                  padding: '4px 12px',
                  fontSize: '0.875rem'
                }}
              >
                <i className="bi bi-check-lg me-1"></i>Save
              </button>
              <button
                type="button"
                className="btn btn-outline-secondary btn-sm"
                onClick={handleCancelComment}
                style={{ 
                  padding: '4px 12px',
                  fontSize: '0.875rem'
                }}
              >
                <i className="bi bi-x-lg me-1"></i>Cancel
              </button>
            </div>
          </div>
        ) : (
          <div
            className="p-2 bg-light rounded cursor-pointer"
            onClick={() => setEditModeComment(true)}
            style={{ 
              cursor: 'pointer',
              minHeight: client?.comment ? 'auto' : '60px',
              border: '1px dashed #dee2e6',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#0d6efd';
              e.currentTarget.style.backgroundColor = '#f8f9fa';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = '#dee2e6';
              e.currentTarget.style.backgroundColor = '#f8f9fa';
            }}
          >
            {client?.comment ? (
              <p className="mb-0 text-secondary" style={{ 
                whiteSpace: 'pre-wrap',
                fontSize: '0.9rem',
                wordBreak: 'break-word'
              }}>
                {client.comment}
              </p>
            ) : (
              <p className="mb-0 text-muted fst-italic" style={{ fontSize: '0.9rem' }}>
                Click to add notes...
              </p>
            )}
          </div>
        )}
      </div>

      {/* Actions Bar */}
      <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 py-3 border-top">
        {/* Back Button */}
        <a 
          href="/home/clients" 
          className="btn btn-outline-secondary btn-sm d-flex align-items-center gap-1"
        >
          <i className="bi bi-arrow-left-circle "></i>
          <span className="d-none d-sm-inline">Back</span>
        </a>

        {/* Status Switch */}
        <div className="d-flex align-items-center gap-2">
          <span className="text-muted small">Status:</span>
          <div className="form-check form-switch mb-0">
            <input
              className="form-check-input"
              type="checkbox"
              id="statusSwitch"
              checked={status}
              onChange={() => setStatus((prev) => !prev)}
              style={{ cursor: 'pointer' }}
            />
            <label 
              className="form-check-label small fw-bold" 
              htmlFor="statusSwitch"
              style={{ cursor: 'pointer' }}
            >
              {status ? "Active" : "Inactive"}
            </label>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div
          className="modal show d-flex justify-content-center align-items-center"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Delete</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowDeleteConfirm(false)}
                ></button>
              </div>
              <div className="modal-body">
                <p>
                  Are you sure you want to delete{" "}
                  <strong>{client?.name}</strong>?
                </p>
                <p className="text-muted small">
                  This action cannot be undone.
                </p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowDeleteConfirm(false)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={handleDeleteClient}
                >
                  <i className="bi bi-trash me-1"></i> Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Show Exercises Button */}
      <div className="mt-4 mb-3">
        <button
          type="button"
          className="btn btn-primary w-100 d-flex align-items-center justify-content-center gap-2"
          onClick={() => setShowExercises((prev) => !prev)}
          style={{ padding: '12px' }}
        >
          {showExercises ? (
            <>
              <i className="bi bi-chevron-up"></i>
              <span>Hide Exercises</span>
            </>
          ) : (
            <>
              <i className="bi bi-chevron-down"></i>
              <span>Show Exercises</span>
            </>
          )}
        </button>
      </div>

      {/* Client Exercises Component */}
      {showExercises && clientId && <ClientExercises clientId={clientId} />}
    </div>
  );
}

export default ClientDetails;
