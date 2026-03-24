import { useEffect, useState } from "react";
import type { Pessoa } from "../../types";
import { PessoaService } from "../../services/pessoaServices";
import Button from "../../components/Button/button";

const estilos = `
  .cadastro-container { font-family: sans-serif; padding: 1.5rem; background: #f5f6f8; min-height: 100vh; }
  .cadastro-header { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 1.25rem; }
  .cadastro-titulo { font-size: 1.25rem; font-weight: 500; color: #1a1a2e; margin: 0 0 0.2rem; }
  .cadastro-subtitulo { font-size: 0.8rem; color: #6b7280; margin: 0; }
  .btn-novo { background: #3b4fd5; color: #fff; border: none; padding: 0.45rem 1rem; border-radius: 6px; font-size: 0.8rem; cursor: pointer; }
  .tabela-wrapper { background: #fff; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden; }
  .tabela { width: 100%; border-collapse: collapse; font-size: 0.875rem; }
  .tabela thead th { padding: 0.7rem 1rem; text-align: left; font-size: 0.75rem; font-weight: 500; color: #6b7280; border-bottom: 1px solid #e5e7eb; }
  .tabela tbody td { padding: 0.75rem 1rem; color: #111827; border-bottom: 1px solid #f3f4f6; }
  .tabela tbody tr:last-child td { border-bottom: none; }
  .acoes { display: flex; gap: 0.4rem; justify-content: flex-end; }
  .btn-acao { font-size: 0.75rem; padding: 0.25rem 0.65rem; border: 1px solid #d1d5db; border-radius: 5px; background: none; cursor: pointer; color: #374151; }
  .btn-excluir { color: #dc2626; border-color: #fca5a5; }
  .modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.35); display: flex; align-items: center; justify-content: center; z-index: 100; }
  .modal { background: #fff; border-radius: 8px; padding: 1.5rem; width: 380px; max-width: 95vw; border: 1px solid #e5e7eb; }
  .modal-titulo { font-size: 1rem; font-weight: 500; color: #1a1a2e; margin: 0 0 1.25rem; }
  .campo-grupo { margin-bottom: 0.9rem; }
  .campo-label { display: block; font-size: 0.78rem; color: #374151; margin-bottom: 0.25rem; }
  .campo-input { width: 100%; padding: 0.45rem 0.65rem; border: 1px solid #d1d5db; border-radius: 5px; font-size: 0.875rem; box-sizing: border-box; outline: none; }
  .campo-input:focus { border-color: #3b4fd5; }
  .modal-acoes { display: flex; justify-content: flex-end; gap: 0.5rem; margin-top: 1.25rem; }
  .btn-cancelar { background: none; border: 1px solid #d1d5db; color: #374151; padding: 0.45rem 0.9rem; border-radius: 5px; font-size: 0.8rem; cursor: pointer; }
  .btn-salvar { background: #3b4fd5; color: #fff; border: none; padding: 0.45rem 0.9rem; border-radius: 5px; font-size: 0.8rem; cursor: pointer; }
  .msg-vazio { text-align: center; padding: 2rem; color: #9ca3af; font-size: 0.875rem; }
  .msg-erro { color: #dc2626; font-size: 0.75rem; margin-top: 0.25rem; }
`;

const estadoInicial = { nome: "", idade: "" };

// ─── Pessoa ───────────────────────────────────────────────────────────────────
// Aqui é a tela de Cadastro de Pessoas, onde fica sua estilização, html e suas functions

export function Pessoa() {
  const [pessoas, setPessoas] = useState<Pessoa[]>([]);
  const [modalAberto, setModalAberto] = useState(false);
  const [formulario, setFormulario] = useState<{ nome: string; idade: string }>(estadoInicial);
  const [editando, setEditando] = useState<Pessoa | null>(null);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState("");

  // Busca todas as pessoas da API
  async function carregar() {
    try {
      const dados = await PessoaService.consultar();
      setPessoas(dados);
    } catch {
      setErro("Erro ao carregar pessoas.");
    }
  }

  useEffect(() => { carregar(); }, []);

  // Abre o modal limpo para cadastrar uma nova pessoa
  function abrirNovo() {
    setEditando(null);
    setFormulario(estadoInicial);
    setErro("");
    setModalAberto(true);
  }

  // Abre o modal preenchido com os dados da pessoa para edição
  function abrirEdicao(pessoa: Pessoa) {
    setEditando(pessoa);
    setFormulario({ nome: pessoa.nome, idade: String(pessoa.idade) });
    setErro("");
    setModalAberto(true);
  }

  // Fecha o modal
  function fecharModal() {
    setModalAberto(false);
    setErro("");
  }

  // Salva o formulário: cadastra nova ou atualiza existente
  async function salvar() {
    if (!formulario.nome.trim() || !formulario.idade) return;
    setCarregando(true);
    setErro("");
    try {
      if (editando) {
        const atualizada = await PessoaService.alterar({ ...editando, nome: formulario.nome.trim(), idade: Number(formulario.idade) });
        setPessoas(p => p.map(x => x.id === atualizada.id ? atualizada : x));
      } else {
        const nova = await PessoaService.cadastrar({ nome: formulario.nome.trim(), idade: Number(formulario.idade) });
        setPessoas(p => [...p, nova]);
      }
      fecharModal();
    } catch {
      setErro("Erro ao salvar. Tente novamente.");
    } finally {
      setCarregando(false);
    }
  }

  // Pede confirmação e remove a pessoa da API e da lista local
  async function remover(id: number) {
    if (!confirm("Deseja remover esta pessoa? Todas as transações vinculadas serão excluídas.")) return;
    try {
      await PessoaService.remover(id);
      setPessoas(p => p.filter(x => x.id !== id));
    } catch {
      alert("Erro ao remover pessoa.");
    }
  }

  return (
    <>
      <style>{estilos}</style>
      <div className="cadastro-container">
        <div className="cadastro-header">
          <div>
            <h1 className="cadastro-titulo">Cadastro de Pessoas</h1>
            <p className="cadastro-subtitulo">Cadastro base de indivíduos no sistema, permitindo a vinculação de responsáveis por transações.</p>
          </div>
          <Button
           onClick={abrirNovo}
           title="Nova pessoa">
            + Nova Pessoa
          </Button>
        </div>

        <div className="tabela-wrapper">
          <table className="tabela">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Idade</th>
                <th style={{ textAlign: "right" }}>Ações</th>
              </tr>
            </thead>
            <tbody>
              {pessoas.length === 0 ? (
                <tr><td colSpan={3} className="msg-vazio">Nenhuma pessoa cadastrada.</td></tr>
              ) : pessoas.map(p => (
                <tr key={p.id}>
                  <td>{p.nome}</td>
                  <td>{p.idade} anos</td>
                  <td>
                    <div className="acoes">
                      <button className="btn-acao btn-editar" onClick={() => abrirEdicao(p)} title="Editar">
                        <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                      </button>
                      <button className="btn-acao btn-excluir" onClick={() => remover(p.id)} title="Remover">
                        <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {modalAberto && (
          <div className="modal-overlay" onClick={fecharModal}>
            <div className="modal" onClick={e => e.stopPropagation()}>
              <h2 className="modal-titulo">{editando ? "Editar Pessoa" : "Nova Pessoa"}</h2>
              <div className="campo-grupo">
                <label className="campo-label">Nome *</label>
                <input
                  className="campo-input"
                  maxLength={200}
                  placeholder="Nome completo"
                  value={formulario.nome}
                  onChange={e => setFormulario(f => ({ ...f, nome: e.target.value }))}
                />
              </div>
              <div className="campo-grupo">
                <label className="campo-label">Idade *</label>
                <input
                  className="campo-input"
                  type="number"
                  min={0}
                  placeholder="Idade"
                  value={formulario.idade}
                  onChange={e => setFormulario(f => ({ ...f, idade: e.target.value }))}
                />
              </div>
              {erro && <p className="msg-erro">{erro}</p>}
              <div className="modal-acoes">
                <Button 
                  variant="secondary" 
                  onClick={fecharModal} 
                  title="Cancelar">
                  Cancelar
                </Button>
                <Button 
                    onClick={salvar} 
                    loading={carregando} 
                    disabled={carregando} 
                    title="Salvar pessoa">
                  Salvar
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}