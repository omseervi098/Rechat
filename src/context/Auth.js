import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import { useState } from "react";
import { createContext, useEffect } from "react";
export const AuthContext = createContext();
// Create auth context provider to provide auth state or current user to all components
export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({});
  // On mount check if user is logged in or not
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      //if user is logged in than set current user
      setCurrentUser(user);
    });
    return () => unsub();
  }, []);
  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};
