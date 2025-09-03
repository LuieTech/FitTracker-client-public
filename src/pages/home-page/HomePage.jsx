import React from "react";
import "./HomePage.css"
import { Route, Routes } from "react-router-dom";
import Sidebar from "../../components/sidebar/Sidebar";
import Exercises from "../../components/exercises/Exercises";
import TrainerDetails from "../../components/trainer-details/TrainerDetails";
import Clients from "../../components/clients/Clients";

function HomePage() {
  return (
    <div className="d-flex page-container" >
      <div className="sidebar-section">
        <section>
          <header className="d-flex align-items-center justify-content-center gap-2">
            <img src="../images/favicon.ico" alt="Logo-image" />
            <span>
              <h3>FitTracker</h3>
            </span>
          </header>
        </section>
        <section>
          <Sidebar />
        </section>
        <section>
          <div className="d-flex align-items-center justify-content-center gap-2">
            <img src="https://raw.githubusercontent.com/twbs/icons/main/icons/person-fill.svg" alt="avatar" style={{width:"25%"}}/>
            <span> Trainer's name </span>
          </div>
        </section>
      </div>
      <div className="content-section">
        <section className="">
          <Routes >
            <Route path="trainer-details" element={<TrainerDetails />} />
            <Route path="exercises" element={<Exercises />} />
            <Route path="clients" element={<Clients />} />

            <Route path="*" element={<TrainerDetails />} />
          </Routes>
        </section>
      </div>
    </div>
  );
}

export default HomePage;
