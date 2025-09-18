import { createContext, useContext, useEffect, useState } from "react";
import { loginTrainer, refreshTrainerData } from "../services/account.service";

const AccountContext = createContext();

function AccountProviderWrapper({ children }) {
  const [trainer, setTrainer] = useState({});
  const [trainerId, setTrainerId] = useState(null);

  const logout = () => {
    setTrainer({});
    setTrainerId(null);
    localStorage.removeItem("authToken");
    localStorage.removeItem("refreshToken");
  };

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
      } catch (error) {
        console.log("Auto-login or refresh failed", error);
        logout();
      }
    };

    autoLogin();
  }, []);

  const value = {
    trainer,
    setTrainer,
    trainerId,
    setTrainerId,
    logout,
  };

  console.log("This is the trainer logged: ", trainer, trainerId);
  

  return (
    <AccountContext.Provider value={value}>
      {children}
    </AccountContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAccountContext() {
  return useContext(AccountContext);
}

export default AccountProviderWrapper;
