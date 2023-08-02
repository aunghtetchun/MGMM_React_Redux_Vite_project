// src/context/AuthContext.js
import React, { createContext, useState,useEffect } from "react";
import { login, register, fetchUserData } from "../services/api";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [games, setGames] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [errors, setErrors] = useState({});
  useEffect(() => {
    const oldToken = localStorage.getItem("authToken");
    if (oldToken) {
      fetchUserData(oldToken)
        .then((userData) => {
          let name = userData.name;
          let games=userData.games;
          const cleanPhoneNumber = userData.email.replace(/\D/g, '');
          // Format the phone number with spaces
          const formattedPhoneNumber = cleanPhoneNumber.replace(/(\d{2})(\d{3})(\d{3})(\d{3})/, '$1 $2 $3 $4');
          let phone=formattedPhoneNumber;
          let id=userData.id;
          setUser({id, name, oldToken,phone });
          setGames(games);
          setIsLoggedIn(true);
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
          setIsLoggedIn(false);
        });
    }
  }, []);

  const handleLogin = async (email, password) => {
    const userData = await login(email, password);
    if (userData.response && userData.response.data.error){
      setErrors(userData.response.data.error);
   }else{
      let id = userData.id;
      let name = userData.name;
      let phone=userData.email;
      let oldToken = userData.token;
      setUser({id, name, oldToken,phone });
      setIsLoggedIn(true);
      localStorage.setItem("authToken", oldToken);
    }
  };

  const handleRegister = async (userData) => {
      const response=await register(userData);
      if (response.response && response.response.data.error){
         setErrors(response.response.data.error);
      }else{
        let id = response.id;
        let name = response.name;
        let phone=response.email;
        let oldToken = response.token; // Replace with the actual new token received after registration.
        setUser({id, name, oldToken,phone });
        setIsLoggedIn(true);
        localStorage.setItem("authToken", oldToken);   
      }
    
  };
  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("authToken");
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ user,games,setGames, handleLogin, handleRegister, handleLogout, isLoggedIn, errors ,setErrors}}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
