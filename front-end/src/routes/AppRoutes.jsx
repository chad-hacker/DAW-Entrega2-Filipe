import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Login from '../pages/Login.jsx';
import CadastrarUsuario from '../pages/CadastrarUsuario.jsx';
import CadastrarGestor from '../pages/CadastrarGestorProduto.jsx';
import PaginaInicial from '../pages/PaginaInicial.jsx';
import Consulta from '../pages/Consulta.jsx';
import ProtectedRoute from './ProtectedRoute.jsx';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/cadastrar" element={<CadastrarUsuario />} />
      <Route path="/cadastrar-gestor" element={<CadastrarGestor />} />
      <Route path="/home" element={<ProtectedRoute><PaginaInicial/></ProtectedRoute>} />
      <Route path="/consulta" element={<ProtectedRoute><Consulta/></ProtectedRoute>} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
