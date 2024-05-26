import { createContext, useState } from "react";

export const UserContext = createContext(null);

export function UserProvider({ children }) {
  const [token, setToken] = useState<string>(localStorage.getItem("token"));

  const authValues = { token: token, setToken: setToken };

  return (
    <UserContext.Provider value={authValues}>{children}</UserContext.Provider>
  );
}
