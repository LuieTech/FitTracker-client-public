// src/pages/trainer-details/TrainerDetails.jsx

import React, { useState } from "react";

export default function TrainerDetails() {
  const [status, setStatus] = useState(true);

  const trainer = {
    nickname: "John",
    firstName: "John",
    lastName: "Smith",
    email: "j.smith@example.com",
    phone: "(123) 456-7890",
    status: "Active",
    clients: 8,
    exercisesAssigned: 27,
    birthday: "1993-05-29",
    numClients: 54,
    notes: "",
  };

  let age = new Date().getFullYear() - new Date(trainer.birthday).getFullYear();

  return (
    <div
      className="container bg-white rounded shadow-sm p-4"
      style={{ maxWidth: "850px" }}
    >
      <h4 className="fw-bold mb-4">Trainer</h4>

      <div className="mb-3">
        <label className="form-label text-muted">User nickname</label>
        <h5 className="text-secondary">{trainer.nickname}</h5>
      </div>

      <div className="row">
        <div className="col-md-6 mb-3">
          <label className="form-label text-muted">First Name</label>
          <h5 className="text-secondary">{trainer.firstName}</h5>
        </div>
        <div className="col-md-6 mb-3">
          <label className="form-label text-muted">Last Name</label>
          <h5 className="text-secondary">{trainer.lastName}</h5>
        </div>
      </div>

      <div className="row align-items-center mb-4">
        <div className="col-md-3 text-center">
          <img
            src={trainer.avatar || "https://i.pravatar.cc/130"}
            alt="Trainer avatar"
            className="img-thumbnail"
            style={{ width: "100px", height: "100px", objectFit: "cover" }}
          />
        </div>
        <div className="col-md-9">
          <label className="form-label text-muted">Email</label>
          <h5 className="text-secondary">{trainer.email}</h5>
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-md-6">
          <label className="form-label text-muted">Age</label>
          <h5 className="text-secondary">{age}</h5>
        </div>
        <div className="col-md-6">
          <label className="form-label text-muted">Mobile phone</label>
          <h5 className="text-secondary">{trainer.phone}</h5>
        </div>
      </div>

      <div className="mb-3">
        <label className="form-label text-muted">Notes</label>
        <p className="text-secondary">
          {trainer.notes || "No notes available."}
        </p>
      </div>

      <div className="row mb-3">
        <div className="col-md-6">
          <label className="form-label text-muted">Clients</label>
          <h5 className="text-primary">{trainer.clients?.length || 0}</h5>
        </div>
        <div className="col-md-6 d-flex align-items-center">
  <label className="form-label text-muted me-3">Status</label>
  <div className="form-check form-switch">
    <input
      className="form-check-input"
      type="checkbox"
      id="statusSwitch"
      checked={status}
      onChange={() => setStatus(prev => !prev)}
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
