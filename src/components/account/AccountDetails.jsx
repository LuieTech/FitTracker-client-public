import React, { useEffect, useState } from "react";
import { useAccountContext } from "../../context/account.context";
import { getClients } from "../../services/client.service";

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
      className="container bg-white rounded shadow-sm p-4"
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

      

      <div className="mb-3">
        <label className="form-label text-muted">Nickname</label>
        <h5 className="text-secondary">John</h5>
      </div>

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

      <div className="mb-3">
        <label className="form-label text-muted">Notes</label>
        <p className="text-secondary">
          {trainer.notes || "No notes available."}
        </p>
      </div>

      <div className="row mb-3">
        <div className="col-md-6">
          <label className="form-label text-muted">Clients</label>
          <h5 className="text-primary">{clientsCount}</h5>
        </div>
        <div className="col-md-6 d-flex align-items-center">
          <label className="form-label text-muted me-3">Status</label>
          <div className="form-check form-switch d-flex align-items-center gap-2">
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
