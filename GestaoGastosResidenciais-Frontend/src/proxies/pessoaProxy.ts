import { Navegador } from "../navigate/navigate";
import type { Pessoa } from "../types";

// ─── PessoaProxy ───────────────────────────────────────────────────────────────────
// Responsável pelas chamadas HTTP do CRUD de pessoas

export const PessoaProxy = {
    consultar: (): Promise<Pessoa[]> => {
        return Navegador.get<Pessoa[]>("/pessoa/consultar");
    },
    cadastrar: (body: Omit<Pessoa, 'id'>): Promise<Pessoa> => {
        return Navegador.post<Pessoa>("/pessoa/cadastrar", body);
    },
    alterar: (body: Pessoa): Promise<Pessoa> => {
        return Navegador.put<Pessoa>("/pessoa/alterar", body);
    },
    remover: (id: number): Promise<void> => {
        return Navegador.delete<void>(`/pessoa/remover/${id}`);
    }
};
