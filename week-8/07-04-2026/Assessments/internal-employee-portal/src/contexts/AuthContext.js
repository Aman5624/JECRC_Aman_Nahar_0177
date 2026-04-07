import { createContext, useContext, useMemo, useState } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = ({ name, role }) => {
    const trimmedName = name.trim();
    const trimmedRole = role.trim();

    if (!trimmedName || !trimmedRole) {
      return false;
    }

    setUser({
      name: trimmedName,
      role: trimmedRole,
      sessionStart: new Date().toISOString(),
    });

    return true;
  };

  const logout = () => {
    setUser(null);
  };

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      login,
      logout,
    }),
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }

  return context;
}
