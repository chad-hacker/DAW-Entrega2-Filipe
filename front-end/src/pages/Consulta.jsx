import React from 'react';
import Navbar from '../components/Navbar.jsx';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import api from '../services/api.js';
import { ToastCtx } from '../App.jsx';

export default function Consulta() {
  const toastRef = React.useContext(ToastCtx);
  const [comuns, setComuns] = React.useState(null);
  const [especificos, setEspecificos] = React.useState(null);

  const consultarComuns = async () => {
    try {
      const { data } = await api.get('/usuarios/me');
      setComuns(data);
    } catch (e) {
      const msg = e?.response?.data?.erro || 'Falha ao consultar dados comuns.';
      toastRef.current.show({ severity:'error', summary:'Erro', detail: msg });
    }
  };

  const consultarProponente = async () => {
    try {
      const { data } = await api.get('/professores/me');
      setEspecificos(data);
    } catch (e) {
      const msg = e?.response?.data?.erro || 'Falha ao consultar dados do proponente.';
      toastRef.current.show({ severity:'error', summary:'Erro', detail: msg });
    }
  };

  return (
    <>
      <Navbar />
      <div className="container grid">
        <div className="col-12 md:col-6">
          <Card title="Dados Comuns do Usuário Logado" className="card">
            <Button label="Consultar /usuarios/me" onClick={consultarComuns} className="mb-3" />
            <pre style={{ background:'#f7f7f7', padding:'1rem', borderRadius:8, minHeight:120 }}>
{comuns ? JSON.stringify(comuns, null, 2) : '—'}
            </pre>
          </Card>
        </div>

        <div className="col-12 md:col-6">
          <Card title="Dados Específicos do Proponente" className="card">
            <Button label="Consultar /professores/me" onClick={consultarProponente} className="mb-3" />
            <pre style={{ background:'#f7f7f7', padding:'1rem', borderRadius:8, minHeight:120 }}>
{especificos ? JSON.stringify(especificos, null, 2) : '—'}
            </pre>
          </Card>
        </div>
      </div>
    </>
  );
}
