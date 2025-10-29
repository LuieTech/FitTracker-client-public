import React, { useEffect, useState } from "react";
import { useAccountContext } from "../../context/account.context";
import { getClients } from "../../services/client.service";

function SelectClient({ onClientSelect }) {
  const [clientsList, setClientsList] = useState(null);
  const [selectedClientId, setSelectedClientId] = useState(null);
  const [clients, setClients] = useState(null);
  const { trainerId } = useAccountContext();
  const obtainClients = async (trainer) => {
    try {
      if (trainer) {
        const data = await getClients(trainer);
        const response = await data;
        setClientsList(response);
      }
    } catch (error) {
      console.error("Error while getting clientsList at SelectClient", error);
    }
  };

  useEffect(() => {
    
    obtainClients(trainerId)

    if (clients) {
      setClientsList(clients);
    }
  }, [clients]);

  const handleChange = (e) => {
    const selectedId = e.target.value;
    setSelectedClientId(selectedId);
    const selectedClient = clientsList.find(
      (client) => client.id.toString() === selectedId
    );
    selectedClient && onClientSelect(selectedClient);
  };

  return (
    <div>
      <label htmlFor="clientSelect" className="form-label fw-bold">
        Client
      </label>
      <select
        id="clientSelect"
        className="form-select"
        value={selectedClientId || ""}
        onChange={handleChange}
      >
        <option value="" disabled>
          Select a Client
        </option>
        {clientsList?.map((client) => (
          <option key={client.id} value={client.id}>
            {client.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SelectClient;
