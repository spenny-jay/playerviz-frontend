import { createContext, useState } from "react";

export const UserContext = createContext(null);

export function UserProvider({ children }) {
  const [token, setToken] = useState<string>(localStorage.getItem("token"));
  const [userId, setUserId] = useState<string>();

  const authValues = {
    token: token,
    setToken: setToken,
    userId: userId,
    setUserId: setUserId,
  };

  return (
    <UserContext.Provider value={authValues}>{children}</UserContext.Provider>
  );
}
