import { useState } from 'react'
import { api } from '../api/api'

export default function CadastroPage() {
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [msg, setMsg] = useState<string | null>(null)

  async function handleCadastro(e: React.FormEvent) {
    e.preventDefault()
    setMsg(null)
    try {
      const { data } = await api.post('/usuarios', { nome, email, senha })
      setMsg('Cadastro realizado com sucesso!')
    } catch (error: any) {
      setMsg(error.response?.data?.erro || 'Erro ao cadastrar usuário')
    }
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Cadastro</h1>
      <form onSubmit={handleCadastro} style={{ display: 'grid', gap: 12 }}>
        <label>
          Nome:
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </label>

        <label>
          E-mail:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>

        <label>
          Senha:
          <input
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />
        </label>

        <button type="submit">Cadastrar</button>
      </form>

      {msg && <p>{msg}</p>}
    </div>
  )
}
