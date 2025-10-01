import React, { useEffect, useState } from "react";
import CreateClient from "./CreateClient";
import { createClient, getClients } from "../../services/client.service";
import { useAccountContext } from "../../context/account.context";
import { Link } from "react-router-dom";

function Clients() {
  const [clients, setClients] = useState(null);
  const { trainer, trainerId } = useAccountContext();

  useEffect(() => {
    obtainClients(trainerId);
  }, []);

  const obtainClients = async (trainerId) => {
    const response = await getClients(trainerId);
    setClients(response)
    console.log("This is clients List from Clients Component", response);
  };

  const handleCreate = (data) => {
    createClient(data)
      .then(() => obtainClients(trainer.id))
      .catch((err) =>
        console.error("Error while fetching clients at CL Component: ", err)
      );
  };

  const clientsList = clients?.map((cl) => (
    <Link to={`/homepage/client-details/${cl.id}`} key={cl.id}>
      <div className="card">
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

      <div className="container">
        {clientsList}
      </div>
    </div>
  );
}

export default Clients;
