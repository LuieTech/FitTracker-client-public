import { createContext, useContext, useEffect, useState } from "react";
import { loginTrainer, refreshTrainerData } from "../services/account.service";
import { getClients } from "../services/client.service";

const AccountContext = createContext();

function AccountProviderWrapper({ children }) {
  const [trainer, setTrainer] = useState({});
  const [trainerId, setTrainerId] = useState(null);
  const [clients, setClients] = useState(null);

  useEffect(() => {
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
          trainerData = await refreshTrainerData();
        }

        setTrainer(trainerData);
        setTrainerId(trainerData.id);

        const clientList = await getClients(trainerData.id);
        setClients(clientList);
      } catch (error) {
        console.log("Auto-login or refresh failed", error);
      }
    };

    autoLogin();
  }, []);

  const value = {
    trainer,
    setTrainer,
    trainerId,
    setTrainerId,
    clients,
    // logout,
  };

  console.log("This is the trainer logged: ", trainer, trainerId);

  return (
    <AccountContext.Provider value={value}>{children}</AccountContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAccountContext() {
  return useContext(AccountContext);
}

export default AccountProviderWrapper;
