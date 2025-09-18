import React, { useState } from "react";
import { useAccountContext } from "../../context/account.context";

function CreateClient({ onCreate }) {
  const { trainerId, trainer } = useAccountContext();

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
    setFormData(initialFormData);
  };

  console.log("this is trainerId from Form: ", trainerId);
  

  return (
    <form
      className="container py-3"
      onSubmit={handleSubmit}
      style={{ maxWidth: "800px" }}
    >
      <div className="row g-3">
        <div className="col-md-6">
          <input
            className="form-control"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Name"
            required
          />
        </div>
        <div className="col-md-6">
          <input
            className="form-control"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            placeholder="Address"
            required
          />
        </div>

        <div className="col-md-6">
          <input
            className="form-control"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleInputChange}
            placeholder="(e.g., 123-456-7890)"
            type="text"
            required
          />
        </div>

        <div className="col-md-6">
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
          <textarea
            className="form-control"
            name="comment"
            value={formData.comment}
            onChange={handleInputChange}
            placeholder="Comment..."
            rows="3"
          />
        </div>

        <div className="col-12 text-end">
          <button className="btn btn-success" type="submit">
            Create Client
          </button>
        </div>
      </div>
    </form>
  );
}

export default CreateClient;
