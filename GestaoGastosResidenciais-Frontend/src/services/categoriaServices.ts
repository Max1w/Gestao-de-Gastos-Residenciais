import { CategoriaProxy } from "../proxies/categoriaProxy";
import type { Categoria } from "../types";

// ─── CategoriaService ───────────────────────────────────────────────────────────────────
// Camada de serviço do CRUD de categorias, responsável por chamar o proxy correspondente

export const CategoriaService = {
    consultar: async (): Promise<Categoria[]> => {
        return await CategoriaProxy.consultar();
    },
    cadastrar: async (categoria: Omit<Categoria, 'id'>): Promise<Categoria> => {
        return await CategoriaProxy.cadastrar(categoria);
    },
    alterar: async (categoria: Categoria): Promise<Categoria> => {
        return await CategoriaProxy.alterar(categoria);
    },
    remover: async (id: number): Promise<void> => {
        return await CategoriaProxy.remover(id);
    }
};
