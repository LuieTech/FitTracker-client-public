import React, { useEffect, useState } from "react";
import CreateClient from "./CreateClient";
import { createClient, getClients } from "../../services/client.service";
import { useAccountContext } from "../../context/account.context";
import { Link } from "react-router-dom";

function Clients() {
  const [clients, setClients] = useState(null);
  const { trainer, trainerId } = useAccountContext();

useEffect(() => {
  if (trainerId) {
    obtainClients(trainerId);
  }
}, [trainerId]); // <-- depend on trainerId


  const obtainClients = async (trainerId) => {
    const response = await getClients(trainerId);
    setClients(response)
    console.log("This is clients length from Clients Component", response.length);
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
    <Link to={`/homepage/client-details/${cl.id}`} key={cl.id} className="text-decoration-none">
      <div className="card p-3 ">
        <h5 className="card-title"> {cl.name} </h5>
        <div className="d-flex flex-column gap-2 pt-2">
          <p>
            <i className="fa-solid fa-phone me-2"></i> {cl.phoneNumber}
          </p>
          <p>
            <i className="fa-solid fa-envelope me-2"></i> {cl.email}
          </p>
        </div>
      </div>
    </Link>
  ));

  return (
    <div className="main">
      <div className="clients-container">
        <CreateClient onCreate={handleCreate} />
      </div>

      <div className="row row-cols-1 row-cols-md-3 g-4">
        {clientsList}
      </div>
    </div>
  );
}

export default Clients;
