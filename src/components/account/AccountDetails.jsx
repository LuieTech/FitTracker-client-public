import React, { useEffect, useState } from "react";
import { useAccountContext } from "../../context/account.context";
import { getClients } from "../../services/client.service";
import "./AccountDetails.css";

export default function AccountDetails() {
  const { trainer, clientsCount, setClientsCount } = useAccountContext();
  const [status, setStatus] = useState(true);

  useEffect(() => {
    // Only fetch clients if trainer.id is available
    if (trainer?.id) {
      getClients(trainer.id).then((res) => setClientsCount(res.length));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trainer?.id]);

  return (
    <div
      className="account-details container bg-white rounded shadow-sm p-3"
      style={{ maxWidth: "850px" }}
    >
      <div className="pb-md-2 col-12 text-center text-md-start">
        <img
          src={trainer.avatar || "https://i.pravatar.cc/130?img=3"}
          alt="Trainer avatar"
          className="img-thumbnail "
          style={{ width: "120px", height: "120px", objectFit: "cover" }}
        />
        <h4 className="fw-bold mt-2">Trainer</h4>
      </div>
      {/* Name and Last Name */}
      <div className="row">
        <div className="col-md-6 mb-3">
          <label className="form-label text-muted">First Name</label>
          <h5 className="text-secondary">{trainer.name}</h5>
        </div>
        <div className="col-md-6 mb-3">
          <label className="form-label text-muted">Last Name</label>
          <h5 className="text-secondary">{trainer.username}</h5>
        </div>
      </div>

      <div className="row align-items-center mb-4">
        <div className="col-md-9">
          <label className="form-label text-muted">Email</label>
          <h5 className="text-secondary">{trainer.email}</h5>
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-md-6">
          <label className="form-label text-muted">Age</label>
          <h5 className="text-secondary">32</h5>
        </div>
        <div className="col-md-6">
          <label className="form-label text-muted">Mobile phone</label>
          <h5 className="text-secondary">{trainer.phoneNumber}</h5>
        </div>
      </div>

      <div className="mb-5">
        <label className="form-label text-muted">Notes</label>
        <div className="text-secondary">
          <p className="fw-bold">Welcome to FitTracker!</p>
          <ol>
            <li>
              Go to the <strong>"Clients"</strong> tab to add new clients.
            </li>
            <li>
              View available workouts under the <strong>"Workouts"</strong> tab.
            </li>
            <li>
              Add workouts to your clients by selecting a client and hitting{" "}
              <strong>"Save"</strong>.
            </li>
            <li>Open client's details by clicking on the client's name.</li>
            <li>Have fun exploring the app!</li>
          </ol>
        </div>
      </div>

      <div className=" pb-4 ">
        
      <div className="col-6 d-flex align-items-center">
          <label className="form-label text-muted ">Clients</label>
          <div>
            <h5 className="text-primary ps-4">{clientsCount}</h5>
          </div>
          
        </div>
        <div className="col-6 d-flex align-items-center gap-4">
          <label className="form-label text-muted mb-0">Status</label>
          <div className="form-check form-switch d-flex justify-content-center gap-3 align-items-center">
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
  );
}
