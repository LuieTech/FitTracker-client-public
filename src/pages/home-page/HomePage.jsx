import React, {useState, useEffect} from "react";
import "./HomePage.css"
import { Route, Routes, Link, useLocation } from "react-router-dom";
import Sidebar from "../../components/sidebar/Sidebar";
import Exercises from "../../components/workouts/Workouts";
import AccountDetails from "../../components/account/AccountDetails";
import Clients from "../../components/clients/Clients";
import ClientDetails from "../../components/clients/ClientDetails";

function HomePage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  return (
    <div className="page-container">
      {/* Mobile Top Navbar */}
      <nav className="mobile-navbar">
        <div className="mobile-navbar-content">
          <div className="d-flex align-items-center gap-2">
            <img src="/images/favicon.ico" alt="Logo" style={{width: "32px", height: "32px"}}/>
            <h5 className="mb-0 fw-bold">FitTracker</h5>
          </div>
          <button 
            className="hamburger-btn" 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <i className={`bi ${isMobileMenuOpen ? 'bi-x-lg' : 'bi-list'} fs-4`}></i>
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="mobile-menu-overlay" onClick={() => setIsMobileMenuOpen(false)}>
          <div className="mobile-menu" onClick={(e) => e.stopPropagation()}>
            <div className="mobile-menu-header">
              <div className="d-flex align-items-center gap-2 mb-3">
                <img 
                  src="https://raw.githubusercontent.com/twbs/icons/main/icons/person-fill.svg" 
                  alt="avatar" 
                  style={{width:"40px", height: "40px"}}
                />
                <span className="fw-semibold">John</span>
              </div>
            </div>
            <div className="mobile-menu-links">
              <Link to="/home/trainer-details" className="mobile-menu-link">
                <i className="bi bi-person-circle me-3"></i>
                My Account
              </Link>
              <Link to="/home/clients" className="mobile-menu-link">
                <i className="bi bi-people-fill me-3"></i>
                Clients
              </Link>
              <Link to="/home/exercises" className="mobile-menu-link">
                <i className="bi bi-clipboard-check-fill me-3"></i>
                Workouts
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Desktop Sidebar */}
      <div className="sidebar-section">
        <section>
          <header className="d-flex align-items-center justify-content-center gap-2">
            <img src="/images/favicon.ico" alt="Logo-image" style={{width: "40px"}}/>
            <span>
              <h4>FitTracker</h4>
            </span>
          </header>
        </section>
        <section>
          <Sidebar />
        </section>
        <section>
          <div className="d-flex align-items-center justify-content-center gap-2">
            <img src="https://raw.githubusercontent.com/twbs/icons/main/icons/person-fill.svg" alt="avatar" style={{width:"25%"}}/>
            <span> John </span>
          </div>
        </section>
      </div>

      {/* Main Content */}
      <div className="content-section">
        <section>
          <Routes>
            <Route path="trainer-details" element={<AccountDetails />} />
            <Route path="exercises" element={<Exercises />} />
            <Route path="clients" element={<Clients />} />
            <Route path="client-details/:clientId" element={<ClientDetails />} />
            <Route path="*" element={<AccountDetails />} />
          </Routes>
        </section>
      </div>
    </div>
  );
}

export default HomePage;
