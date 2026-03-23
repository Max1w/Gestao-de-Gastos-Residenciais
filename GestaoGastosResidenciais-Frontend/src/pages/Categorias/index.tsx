import { useEffect, useState } from "react";
import type { Categoria, FinalidadeCategoria } from "../../types";
import { CategoriaService } from "../../services/categoriaServices";
import Button from "../../components/Button/button";
import Input from "../../components/Input/Input";

const estilos = `
  .cadastro-container { font-family: sans-serif; padding: 1.5rem; background: #f5f6f8; min-height: 100vh; }
  .cadastro-header { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 1.25rem; }
  .cadastro-titulo { font-size: 1.25rem; font-weight: 500; color: #1a1a2e; margin: 0 0 0.2rem; }
  .cadastro-subtitulo { font-size: 0.8rem; color: #6b7280; margin: 0; }
  .tabela-wrapper { background: #fff; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden; }
  .tabela { width: 100%; border-collapse: collapse; font-size: 0.875rem; }
  .tabela thead th { padding: 0.7rem 1rem; text-align: left; font-size: 0.75rem; font-weight: 500; color: #6b7280; border-bottom: 1px solid #e5e7eb; }
  .tabela tbody td { padding: 0.75rem 1rem; color: #111827; border-bottom: 1px solid #f3f4f6; }
  .tabela tbody tr:last-child td { border-bottom: none; }
  .acoes { display: flex; gap: 0.4rem; justify-content: flex-end; }
  .modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.35); display: flex; align-items: center; justify-content: center; z-index: 100; }
  .modal { background: #fff; border-radius: 8px; padding: 1.5rem; width: 380px; max-width: 95vw; border: 1px solid #e5e7eb; }
  .modal-titulo { font-size: 1rem; font-weight: 500; color: #1a1a2e; margin: 0 0 1.25rem; }
  .campo-grupo { margin-bottom: 0.9rem; }
  .campo-label { display: block; font-size: 0.78rem; color: #374151; margin-bottom: 0.25rem; }
  .campo-select { width: 100%; padding: 0.45rem 0.65rem; border: 1px solid #d1d5db; border-radius: 5px; font-size: 0.875rem; box-sizing: border-box; outline: none; }
  .campo-select:focus { border-color: #3b4fd5; }
  .modal-acoes { display: flex; justify-content: flex-end; gap: 0.5rem; margin-top: 1.25rem; }
  .msg-vazio { text-align: center; padding: 2rem; color: #9ca3af; font-size: 0.875rem; }
  .msg-erro { color: #dc2626; font-size: 0.75rem; margin-top: 0.25rem; }
`;

const finalidadeLabelMap: Record<FinalidadeCategoria, string> = {
  1: "Despesa",
  2: "Receita",
  3: "Ambas",
};
const estadoInicial = { descricao: "", finalidade: 3 as FinalidadeCategoria };

export function Categoria() {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [modalAberto, setModalAberto] = useState(false);
  const [formulario, setFormulario] = useState<{ descricao: string; finalidade: Categoria["finalidade"] }>(estadoInicial);
  const [editando, setEditando] = useState<Categoria | null>(null);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState("");

  async function carregar() {
    try {
      const dados = await CategoriaService.consultar();
      setCategorias(dados);
    } catch {
      setErro("Erro ao carregar categorias.");
    }
  }

  useEffect(() => { carregar(); }, []);

  function abrirNovo() {
    setEditando(null);
    setFormulario(estadoInicial);
    setErro("");
    setModalAberto(true);
  }

  function abrirEdicao(categoria: Categoria) {
    setEditando(categoria);
    setFormulario({ descricao: categoria.descricao, finalidade: categoria.finalidade });
    setErro("");
    setModalAberto(true);
  }

  function fecharModal() {
    setModalAberto(false);
    setErro("");
  }

  async function salvar() {
    if (!formulario.descricao.trim()) return;
    setCarregando(true);
    setErro("");
    try {
      if (editando) {
        const atualizada = await CategoriaService.alterar({ ...editando, descricao: formulario.descricao.trim(), finalidade: formulario.finalidade });
        setCategorias(c => c.map(x => x.id === atualizada.id ? atualizada : x));
      } else {
        const nova = await CategoriaService.cadastrar({ descricao: formulario.descricao.trim(), finalidade: formulario.finalidade });
        setCategorias(c => [...c, nova]);
      }
      fecharModal();
    } catch {
      setErro("Erro ao salvar. Tente novamente.");
    } finally {
      setCarregando(false);
    }
  }

  async function remover(id: number) {
    if (!confirm("Deseja remover esta categoria?")) return;
    try {
      await CategoriaService.remover(id);
      setCategorias(c => c.filter(x => x.id !== id));
    } catch {
      alert("Erro ao remover categoria.");
    }
  }

  function badgeClass(finalidade: FinalidadeCategoria) {
    if (finalidade === 1) return "badge badge-despesa";
    if (finalidade === 2) return "badge badge-receita";
    return "badge badge-ambas";
  }

  return (
    <>
      <style>{estilos}</style>
      <div className="cadastro-container">
        <div className="cadastro-header">
          <div>
            <h1 className="cadastro-titulo">Cadastro de Categorias</h1>
            <p className="cadastro-subtitulo">Gerencie as categorias utilizadas para classificar as transações.</p>
          </div>
          <Button onClick={abrirNovo} title="Nova categoria">
            + Categoria
          </Button>
        </div>

        <div className="tabela-wrapper">
          <table className="tabela">
            <thead>
              <tr>
                <th>Descrição</th>
                <th>Finalidade</th>
                <th style={{ textAlign: "right" }}>Ações</th>
              </tr>
            </thead>
            <tbody>
              {categorias.length === 0 ? (
                <tr><td colSpan={3} className="msg-vazio">Nenhuma categoria cadastrada.</td></tr>
              ) : categorias.filter(c => c.id).map(c => (
                <tr key={c.id}>
                  <td>{c.descricao}</td>
                  <td><span className={badgeClass(c.finalidade)}>{finalidadeLabelMap[c.finalidade]}</span></td>
                  <td>
                    <div className="acoes">
                      <Button
                        variant="secondary"
                        onClick={() => abrirEdicao(c)}
                        title="Editar"
                      >
                        <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                      </Button>
                      <Button
                        variant="danger"
                        onClick={() => remover(c.id)}
                        title="Remover"
                      >
                        <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>
                      </Button>
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
              <h2 className="modal-titulo">{editando ? "Editar Categoria" : "Nova Categoria"}</h2>

              <Input
                label="Descrição *"
                placeholder="Descrição da categoria"
                maxLength={400}
                value={formulario.descricao}
                onChange={e => setFormulario(f => ({ ...f, descricao: e.target.value }))}
                error={!formulario.descricao.trim() && erro ? "Descrição é obrigatória." : undefined}
              />

              <div className="campo-grupo">
                <label className="campo-label">Finalidade *</label>
                <select
                  className="campo-select"
                  value={formulario.finalidade}
                  onChange={e =>
                    setFormulario(f => ({ ...f, finalidade: Number(e.target.value) as FinalidadeCategoria }))
                  }
                >
                  <option value={1}>Despesa</option>
                  <option value={2}>Receita</option>
                  <option value={3}>Ambas</option>
                </select>
              </div>

              {erro && <p className="msg-erro">{erro}</p>}

              <div className="modal-acoes">
                <Button variant="secondary" onClick={fecharModal} title="Cancelar">
                  Cancelar
                </Button>
                <Button
                  onClick={salvar}
                  loading={carregando}
                  disabled={carregando}
                  title="Salvar categoria"
                >
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