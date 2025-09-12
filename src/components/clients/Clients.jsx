import React, { useEffect, useState } from 'react'
import CreateClient from './CreateClient'
import { createClient, getClients } from '../../services/client.service'

function Clients() {

  const [clients, setClients] = useState(null)
  const trainerId = "0100"

  useEffect(() => {
    obtainClients(trainerId)
  }, [])

  const obtainClients = async (trainerId) => {
    const response = await getClients(trainerId)
    console.log("This is clients List from Clients Component", response);
    
  }

  const handleCreate = (data) => {
    createClient(data)
      .then(() => obtainClients(trainerId))
      .catch( err => console.error("Error while fetching clients at CL Component: ", err))
    
  }

  return (
    <div>
      <CreateClient onCreate={handleCreate}/>
    </div>
  )
}

export default Clients