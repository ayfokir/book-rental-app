import React, { useState, useEffect, useContext, ReactNode } from 'react';
import getAuth from '@/app/util/Auth';

// Define types for the context value
interface AuthContextType {
  isLogged: boolean;
  // isAdmin: boolean;
  // setIsAdmin: React.Dispatch<React.SetStateAction<boolean>>;
  setIsLogged: React.Dispatch<React.SetStateAction<boolean>>;
  role: any; // Define a specific type for role if known
  userId: any; // Define a specific type for userId if known
  setRole: React.Dispatch<React.SetStateAction<any>>;
  setUserId: React.Dispatch<React.SetStateAction<any>>;
}

// Create a context object with default values
const AuthContext = React.createContext<AuthContextType | undefined>(undefined);

// Create a custom hook to use the context
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Create a provider component
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isLogged, setIsLogged] = useState<boolean>(false);
  const [userId, setUserId] = useState<any>(null);
  const [role, setRole] = useState<any>(null); // Define a specific type for employee if known
  
  const value = { isLogged, role, userId,  setRole,  setIsLogged, setUserId };
  
  useEffect(() => {
    // Retrieve the logged in user from local storage
    const loggedInUser = getAuth();
    loggedInUser.then((response) => {
      if (response.token) {
        // setIsLogged(true);
        setRole(response.role)
        setUserId(response.user_id)
      }
    });
  }, []);
  
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
