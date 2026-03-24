import { Navegador } from "../navigate/navigate";
import type { TotalPorCategoria, TotalPorPessoa, Transacao } from "../types";

// ─── TransacaoProxy ───────────────────────────────────────────────────────────────────
// Responsável pelas chamadas HTTP do CRUD de transações e consultas de totais

export const TransacaoProxy = {
    consultar: (): Promise<Transacao[]> => {
        return Navegador.get<Transacao[]>("/transacao/consultar");
    },
    cadastrar: (body: Omit<Transacao, 'id'>): Promise<Transacao> => {
        return Navegador.post<Transacao>("/transacao/cadastrar", body);
    },

    consultarTotaisPorPessoa: (): Promise<TotalPorPessoa[]> => {
        return Navegador.get<TotalPorPessoa[]>("/transacao/consultarTotaisPorPessoa");
    },

    consultarTotaisPorCategoria: (): Promise<TotalPorCategoria[]> => {
        return Navegador.get<TotalPorCategoria[]>("/transacao/consultarTotaisPorCategoria");
    },
};
