import { PessoaProxy } from "../proxies/pessoaProxy";
import type { Pessoa } from "../types";

// ─── PessoaService ───────────────────────────────────────────────────────────────────
// Camada de serviço do CRUD de pessoas, responsável por chamar o proxy correspondente

export const PessoaService = {
    consultar: async (): Promise<Pessoa[]> => {
        return await PessoaProxy.consultar();
    },
    cadastrar: async (pessoa: Omit<Pessoa, 'id'>): Promise<Pessoa> => {
        return await PessoaProxy.cadastrar(pessoa);
    },
    alterar: async (pessoa: Pessoa): Promise<Pessoa> => {
        return await PessoaProxy.alterar(pessoa);
    },
    remover: async (id: number): Promise<void> => {
        return await PessoaProxy.remover(id);
    }
};
