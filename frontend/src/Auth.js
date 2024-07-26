import { useContext, useEffect } from "react";
import { UserContext } from "./context/userContext";
import Login from "./components/Login/Login";

function Auth({ children }) {
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (user) {
      return;
    }
  }, [user]);

  if (!user) {
    return <Login />;
  }

  return children;
}

export default Auth;
