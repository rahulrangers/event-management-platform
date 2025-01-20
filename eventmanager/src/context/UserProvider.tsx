
import { useState, ReactNode, useEffect } from "react";
import { usercontext } from "./Usercontext";
import User from "../types/User";
const BASE_URL= import.meta.env.VITE_REACT_APP_BASE_URL;
type UserProviderProps = {
  children: ReactNode; 
};

export const ContextProvider = ({ children }: UserProviderProps) => {
  const [userinfo, setUserinfo] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
 
  useEffect(() => {
    const fetchUserinfo = async () => {
      const token = localStorage.getItem('token'); 
      if (token) {
        try {
          const response = await fetch(`${BASE_URL}/api/auth/userinfo`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          });
          if (response.ok) {
            const data = await response.json();
            setUserinfo(data); 
          } else {
            setUserinfo(null); 
          }
        } catch (error) {
          console.error('Error fetching user info:', error);
          setUserinfo(null);
        }
      } else {
        setUserinfo(null); 
      }
      setLoading(false);
    };

    fetchUserinfo();
  }, []);
  return (
    <usercontext.Provider value={{ userinfo, setUserinfo, loading }}>
      {children}
    </usercontext.Provider>
  );
};
