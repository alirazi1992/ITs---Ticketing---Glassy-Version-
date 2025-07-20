'use client';

import { createContext, useContext, useEffect, useState } from 'react';

type Role = 'client' | 'engineer' | 'admin' | null;

const RoleContext = createContext<{
  role: Role;
  setRole: (role: Role) => void;
}>({
  role: null,
  setRole: () => {},
});

export const RoleProvider = ({ children }: { children: React.ReactNode }) => {
  const [role, setRoleState] = useState<Role>(null);

  useEffect(() => {
    const storedRole = localStorage.getItem('user-role') as Role;
    if (storedRole) setRoleState(storedRole);
  }, []);

  const setRole = (newRole: Role) => {
    setRoleState(newRole);
    localStorage.setItem('user-role', newRole || '');
  };

  return (
    <RoleContext.Provider value={{ role, setRole }}>
      {children}
    </RoleContext.Provider>
  );
};

export const useRole = () => useContext(RoleContext);
