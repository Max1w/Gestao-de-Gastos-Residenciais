import { UsuarioProxy } from "../proxies/usuarioProxy";
import type { LoginRequest, LoginResponse } from "../types";

export const UsuarioService = {
    cadastrar: async (credenciais: LoginRequest): Promise<LoginResponse> => {
        return await UsuarioProxy.cadastrar(credenciais);
    },
}