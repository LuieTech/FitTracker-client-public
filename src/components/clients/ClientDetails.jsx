import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getClientById } from "../../services/client.service";
import ClientExercises from "./ClientExercises";

function ClientDetails() {
  const { clientId } = useParams();
  const [client, setClient] = useState(null);
  const [status, setStatus] = useState("active");
  const [showExercises, setShowExercises] = useState(false);

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

  console.log("This is the client object: ", client);

  return (
    <div
      className="container bg-white rounded shadow-sm p-4"
      style={{ maxWidth: "850px" }}
    >
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

    {/* Status Switch */}
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
  </div>
</div>

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
