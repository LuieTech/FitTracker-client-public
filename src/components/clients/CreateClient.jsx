import React, { useState } from "react";
import { useAccountContext } from "../../context/account.context";
import { getClients } from "../../services/client.service";

function CreateClient({ onCreate }) {
  const { trainerId, setClients } = useAccountContext();

  const initialFormData = {
    trainer: "",
    name: "",
    address: "",
    phoneNumber: "",
    email: "",
    comment: "",
  };

  const [formData, setFormData] = useState(initialFormData);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      trainer: { id: trainerId },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreate(formData);
    getClients(trainerId).then(res => setClients(res))
    setFormData(initialFormData);
  };

  // console.log("this is trainerId from Form: ", trainerId);
  

  return (
    <form
      className="container py-3 px-2 px-md-3"
      onSubmit={handleSubmit}
      style={{ maxWidth: "800px" }}
    >
      <h5 className="fw-bold mb-3">
        <i className="bi bi-person-plus-fill me-2 text-success"></i>
        Add New Client
      </h5>
      <div className="row g-2 g-md-3">
        <div className="col-12 col-md-6">
          <label className="form-label small text-muted mb-1">Name *</label>
          <input
            className="form-control"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Enter client name"
            required
          />
        </div>
        <div className="col-12 col-md-6">
          <label className="form-label small text-muted mb-1">Address *</label>
          <input
            className="form-control"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            placeholder="Enter address"
            required
          />
        </div>

        <div className="col-12 col-md-6">
          <label className="form-label small text-muted mb-1">Phone Number *</label>
          <input
            className="form-control"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleInputChange}
            placeholder="123-456-7890"
            type="tel"
            required
          />
        </div>

        <div className="col-12 col-md-6">
          <label className="form-label small text-muted mb-1">Email *</label>
          <input
            className="form-control"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="name@example.com"
            type="email"
            required
          />
        </div>

        <div className="col-12">
          <label className="form-label small text-muted mb-1">Notes (Optional)</label>
          <textarea
            className="form-control"
            name="comment"
            value={formData.comment}
            onChange={handleInputChange}
            placeholder="Add any additional notes..."
            rows="3"
          />
        </div>

        <div className="col-12 d-flex justify-content-end gap-2 mt-2">
          <button 
            className="btn btn-success d-flex align-items-center gap-2" 
            type="submit"
          >
            <i className="bi bi-check-circle"></i>
            <span>Create Client</span>
          </button>
        </div>
      </div>
    </form>
  );
}

export default CreateClient;
