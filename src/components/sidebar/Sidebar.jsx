import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import './Sidebar.css'

function Sidebar() {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname.includes(path);
  };

  return (
    <div className='sidebar-links'>
      <Link 
        to="/home/trainer-details" 
        className={`sidebar-link ${isActive('trainer-details') ? 'active' : ''}`}
      >
        <i className="bi bi-person-circle me-2"></i>
        <span>My Account</span>
      </Link>
      <Link 
        to="/home/clients" 
        className={`sidebar-link ${isActive('clients') || isActive('client-details') ? 'active' : ''}`}
      >
        <i className="bi bi-people-fill me-2"></i>
        <span>Clients</span>
      </Link>
      <Link 
        to="/home/exercises" 
        className={`sidebar-link ${isActive('exercises') ? 'active' : ''}`}
      >
        <i className="bi bi-clipboard-check-fill me-2"></i>
        <span>Workouts</span>
      </Link>
    </div>
  )
}

export default Sidebar