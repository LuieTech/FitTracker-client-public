import { createContext, useContext, useEffect, useState } from "react";
import { loginTrainer, refreshTrainerData } from "../services/account.service";
import { getClients } from "../services/client.service";

const AccountContext = createContext();

function AccountProviderWrapper({ children }) {
  const [trainer, setTrainer] = useState({});
  const [trainerId, setTrainerId] = useState(null);
  const [clients, setClients] = useState(null);
  const [clientsCount, setClientsCount] = useState(0)
  

useEffect(() => {
  let isMounted = true;

  const autoLogin = async () => {
    const token = localStorage.getItem("authToken");

    try {
      let trainerData;

      if (!token) {
        trainerData = await loginTrainer({
          email: "j.smith@example.com",
          password: "12345678",
        });
      } else {
        try {
          trainerData = await refreshTrainerData();
        } catch (refreshError) {
          // Si el refresh falla, limpiar storage y hacer login manual
          localStorage.removeItem("authToken");
          localStorage.removeItem("refreshToken");
          trainerData = await loginTrainer({
            email: "j.smith@example.com",
            password: "12345678",
          });
        }
      }

      // Only update state if component is still mounted
      if (isMounted && trainerData) {
        setTrainer(trainerData);
        setTrainerId(trainerData.id);

        const clientList = await getClients(trainerData.id);
        if (isMounted) {
          setClients(clientList);
          setClientsCount(clientList.length);
        }
      }
    } catch (error) {
      // Auto-login failed - handle silently or redirect to login page
    }
  };

  autoLogin();

  return () => {
    isMounted = false;
  };
}, []);

  const refreshClients = async () => {
    getClients(trainer.id).then(res => setClientsCount(res.length))
  }


  const value = {
    trainer,
    setTrainer,
    trainerId,
    setTrainerId,
    setClients,
    clients,
    clientsCount,
    setClientsCount,
    refreshClients
    
  };

  return (
    <AccountContext.Provider value={value}>{children}</AccountContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAccountContext() {
  return useContext(AccountContext);
}

export default AccountProviderWrapper;
