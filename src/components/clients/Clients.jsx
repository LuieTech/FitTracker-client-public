import React, { useEffect, useState } from "react";
import CreateClient from "./CreateClient";
import { createClient, getClients } from "../../services/client.service";
import { useAccountContext } from "../../context/account.context";
import { Link } from "react-router-dom";
import { getAvatarUrl } from "../../utils/avatar";

function Clients() {
  const [clients, setClients] = useState(null);
  const { trainer } = useAccountContext();

useEffect(() => {
  if (trainer.id) {
    obtainClients(trainer.id);
  }
}, [trainer.id]); // <-- depend on trainerId


  const obtainClients = async (trainerId) => {
    const response = await getClients(trainerId);
    setClients(response);
  };

  const handleCreate = (data) => {
    createClient(data)
      .then(() => {
        obtainClients(trainer.id)
        getClients(trainer.id)
      })
      .catch((err) =>
        console.error("Error while fetching clients at CL Component: ", err)
      );
  };

  const clientsList = clients?.map((cl) => (
    <Link to={`/home/client-details/${cl.id}`} key={cl.id} className="text-decoration-none">
      <div className="card h-100 shadow-sm border-0 hover-shadow transition" style={{ cursor: 'pointer' }}>
        <div className="card-body p-3">
          <div className="d-flex align-items-center gap-3 mb-3">
            <img 
              src={getAvatarUrl(cl.id, 150)}
              alt={cl.name}
              className="rounded-circle flex-shrink-0 shadow-sm"
              style={{ width: '60px', height: '60px', objectFit: 'cover', border: '3px solid #f8f9fa' }}
            />
            <h5 className="card-title mb-0 fw-bold text-dark" style={{ fontSize: '1.1rem' }}> 
              {cl.name} 
            </h5>
          </div>
          <div className="d-flex flex-column gap-2">
            <p className="mb-0 text-muted d-flex align-items-center" style={{ fontSize: '0.9rem' }}>
              <i className="bi bi-telephone-fill me-2 text-primary"></i> 
              <span className="text-truncate">{cl.phoneNumber}</span>
            </p>
            <p className="mb-0 text-muted d-flex align-items-center" style={{ fontSize: '0.9rem' }}>
              <i className="bi bi-envelope-fill me-2 text-primary"></i> 
              <span className="text-truncate">{cl.email}</span>
            </p>
          </div>
        </div>
      </div>
    </Link>
  ));

  return (
    <div className="main px-2 px-md-3">
      <div className="clients-container mb-4 bg-white rounded shadow-sm">
        <CreateClient onCreate={handleCreate} />
      </div>

      <div className="container-fluid px-0">
        <h5 className="fw-bold mb-3 ps-2">
          <i className="bi bi-people-fill me-2 text-primary"></i>
          Your Clients {clients && `(${clients.length})`}
        </h5>
        {clients && clients.length > 0 ? (
          <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-2 g-md-3">
            {clientsList}
          </div>
        ) : (
          <div className="text-center py-5">
            <i className="bi bi-people fs-1 text-muted"></i>
            <p className="text-muted mt-2">No clients yet. Create your first client above!</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Clients;
