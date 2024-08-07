import React, { useState, useEffect, useContext, ReactNode } from 'react';
import getAuth from '@/app/util/Auth';

// Define types for the context value
interface AuthContextType {
  isLogged: boolean;
  // isAdmin: boolean;
  // setIsAdmin: React.Dispatch<React.SetStateAction<boolean>>;
  setIsLogged: React.Dispatch<React.SetStateAction<boolean>>;
  role: any; // Define a specific type for employee if known
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
  // const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [role, setRole] = useState<any>(null); // Define a specific type for employee if known

  const value = { isLogged, role, setRole,  setIsLogged };

  useEffect(() => {
    // Retrieve the logged in user from local storage
    const loggedInUser = getAuth();
    loggedInUser.then((response) => {
      if (response.token) {
        setIsLogged(true);
        // 3 is the employee_role for admin
        // if (response.employee_role === 3) {
        //   setIsAdmin(true);
        // }
        // setEmployee(response);
      }
    });
  }, []);
  
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
