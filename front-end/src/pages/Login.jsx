import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import api from '../services/api.js';
import { AuthContext } from '../context/AuthContext.jsx';
import { ToastCtx } from '../App.jsx';
import { isCpfLike } from '../utils/validacoes.js';

export default function Login() {
  const [cpf, setCpf] = React.useState('');
  const [senha, setSenha] = React.useState('');
  const { login } = React.useContext(AuthContext);
  const toastRef = React.useContext(ToastCtx);
  const nav = useNavigate();

  const entrar = async () => {
    try {
      if (!isCpfLike(cpf) || !senha) {
        toastRef.current.show({ severity:'warn', summary:'Atenção', detail:'Informe CPF e senha válidos.' });
        return;
      }
      const { data } = await api.post('/usuarios/login', { nome_login: cpf, senha });
      const t = data?.usuárioLogado?.token;
      if (!t) throw new Error('Token ausente.');
      login(t, data.usuárioLogado);
      toastRef.current.show({ severity:'success', summary:'Sucesso', detail:'Login realizado!' });
      nav('/home');
    } catch (e) {
      const msg = e?.response?.data?.erro || 'Falha no login.';
      toastRef.current.show({ severity:'error', summary:'Erro', detail: msg });
    }
  };

  return (
    <div className="container flex-center" style={{minHeight:'100vh'}}>
      <Card title="Acesso ao Sistema" className="card" style={{ width: 420 }}>
        <div className="p-fluid">
          <label className="mt-2">CPF</label>
          <InputText value={cpf} onChange={(e)=>setCpf(e.target.value)} placeholder="000.000.000-00" />
          <label className="mt-3">Senha</label>
          <Password value={senha} onChange={(e)=>setSenha(e.target.value)} feedback={false} toggleMask />
          <Button label="Entrar" className="mt-4" onClick={entrar} />
          <div className="mt-3 flex justify-content-between">
            <Link to="/cadastrar">Cadastrar usuário</Link>
            <a href="#recuperar">Recuperar acesso</a>
          </div>
        </div>
      </Card>
    </div>
  );
}
