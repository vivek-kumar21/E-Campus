import axios from "axios";
import { createContext, useState } from "react";
import { URL } from "../url";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);

  const getUser = async () => {
    try {
      const res = await axios.get(`${URL}/api/v1/users/current-user`, {
        withCredentials: true,
      });
      if(res){
        setUser(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <UserContext.Provider value={{ user, setUser, getUser }}>
      {children}
    </UserContext.Provider>
  );
}
