import { Navegador } from "../navigate/navigate";
import type { TotalPorCategoria, TotalPorPessoa, Transacao } from "../types";

export const TransacaoProxy = {
    consultar: (): Promise<Transacao[]> => {
        return Navegador.get<Transacao[]>("/transacao/consultar");
    },
    cadastrar: (body: Omit<Transacao, 'id'>): Promise<Transacao> => {
        return Navegador.post<Transacao>("/transacao/cadastrar", body);
    },
    alterar: (body: Transacao): Promise<Transacao> => {
        return Navegador.put<Transacao>("/transacao/alterar", body);
    },
    remover: (id: number): Promise<void> => {
        return Navegador.delete<void>(`/transacao/remover/${id}`);
    },

    consultarTotaisPorPessoa: (): Promise<TotalPorPessoa[]> => {
        return Navegador.get<TotalPorPessoa[]>("/transacao/consultarTotaisPorPessoa");
    },

    consultarTotaisPorCategoria: (): Promise<TotalPorCategoria[]> => {
        return Navegador.get<TotalPorCategoria[]>("/transacao/consultarTotaisPorCategoria");
    },
};
