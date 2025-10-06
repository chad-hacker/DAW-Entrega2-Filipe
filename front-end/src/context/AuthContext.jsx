import React from 'react';

export const AuthContext = React.createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = React.useState(() => localStorage.getItem('token'));
  const [usuario, setUsuario] = React.useState(() => {
    const raw = localStorage.getItem('usuario');
    return raw ? JSON.parse(raw) : null;
  });

  const login = (novoToken, dadosUsuario) => {
    localStorage.setItem('token', novoToken);
    localStorage.setItem('usuario', JSON.stringify(dadosUsuario));
    setToken(novoToken);
    setUsuario(dadosUsuario);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    setToken(null);
    setUsuario(null);
  };

  return (
    <AuthContext.Provider value={{ token, usuario, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
