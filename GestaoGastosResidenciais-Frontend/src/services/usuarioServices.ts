import { UsuarioProxy } from "../proxies/usuarioProxy";
import type { LoginRequest, LoginResponse } from "../types";

// ─── UsuarioService ───────────────────────────────────────────────────────────────────
// Camada de serviço de cadastro de usuários, responsável por chamar o proxy correspondente

export const UsuarioService = {
    cadastrar: async (credenciais: LoginRequest): Promise<LoginResponse> => {
        return await UsuarioProxy.cadastrar(credenciais);
    },
}