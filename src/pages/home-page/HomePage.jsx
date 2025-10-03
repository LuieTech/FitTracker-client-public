import React, {useState, useEffect} from "react";
import "./HomePage.css"
import { Route, Routes } from "react-router-dom";
import Sidebar from "../../components/sidebar/Sidebar";
import Exercises from "../../components/workouts/Workouts";
import AccountDetails from "../../components/account/AccountDetails";
import Clients from "../../components/clients/Clients";

function HomePage() {

  const [clientsCount, setClientsCount] = useState(0)

  console.log("This is clientsCount from HomePage", clientsCount)


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
            <span> John </span>
          </div>
        </section>
      </div>
      <div className="content-section">
        <section className="">
          <Routes >
            <Route path="trainer-details" element={<AccountDetails clientsCount={clientsCount}/>} />
            <Route path="exercises" element={<Exercises />} />
            <Route path="clients" element={<Clients onClientsChange={setClientsCount}/>} />

            <Route path="*" element={<AccountDetails />} />
          </Routes>
        </section>
      </div>
    </div>
  );
}

export default HomePage;
