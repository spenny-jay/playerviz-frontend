import { createContext, useState } from "react";

const playerFormInit = {
  startYear: 2020,
  endYear: 2023,
  statCategory: "YDS",
};

export const PlayerFormContext = createContext(null);

export const PlayerFormProvider = ({ children }) => {
  const [playerForm, setPlayerForm] = useState(playerFormInit);

  const playerFormData = {
    playerForm: playerForm,
    setPlayerForm: setPlayerForm,
  };

  return (
    <PlayerFormContext.Provider value={playerFormData}>
      {children}
    </PlayerFormContext.Provider>
  );
};
