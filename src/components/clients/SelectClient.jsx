import React, { useEffect, useState } from "react";
import { useAccountContext } from "../../context/account.context";

function SelectClient({ onClientSelect }) {
  const [clientsList, setClientsList] = useState(null);
  const [selectedClientId, setSelectedClientId] = useState(null);
  const { clients } = useAccountContext();

  useEffect(() => {
    if (clients) {
      setClientsList(clients);
    }
  }, [clients]);

  const handleChange = (e) => {
    const selectedId = e.target.value
    setSelectedClientId(selectedId)
    const selectedClient = clientsList.find(client => client.id.toString() === selectedId)
    selectedClient && onClientSelect(selectedClient)
  }

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
        {clientsList?.map(client => (
          <option key={client.id} value={client.id}>
            {client.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SelectClient;
