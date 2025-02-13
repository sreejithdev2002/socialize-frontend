import { createContext, useContext, useState, useEffect } from "react";
import { GetUserDetailsApi } from "../Services/userApi";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const email = localStorage.getItem("userEmail");

      if (!email) {
        setUser(null);
        setEmail(email);
        return;
      }

      try {
        const response = await GetUserDetailsApi(email);
        setUser(response.data.data);
        setEmail(email);
      } catch (error) {
        console.error("Error fetching user:", error);
        setUser(null); // Ensure user is set to null on error
        setEmail(null);
      }
    };

    fetchUser();
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userEmail");
    setUser(null);
    setEmail(null);
  };

  return (
    <UserContext.Provider value={{ user, setUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
