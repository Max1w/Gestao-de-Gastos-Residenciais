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

// ─── Transacao ───────────────────────────────────────────────────────────────────
// Aqui é a tela de Cadastro de Transacao, onde fica sua estilização, html e suas functions

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
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState("");

  // Busca transações, pessoas e categorias em paralelo e atualiza o estado
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

  // Executa carregar() assim que o componente é montado
  useEffect(() => { carregar(); }, []);

  // Filtra as categorias compatíveis com o tipo da transação (despesa, receita ou ambas)
  const categoriasFiltradas = categorias.filter(c =>
    c.finalidade === FinalidadeCategoria.Ambas ||
    c.finalidade === (formulario.tipo === TipoTransacao.Despesa ? FinalidadeCategoria.Despesa : FinalidadeCategoria.Receita)
  );

  // Abre o modal limpo para cadastrar uma nova transação
  function abrirNovo() {
    setFormulario(estadoInicial);
    setErro("");
    setModalAberto(true);
  }

  // Fecha o modal
  function fecharModal() {
    setModalAberto(false);
    setErro("");
  }

  // Atualiza o tipo da transação e reseta a categoria (pois muda as opções disponíveis)
  function handleTipoChange(tipo: Transacao["tipo"]) {
    setFormulario(f => ({ ...f, tipo, idCategoria: 0 }));
  }

  // Salva o formulário: cadastra nova ou atualiza existente
  async function salvar() {
    if (!formulario.descricao.trim() || !formulario.valor || !formulario.idCategoria || !formulario.idPessoa) {
      setErro("Preencha os campos.");
      return;
    } 

    const pessoaSelecionada = pessoas.find(p => p.id === formulario.idPessoa);
    const idade = pessoaSelecionada?.idade;

    if ((idade! < 18) && formulario.tipo == TipoTransacao.Receita){
      setErro("A pessoa selecionada possui menos de 18 anos. Por favor, lance apenas despesas ou selecione outra pessoa.");
      return;
    }

    setCarregando(true);
    setErro("");
    try {
      const payload = {
        descricao: formulario.descricao.trim(),
        valor: Number(formulario.valor.replace(/\./g, "").replace(",", ".")),
        tipo: formulario.tipo,
        categoriaId: formulario.idCategoria,
        pessoaId: formulario.idPessoa,
      };
      const nova = await TransacaoService.cadastrar(payload);
      setTransacoes(t => [...t, nova]);
      fecharModal();
    } catch(erro: any) {
      const mensagem =
              erro?.response?.data?.mensagem ||
              erro?.response?.data?.message ||
              erro?.response?.data?.errors?.Descricao ||
              erro?.response?.data?.errors?.Valor ||
              erro?.response?.data?.errors?.Tipo ||
              erro?.response?.data?.errors?.CategoriaId ||
              erro?.response?.data?.errors?.PessoaId ||
              erro?.message ||
              "Erro ao salvar. Tente novamente.";
              
      setErro(mensagem);
    }finally {
      setCarregando(false);
    }
  }

  function formatarInputValor(input: string): string {
    const apenasDigitos = input.replace(/\D/g, "");
    if (!apenasDigitos) return "";

    const numero = parseInt(apenasDigitos, 10);
    const reais = Math.floor(numero / 100);
    const centavos = numero % 100;

    const reaisFormatado = reais.toLocaleString("pt-BR");
    return `${reaisFormatado},${String(centavos).padStart(2, "0")}`;
  }

  // Retorna o nome da pessoa pelo id
  function nomePessoa(id: number) {
    return pessoas.find(p => p.id === id)?.nome ?? String(id);
  }

  // Retorna o nome da categoria pelo id
  function nomeCategoria(id: number) {
    return categorias.find(c => c.id === id)?.descricao ?? String(id);
  }

  // Formata um número como moeda brasileira (R$ 1.234,56)
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {modalAberto && (
          <div className="modal-overlay" onClick={fecharModal}>
            <div className="modal" onClick={e => e.stopPropagation()}>
              <h2 className="modal-titulo">{"Nova Transação"}</h2>

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
                  type="text"
                  min={0.01}
                  step={0.01}
                  placeholder="0,00"
                  value={formulario.valor}
                  onChange={e => setFormulario(f => ({ ...f, valor: formatarInputValor(e.target.value) }))}
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