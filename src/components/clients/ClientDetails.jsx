import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getClientById, deleteClientById } from "../../services/client.service";
import ClientExercises from "./ClientExercises";

function ClientDetails() {
  const { clientId } = useParams();
  const navigate = useNavigate();
  const [client, setClient] = useState(null);
  const [status, setStatus] = useState("active");
  const [showExercises, setShowExercises] = useState(false);
  const [notification, setNotification] = useState("");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const getClient = async () => {
    try {
      const client = await getClientById(clientId);
      const response = await client;
      response && setClient(response);
      // console.log("This is the client object: ", response);
    } catch (error) {
      console.error("Error fectching client from CLientDetails: ", error);
    }
  };

  useEffect(() => {
    getClient();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clientId]);

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
      // Navigate back to clients list after a short delay
      setTimeout(() => {
        navigate("/home/clients");
      }, 1500);
    } catch (err) {
      console.error("Error deleting client:", err);
      setNotification(
        `Failed to delete client: ${
          err.response?.data?.message || err.message || err
        }`
      );
      setShowDeleteConfirm(false);
    }
  };

  console.log("This is the client object: ", client);

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
            src={`https://i.pravatar.cc/150?img=${clientId}`}
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
              <p className="text-secondary mb-0 text-break">{client?.email}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-3">
        <label className="form-label text-muted small d-block mb-2">
          <i className="bi bi-chat-left-text me-1"></i>Notes
        </label>
        <p className="text-secondary small mb-0 p-2 bg-light rounded">
          {client?.comment || "No notes available."}
        </p>
      </div>

      {/* Actions Bar */}
      <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 py-3 border-top">
        {/* Back Button */}
        <a 
          href="/home/clients" 
          className="btn btn-outline-secondary btn-sm d-flex align-items-center gap-1"
        >
          <i className="bi bi-arrow-left-circle"></i>
          <span>Back to Clients</span>
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
          className="modal show d-block"
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
