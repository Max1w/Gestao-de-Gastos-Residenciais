import { TransacaoProxy } from "../proxies/transacaoProxy";
import type { TotalPorCategoria, TotalPorPessoa, Transacao } from "../types";

// ─── TransacaoService ───────────────────────────────────────────────────────────────────
// Camada de serviço do CRUD de transações e consultas de totais, responsável por chamar o proxy correspondente

export const TransacaoService = {
    consultar: async (): Promise<Transacao[]> => {
        return await TransacaoProxy.consultar();
    },
    cadastrar: async (transacao: Omit<Transacao, 'id'>): Promise<Transacao> => {
        return await TransacaoProxy.cadastrar(transacao);
    },
    alterar: async (transacao: Transacao): Promise<Transacao> => {
        return await TransacaoProxy.alterar(transacao);
    },
    remover: async (id: number): Promise<void> => {
        return await TransacaoProxy.remover(id);
    },

    consultarTotaisPorPessoa: async (): Promise<TotalPorPessoa[]> => {
        return await TransacaoProxy.consultarTotaisPorPessoa();
    },
    consultarTotaisPorCategoria: async (): Promise<TotalPorCategoria[]> => {
        return await TransacaoProxy.consultarTotaisPorCategoria();
    },
};
