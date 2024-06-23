import { createContext, useState, useEffect } from "react";
import { refreshApi } from "../Api";

export const UserContext = createContext(null);

/**
 * Contains global functions and state related to auth.
 */
export function UserProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  // upon accessing the site, validate the user's token stored localstorage
  // (if there is one)
  useEffect(() => {
    const refreshToken = async () => {
      if (localStorage.getItem("refreshToken")) {
        const token = await refreshApi();
        if (token) {
          setIsLoggedIn(true);
          localStorage.setItem("token", token);
        }
      }
    };

    refreshToken();
  }, []);

  // intercept requests after logging in
  //
  const { fetch: originalFetch } = window;
  window.fetch = async (...args) => {
    let [resource, config] = args;

    const token = localStorage.getItem("token");
    const hasTokenExpired = token ? isTokenExpired(token) : false;
    if (isLoggedIn && hasTokenExpired) {
      const res = await originalFetch(
        `http://${process.env.REACT_APP_BACKEND_API}/api/users/refresh`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("refreshToken"),
          },
        }
      );

      const resJson = await res.json();
      const token: string = resJson.token;
      if (!token) {
        localStorage.clear();
        setIsLoggedIn(false);
      } else {
        localStorage.setItem("token", token);
        config.headers["Authorization"] = token;
      }
    }
    const res = await originalFetch(resource, config);
    return res;
  };

  const isTokenExpired = (token) =>
    Date.now() >= JSON.parse(atob(token.split(".")[1])).exp * 1000;

  const authValues = {
    isLoggedIn: isLoggedIn,
    setIsLoggedIn: setIsLoggedIn,
  };

  return (
    <UserContext.Provider value={authValues}>{children}</UserContext.Provider>
  );
}
