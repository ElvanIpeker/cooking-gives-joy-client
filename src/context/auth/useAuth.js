import { useContext, useState } from "react";
import { createContext } from "react";
import { clearToken } from "../../service/axios/axiosInstance";

export const authContext = createContext();

export default function useAuth() {
  return useContext(authContext);
}

export function useProvideAuth() {
  const getInitialValue = () => {
    let gluten = localStorage.getItem("gluten");
    gluten = gluten ? JSON.parse(gluten) : null;
    if (gluten) {
      const { username, token, userId } = gluten;
      return token ? { username, userId } : null;
    }
    return null;
  };

  const [user, setUser] = useState(getInitialValue);

  const handleLogout = () => {
    localStorage.clear();
    clearToken();
    setUser(null);
  };

  return {
    handleLogout,
    user,
    setUser,
  };
}
