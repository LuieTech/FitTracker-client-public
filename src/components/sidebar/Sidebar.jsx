import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Sidebar() {


  return (
    <div className='d-flex flex-column justify-content-center gap-5 pb-5'>
      <Link to="/home/trainer-details">My Account</Link>
      <Link to="/home/clients">Clients</Link>
      <Link to="/home/exercises">Workouts</Link>

    </div>
  )
}

export default Sidebar