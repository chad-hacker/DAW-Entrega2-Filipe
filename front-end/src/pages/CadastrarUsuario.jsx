import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { ToastCtx } from '../App.jsx';
import ModalConfirmacaoUsuario from '../components/ModalConfirmacaoUsuario.jsx';
import { isEmail, required, same, isCpfLike } from '../utils/validacoes.js';
import api from '../services/api.js';

const cores = [
  { label:'Amarelo', value:'yellow' },
  { label:'Anil', value:'indigo' },
  { label:'Azul', value:'blue' },
  { label:'Azul piscina', value:'cyan' },
  { label:'Cinza escuro', value:'bluegray' },
  { label:'Laranja', value:'orange' },
  { label:'Rosa', value:'pink' },
  { label:'Roxo', value:'purple' },
  { label:'Verde', value:'green' },
  { label:'Verde azulado', value:'teal' },
];

export default function CadastrarUsuario() {
  const [cpf, setCpf] = React.useState('');
  const [nome, setNome] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [senha, setSenha] = React.useState('');
  const [confirma, setConfirma] = React.useState('');
  const [questao, setQuestao] = React.useState('');
  const [resposta, setResposta] = React.useState('');
  const [cor, setCor] = React.useState('');
  const [modal, setModal] = React.useState(false);
  const toastRef = React.useContext(ToastCtx);
  const nav = useNavigate();

  const validar = () => {
    if (!isCpfLike(cpf)) return 'CPF inválido.';
    if (!required(nome)) return 'Nome é obrigatório.';
    if (!isEmail(email)) return 'E-mail inválido.';
    if (!required(senha)) return 'Senha é obrigatória.';
    if (!same(senha, confirma)) return 'Senha e confirmação não conferem.';
    if (!required(questao) || !required(resposta)) return 'Pergunta e resposta são obrigatórias.';
    if (!required(cor)) return 'Escolha uma cor de tema.';
    return null;
  };

  const abrirConfirmacao = async () => {
    const erro = validar();
    if (erro) {
      toastRef.current.show({ severity:'warn', summary:'Atenção', detail: erro });
      return;
    }
    try {
      // verifica se CPF já está cadastrado
      await api.post(`/usuarios/verificar-cpf/${cpf}`);
      setModal(true);
    } catch (e) {
      const msg = e?.response?.data?.erro || 'Falha ao verificar CPF.';
      toastRef.current.show({ severity:'error', summary:'Erro', detail: msg });
    }
  };

  const seguirParaEspecificos = () => {
    // Guarda o bloco comum no storage para a próxima tela
    const comum = { cpf, nome, email, senha, questao, resposta, cor_tema: cor };
    localStorage.setItem('cadastroUsuario', JSON.stringify(comum));
    setModal(false);
    nav('/cadastrar-gestor');
  };

  return (
    <div className="container flex-center" style={{minHeight:'100vh'}}>
      <Card title="Cadastrar Usuário (Dados Comuns)" className="card" style={{ width: 640 }}>
        <div className="grid">
          <div className="col-12 md:col-6">
            <label>CPF</label>
            <InputText value={cpf} onChange={(e)=>setCpf(e.target.value)} placeholder="000.000.000-00" />
          </div>
          <div className="col-12 md:col-6">
            <label>Nome</label>
            <InputText value={nome} onChange={(e)=>setNome(e.target.value)} />
          </div>
          <div className="col-12 md:col-6">
            <label>E-mail</label>
            <InputText value={email} onChange={(e)=>setEmail(e.target.value)} />
          </div>
          <div className="col-12 md:col-6">
            <label>Cor do tema</label>
            <Dropdown value={cor} onChange={(e)=>setCor(e.value)} options={cores} placeholder="Selecione" className="w-full" />
          </div>
          <div className="col-12 md:col-6">
            <label>Senha</label>
            <Password value={senha} onChange={(e)=>setSenha(e.target.value)} feedback={false} toggleMask className="w-full" inputClassName="w-full" />
          </div>
          <div className="col-12 md:col-6">
            <label>Confirmar senha</label>
            <Password value={confirma} onChange={(e)=>setConfirma(e.target.value)} feedback={false} toggleMask className="w-full" inputClassName="w-full" />
          </div>
          <div className="col-12">
            <label>Pergunta de segurança</label>
            <InputText value={questao} onChange={(e)=>setQuestao(e.target.value)} placeholder="Ex.: primeiro cão" />
          </div>
          <div className="col-12">
            <label>Resposta</label>
            <InputText value={resposta} onChange={(e)=>setResposta(e.target.value)} />
          </div>
        </div>

        <div className="flex justify-content-end mt-3">
          <Button label="Confirmar dados" onClick={abrirConfirmacao} />
        </div>
      </Card>

      <ModalConfirmacaoUsuario
        visible={modal}
        onHide={()=>setModal(false)}
        dados={{ cpf, nome, email, cor_tema: cor }}
        onConfirmar={seguirParaEspecificos}
      />
    </div>
  );
}
