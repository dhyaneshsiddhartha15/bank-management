import React, { createContext, useContext, useState, useEffect } from 'react';

const RoleContext = createContext();
export const RoleProvider = ({ children }) => {
  const [role, setRole] = useState(() => {
    const savedRole = localStorage.getItem('role');
    return savedRole ? JSON.parse(savedRole) : null;
  });

  useEffect(() => {
    if (role) {
      localStorage.setItem('role', JSON.stringify(role));
    } else {
      localStorage.removeItem('role');
    }
  }, [role]);

  return (
    <RoleContext.Provider value={{ role, setRole }}>
      {children}
    </RoleContext.Provider>
  );
};

export const useRole = () => {
  return useContext(RoleContext);
};
