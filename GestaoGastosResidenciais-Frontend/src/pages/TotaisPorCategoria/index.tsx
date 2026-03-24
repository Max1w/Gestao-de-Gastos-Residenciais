import { useEffect, useState } from "react";
import { TransacaoService } from "../../services/transacaoServices";
import type { TotalPorCategoria } from "../../types";

const estilos = `
  .totais-container { font-family: sans-serif; padding: 1.5rem; background: #f5f6f8; min-height: 100vh; }
  .totais-header { margin-bottom: 1.25rem; }
  .totais-titulo { font-size: 1.25rem; font-weight: 500; color: #1a1a2e; margin: 0 0 0.2rem; }
  .totais-subtitulo { font-size: 0.8rem; color: #6b7280; margin: 0; }
  .tabela-wrapper { background: #fff; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden; }
  .tabela { width: 100%; border-collapse: collapse; font-size: 0.875rem; }
  .tabela thead th { padding: 0.7rem 1rem; text-align: left; font-size: 0.75rem; font-weight: 500; color: #6b7280; border-bottom: 1px solid #e5e7eb; }
  .tabela thead th:not(:first-child) { text-align: right; }
  .tabela tbody td { padding: 0.75rem 1rem; color: #111827; border-bottom: 1px solid #f3f4f6; }
  .tabela tbody tr:last-child td { border-bottom: none; }
  .tabela tbody td:not(:first-child) { text-align: right; font-variant-numeric: tabular-nums; }
  .valor-receita { color: #0F6E56; }
  .valor-despesa { color: #993C1D; }
  .valor-pos { color: #0F6E56; font-weight: 500; }
  .valor-neg { color: #993C1D; font-weight: 500; }
  .linha-total td { border-top: 1.5px solid #d1d5db !important; border-bottom: none !important; font-weight: 500; background: #f9fafb; }
  .msg-vazio { text-align: center; padding: 2rem; color: #9ca3af; font-size: 0.875rem; }
  .msg-erro { color: #dc2626; font-size: 0.875rem; padding: 1rem; text-align: center; }
`;

// Formata um número como moeda brasileira (R$ 1.234,56)
function formatarValor(valor: number) {
  return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

// Formata o saldo, adicionando "–" na frente quando negativo
function formatarSaldo(valor: number) {
  return valor < 0
    ? `– ${formatarValor(Math.abs(valor))}`
    : formatarValor(valor);
}

// ─── TotaisPorCategoria ───────────────────────────────────────────────────────────────────
// Aqui é a tela de Totais por categoria, onde fica sua estilização, html e suas functions

export function TotaisPorCategoria() {
  const [totais, setTotais] = useState<TotalPorCategoria[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  // Busca os totais por categoria ao montar o componente
  useEffect(() => {
    async function carregar() {
      try {
        const dados = await TransacaoService.consultarTotaisPorCategoria();
        setTotais(dados);
      } catch {
        setErro("Erro ao carregar os totais por categoria.");
      } finally {
        setCarregando(false);
      }
    }
    carregar();
  }, []);

  const totalReceita = totais.reduce((s, t) => s + t.totalReceita, 0); // Soma todas as receitas
  const totalDespesa = totais.reduce((s, t) => s + t.totalDespesa, 0); // Soma todas as despesas
  const saldoGeral = totalReceita - totalDespesa; // Saldo geral (receitas - despesas)

  return (
    <>
      <style>{estilos}</style>
      <div className="totais-container">
        <div className="totais-header">
          <h1 className="totais-titulo">Totais por Categoria</h1>
          <p className="totais-subtitulo">
            Resumo de receitas, despesas e saldo agrupado por categoria.
          </p>
        </div>

        <div className="tabela-wrapper">
          <table className="tabela">
            <thead>
              <tr>
                <th>Categoria</th>
                <th>Receitas</th>
                <th>Despesas</th>
                <th>Saldo</th>
              </tr>
            </thead>
            <tbody>
              {carregando ? (
                <tr><td colSpan={4} className="msg-vazio">Carregando...</td></tr>
              ) : erro ? (
                <tr><td colSpan={4} className="msg-erro">{erro}</td></tr>
              ) : totais.length === 0 ? (
                <tr><td colSpan={4} className="msg-vazio">Nenhum dado encontrado.</td></tr>
              ) : (
                <>
                  {totais.map((t) => (
                    <tr key={t.categoriaId}>
                      <td>{t.nomeCategoria}</td>
                      <td className="valor-receita">{formatarValor(t.totalReceita)}</td>
                      <td className="valor-despesa">{formatarValor(t.totalDespesa)}</td>
                      <td className={t.saldoLiquido >= 0 ? "valor-pos" : "valor-neg"}>
                        {formatarSaldo(t.saldoLiquido)}
                      </td>
                    </tr>
                  ))}
                  <tr className="linha-total">
                    <td>Total geral</td>
                    <td className="valor-receita">{formatarValor(totalReceita)}</td>
                    <td className="valor-despesa">{formatarValor(totalDespesa)}</td>
                    <td className={saldoGeral >= 0 ? "valor-pos" : "valor-neg"}>
                      {formatarSaldo(saldoGeral)}
                    </td>
                  </tr>
                </>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}