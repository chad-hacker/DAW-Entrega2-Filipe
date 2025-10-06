import React from 'react';
import Navbar from '../components/Navbar.jsx';
import { Card } from 'primereact/card';

export default function PaginaInicial() {
  return (
    <>
      <Navbar />
      <div className="container">
        <Card title="Bem-vindo!" className="card">
          <p>Use o menu acima para acessar as consultas e demais funcionalidades.</p>
          <p>Dica: faça prints desta página e das próximas telas para o <strong>saída.pdf</strong>.</p>
        </Card>
      </div>
    </>
  );
}
