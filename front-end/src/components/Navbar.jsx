import React from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { Button } from 'primereact/button';
import { AuthContext } from '../context/AuthContext.jsx';

export default function Navbar() {
  const { usuario, logout } = React.useContext(AuthContext);
  const nav = useNavigate();

  return (
    <div className="p-3 surface-100 flex align-items-center justify-content-between" style={{borderBottom:'1px solid #eee'}}>
      <div className="flex align-items-center gap-3">
        <i className="pi pi-bolt" />
        <strong>DAW • Lançamentos</strong>
        <NavLink to="/home" className="ml-3">Início</NavLink>
        <NavLink to="/consulta" className="ml-3">Consultas</NavLink>
      </div>
      <div className="flex align-items-center gap-2">
        <small>{usuario?.nome}</small>
        <Button label="Sair" size="small" onClick={()=>{ logout(); nav('/login'); }} />
      </div>
    </div>
  );
}
