import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from 'primereact/card';
import { Dropdown } from 'primereact/dropdown';
import { InputNumber } from 'primereact/inputnumber';
import { Button } from 'primereact/button';
import { ToastCtx } from '../App.jsx';
import api from '../services/api.js';

const titulacoes = [
  { label:'Mestrado', value:'mestrado' },
  { label:'Doutorado', value:'doutorado' }
];

export default function CadastrarGestorProduto() {
  const nav = useNavigate();
  const toastRef = React.useContext(ToastCtx);
  const [titulacao, setTitulacao] = React.useState('');
  const [anos, setAnos] = React.useState(null);
  const dadosComuns = React.useMemo(() => {
    const raw = localStorage.getItem('cadastroUsuario');
    return raw ? JSON.parse(raw) : null;
  }, []);

  React.useEffect(()=>{
    if (!dadosComuns) {
      toastRef.current.show({ severity:'warn', summary:'Atenção', detail:'Preencha os dados comuns primeiro.' });
      nav('/cadastrar');
    }
  }, [dadosComuns, nav, toastRef]);

  const concluirCadastro = async () => {
    try {
      if (!titulacao || !Number.isInteger(anos)) {
        toastRef.current.show({ severity:'warn', summary:'Atenção', detail:'Informe titulação e anos de experiência (inteiro).' });
        return;
      }

      // Monta o payload respeitando as CHAVES com acento esperadas pelo back-end
      const usuario_info = {
        cpf: dadosComuns.cpf,
        perfil: 'professor', // proponente
        nome: dadosComuns.nome,
        email: dadosComuns.email,
        senha: dadosComuns.senha,
        ["questão"]: dadosComuns.questao,     // chave com acento!
        resposta: dadosComuns.resposta,
        cor_tema: dadosComuns.cor_tema
      };

      const payload = {
        usuário_info: usuario_info,            // chave com acento!
        ["titulação"]: titulacao,              // chave com acento!
        ["anos_experiência_empresarial"]: anos // chave com acento!
      };

      const { data } = await api.post('/professores', payload);
      if (data?.status === 'ativo') {
        toastRef.current.show({ severity:'success', summary:'Sucesso', detail:'Cadastro concluído! Faça o login.' });
        localStorage.removeItem('cadastroUsuario');
        nav('/login');
      } else {
        toastRef.current.show({ severity:'warn', summary:'Aviso', detail:'Cadastro realizado, mas sem status esperado.' });
      }
    } catch (e) {
      const msg = e?.response?.data?.erro || 'Falha ao cadastrar proponente.';
      toastRef.current.show({ severity:'error', summary:'Erro', detail: msg });
    }
  };

  if (!dadosComuns) return null;

  return (
    <div className="container flex-center" style={{minHeight:'100vh'}}>
      <Card title="Cadastrar Dados do Proponente (Gestor de Produto)" className="card" style={{ width: 640 }}>
        <div className="grid">
          <div className="col-12 md:col-6">
            <label>Titulação</label>
            <Dropdown value={titulacao} onChange={(e)=>setTitulacao(e.value)} options={titulacoes} placeholder="Selecione" className="w-full" />
          </div>
          <div className="col-12 md:col-6">
            <label>Anos de experiência empresarial</label>
            <InputNumber value={anos} onValueChange={(e)=>setAnos(e.value)} showButtons min={0} />
          </div>
        </div>

        <div className="flex justify-content-end mt-3">
          <Button label="Concluir cadastro" onClick={concluirCadastro} />
        </div>
      </Card>
    </div>
  );
}
