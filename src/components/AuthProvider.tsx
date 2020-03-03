import React, { useEffect, useState, createContext, useContext } from 'react';
import { auth } from 'helpers/firebase';
import firebase from 'firebase';

const AuthContext = createContext<firebase.User | null>(null);

export const useUser = () => {
  return useContext(AuthContext);
};

const AuthProvider: React.FC = ({ children }) => {
  const [userState, setUserState] = useState<firebase.User | null>(null);

  useEffect(() => {
    const unregister = auth.onAuthStateChanged(user => {
      setUserState(user);
    });
    return () => unregister();
  }, []);

  return (
    <AuthContext.Provider value={userState}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
