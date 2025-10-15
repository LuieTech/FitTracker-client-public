import React, { useEffect, useState } from 'react'
import { useAccountContext } from '../../context/account.context'

function SelectClient() {


  const [clientsList, setClientsList] = useState(null)
  const { clients } = useAccountContext()

  useEffect(() => {
    clients && setClientsList(clients)
  }, [])

  return (
    <div>SelectClient</div>
  )
}

export default SelectClient