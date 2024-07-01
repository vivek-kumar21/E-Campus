import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { URL } from "../url";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);

  const accessToken = localStorage.getItem("accessToken");

  const getUser = async () => {
    // console.log("Token: ", accessToken);
    try {
      const res = await axios.get(
        `${URL}/api/v1/users/current-user`,
        {
          withCredentials: true,
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );

      // console.log(res.data);

      setUser(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (accessToken) {
      getUser();
    }
  }, [accessToken]);

  return (
    <UserContext.Provider value={{ user, setUser, getUser }}>
      {children}
    </UserContext.Provider>
  );
}
