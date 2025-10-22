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
      setNotification(`Failed to delete client: ${err.response?.data?.message || err.message || err}`);
      setShowDeleteConfirm(false);
    }
  };

  console.log("This is the client object: ", client);

  return (
    <div
      className="container bg-white rounded shadow-sm p-4"
      style={{ maxWidth: "850px" }}
    >
      {notification && (
        <div 
          className="alert alert-info alert-dismissible fade show" 
          role="alert"
          style={{
            position: 'fixed',
            top: '20px',
            right: '20px',
            zIndex: 1050,
            minWidth: '300px',
            maxWidth: '500px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
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

      <h4 className="fw-bold mb-4">Client</h4>

      {/* <div className="mb-3">
        <label className="form-label text-muted">User nickname</label>
        <h5 className="text-secondary">John</h5>
      </div> */}

      <div className="row">
        <div className="col-md-6 mb-3">
          <label className="form-label text-muted"> Name</label>
          <h5 className="text-secondary">{client?.name}</h5>
        </div>
        {/* <div className="col-md-6 mb-3">
          <label className="form-label text-muted">Last Name</label>
          <h5 className="text-secondary">{client?.username}</h5>
        </div> */}
      </div>

      <div className="row align-items-center mb-4">
        <div className="col-md-3 text-center">
          <img
            src={client?.avatar || "https://i.pravatar.cc/130"}
            alt="client avatar"
            className="img-thumbnail"
            style={{ width: "100px", height: "100px", objectFit: "cover" }}
          />
        </div>
        <div className="col-md-6">
          <label className="form-label text-muted">Mobile phone</label>
          <h5 className="text-secondary">{client?.phoneNumber}</h5>
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-md-9">
          <label className="form-label text-muted">Email</label>
          <h5 className="text-secondary">{client?.email}</h5>
        </div>
      </div>

      <div className="mb-3">
        <label className="form-label text-muted">Notes</label>
        <p className="text-secondary">
          {client?.comment || "No notes available."}
        </p>
      </div>

      <div className="row mb-3">
  <div className="col d-flex justify-content-between align-items-center">
    {/* Back Button */}
    <div>
      <a href="/home/clients" className="text-decoration-none">
        <i className="bi bi-arrow-left-circle"></i> Back
      </a>
    </div>

    {/* Status Switch and Delete Button */}
    <div className="d-flex align-items-center gap-3">
      <div className="d-flex align-items-center">
        <label className="form-label text-muted me-3 mb-0">Status</label>
        <div className="form-check form-switch mb-0">
          <input
            className="form-check-input"
            type="checkbox"
            id="statusSwitch"
            checked={status}
            onChange={() => setStatus((prev) => !prev)}
          />
          <label className="form-check-label" htmlFor="statusSwitch">
            {status ? "Active" : "Inactive"}
          </label>
        </div>
      </div>

      {/* Delete Client Button */}
      <button 
        className="btn btn-danger btn-sm"
        onClick={() => setShowDeleteConfirm(true)}
      >
        <i className="bi bi-trash me-1"></i> Delete Client
      </button>
    </div>
  </div>
</div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
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
                <p>Are you sure you want to delete <strong>{client?.name}</strong>?</p>
                <p className="text-muted small">This action cannot be undone.</p>
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
      <div className="mt-4 mb-3 d-flex justify-content-center">
        <button
          type="button"
          className="btn btn-outline-primary"
          onClick={() => setShowExercises((prev) => !prev)}
        >
          {showExercises ? (
            <>
              <i className="bi bi-chevron-up me-2"></i>
              Hide Exercises
            </>
          ) : (
            <>
              <i className="bi bi-chevron-down me-2"></i>
              Show Exercises
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
