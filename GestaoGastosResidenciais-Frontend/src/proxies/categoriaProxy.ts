import { Navegador } from "../navigate/navigate";
import type { Categoria } from "../types";

// ─── CategoriaProxy ───────────────────────────────────────────────────────────────────
// Responsável pelas chamadas HTTP do CRUD de categorias

export const CategoriaProxy = {
    consultar: (): Promise<Categoria[]> => {
        return Navegador.get<Categoria[]>("/categoria/consultar");
    },
    cadastrar: (body: Omit<Categoria, 'id'>): Promise<Categoria> => {
        return Navegador.post<Categoria>("/categoria/cadastrar", body);
    },
    alterar: (body: Categoria): Promise<Categoria> => {
        return Navegador.put<Categoria>("/categoria/alterar", body);
    },
    remover: (id: number): Promise<void> => {
        return Navegador.delete<void>(`/categoria/remover/${id}`);
    }
};
