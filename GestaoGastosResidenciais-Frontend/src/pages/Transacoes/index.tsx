import { useEffect, useState } from "react";
import { FinalidadeCategoria, TipoTransacao, type Categoria, type Pessoa, type Transacao } from "../../types";
import { TransacaoService } from "../../services/transacaoServices";
import { PessoaService } from "../../services/pessoaServices";
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
  .modal { background: #fff; border-radius: 8px; padding: 1.5rem; width: 420px; max-width: 95vw; border: 1px solid #e5e7eb; }
  .modal-titulo { font-size: 1rem; font-weight: 500; color: #1a1a2e; margin: 0 0 1.25rem; }
  .campo-grupo { margin-bottom: 0.9rem; }
  .campo-label { display: block; font-size: 0.78rem; color: #374151; margin-bottom: 0.25rem; }
  .campo-select { width: 100%; padding: 0.45rem 0.65rem; border: 1px solid #d1d5db; border-radius: 5px; font-size: 0.875rem; box-sizing: border-box; outline: none; }
  .campo-select:focus { border-color: #3b4fd5; }
  .linha-dupla { display: flex; gap: 0.75rem; }
  .linha-dupla .campo-grupo, .linha-dupla .input-group { flex: 1; }
  .modal-acoes { display: flex; justify-content: flex-end; gap: 0.5rem; margin-top: 1.25rem; }
  .msg-vazio { text-align: center; padding: 2rem; color: #9ca3af; font-size: 0.875rem; }
  .msg-erro { color: #dc2626; font-size: 0.75rem; margin-top: 0.25rem; }
`;

const estadoInicial = {
  descricao: "",
  valor: "",
  tipo: TipoTransacao.Despesa,
  idCategoria: 0,
  idPessoa: 0,
};

export function Transacao() {
  const [transacoes, setTransacoes] = useState<Transacao[]>([]);
  const [pessoas, setPessoas] = useState<Pessoa[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [modalAberto, setModalAberto] = useState(false);
  const [formulario, setFormulario] = useState<{
    descricao: string;
    valor: string;
    tipo: Transacao["tipo"];
    idCategoria: number;
    idPessoa: number;
  }>(estadoInicial);
  const [editando, setEditando] = useState<Transacao | null>(null);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState("");

  async function carregar() {
    try {
      const [t, p, c] = await Promise.all([
        TransacaoService.consultar(),
        PessoaService.consultar(),
        CategoriaService.consultar(),
      ]);
      setTransacoes(t);
      setPessoas(p);
      setCategorias(c);
    } catch {
      setErro("Erro ao carregar dados.");
    }
  }

  useEffect(() => { carregar(); }, []);

  const categoriasFiltradas = categorias.filter(c =>
    c.finalidade === FinalidadeCategoria.Ambas ||
    c.finalidade === (formulario.tipo === TipoTransacao.Despesa ? FinalidadeCategoria.Despesa : FinalidadeCategoria.Receita)
  );

  function abrirNovo() {
    setEditando(null);
    setFormulario(estadoInicial);
    setErro("");
    setModalAberto(true);
  }

  function abrirEdicao(t: Transacao) {
    setEditando(t);
    setFormulario({
      descricao: t.descricao,
      valor: String(t.valor),
      tipo: t.tipo,
      idCategoria: t.categoriaId,
      idPessoa: t.pessoaId,
    });
    setErro("");
    setModalAberto(true);
  }

  function fecharModal() {
    setModalAberto(false);
    setErro("");
  }

  function handleTipoChange(tipo: Transacao["tipo"]) {
    setFormulario(f => ({ ...f, tipo, idCategoria: 0 }));
  }

  async function salvar() {
    if (!formulario.descricao.trim() || !formulario.valor || !formulario.idCategoria || !formulario.idPessoa) return;
    setCarregando(true);
    setErro("");
    try {
      const payload = {
        descricao: formulario.descricao.trim(),
        valor: Number(formulario.valor),
        tipo: formulario.tipo,
        categoriaId: formulario.idCategoria,
        pessoaId: formulario.idPessoa,
      };
      if (editando) {
        const atualizada = await TransacaoService.alterar({ ...editando, ...payload });
        setTransacoes(t => t.map(x => x.id === atualizada.id ? atualizada : x));
      } else {
        const nova = await TransacaoService.cadastrar(payload);
        setTransacoes(t => [...t, nova]);
      }
      fecharModal();
    } catch {
      setErro("Erro ao salvar. Tente novamente.");
    } finally {
      setCarregando(false);
    }
  }

  async function remover(id: number) {
    if (!confirm("Deseja remover esta transação?")) return;
    try {
      await TransacaoService.remover(id);
      setTransacoes(t => t.filter(x => x.id !== id));
    } catch {
      alert("Erro ao remover transação.");
    }
  }

  function nomePessoa(id: number) {
    return pessoas.find(p => p.id === id)?.nome ?? String(id);
  }

  function nomeCategoria(id: number) {
    return categorias.find(c => c.id === id)?.descricao ?? String(id);
  }

  function formatarValor(valor: number) {
    return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  }

  return (
    <>
      <style>{estilos}</style>
      <div className="cadastro-container">
        <div className="cadastro-header">
          <div>
            <h1 className="cadastro-titulo">Cadastro de Transações</h1>
            <p className="cadastro-subtitulo">Registre e gerencie as transações financeiras vinculadas a pessoas.</p>
          </div>
          <Button onClick={abrirNovo} title="Nova transação">
            + Nova Transação
          </Button>
        </div>

        <div className="tabela-wrapper">
          <table className="tabela">
            <thead>
              <tr>
                <th>Descrição</th>
                <th>Tipo</th>
                <th>Valor</th>
                <th>Categoria</th>
                <th>Pessoa</th>
                <th style={{ textAlign: "right" }}>Ações</th>
              </tr>
            </thead>
            <tbody>
              {transacoes.length === 0 ? (
                <tr><td colSpan={6} className="msg-vazio">Nenhuma transação cadastrada.</td></tr>
              ) : transacoes.map(t => (
                <tr key={t.id}>
                  <td>{t.descricao}</td>
                  <td>
                    <span className={`badge ${t.tipo === TipoTransacao.Despesa ? "badge-despesa" : "badge-receita"}`}>
                      {t.tipo === TipoTransacao.Despesa ? "Despesa" : "Receita"}
                    </span>
                  </td>
                  <td className={t.tipo === TipoTransacao.Despesa ? "valor-despesa" : "valor-receita"}>
                    {t.tipo === TipoTransacao.Despesa ? "- " : "+ "}{formatarValor(t.valor)}
                  </td>
                  <td>{nomeCategoria(t.categoriaId)}</td>
                  <td>{nomePessoa(t.pessoaId)}</td>
                  <td>
                    <div className="acoes">
                      <Button variant="secondary" onClick={() => abrirEdicao(t)} title="Editar">
                        <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                      </Button>
                      <Button variant="danger" onClick={() => remover(t.id)} title="Remover">
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
              <h2 className="modal-titulo">{editando ? "Editar Transação" : "Nova Transação"}</h2>

              <Input
                label="Descrição *"
                placeholder="Descrição da transação"
                maxLength={400}
                value={formulario.descricao}
                onChange={e => setFormulario(f => ({ ...f, descricao: e.target.value }))}
              />

              <div className="linha-dupla">
                <Input
                  label="Valor *"
                  type="number"
                  min={0.01}
                  step={0.01}
                  placeholder="0,00"
                  value={formulario.valor}
                  onChange={e => setFormulario(f => ({ ...f, valor: e.target.value }))}
                />
                <div className="campo-grupo">
                  <label className="campo-label">Tipo *</label>
                  <select
                    className="campo-select"
                    value={formulario.tipo}
                    onChange={e => handleTipoChange(Number(e.target.value) as Transacao["tipo"])}
                  >
                    <option value={TipoTransacao.Despesa}>Despesa</option>
                    <option value={TipoTransacao.Receita}>Receita</option>
                  </select>
                </div>
              </div>

              <div className="campo-grupo">
                <label className="campo-label">Categoria *</label>
                <select
                  className="campo-select"
                  value={formulario.idCategoria}
                  onChange={e => setFormulario(f => ({ ...f, idCategoria: Number(e.target.value) }))}
                >
                  <option value={0}>Selecione uma categoria</option>
                  {categoriasFiltradas.map(c => (
                    <option key={c.id} value={c.id}>{c.descricao}</option>
                  ))}
                </select>
              </div>

              <div className="campo-grupo">
                <label className="campo-label">Pessoa *</label>
                <select
                  className="campo-select"
                  value={formulario.idPessoa}
                  onChange={e => setFormulario(f => ({ ...f, idPessoa: Number(e.target.value) }))}
                >
                  <option value={0}>Selecione uma pessoa</option>
                  {pessoas.map(p => (
                    <option key={p.id} value={p.id}>{p.nome}</option>
                  ))}
                </select>
              </div>

              {erro && <p className="msg-erro">{erro}</p>}

              <div className="modal-acoes">
                <Button variant="secondary" onClick={fecharModal} title="Cancelar">
                  Cancelar
                </Button>
                <Button onClick={salvar} loading={carregando} disabled={carregando} title="Salvar transação">
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