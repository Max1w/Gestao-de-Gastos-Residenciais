import { Navegador } from "../navigate/navigate";
import type { LoginRequest, LoginResponse } from "../types";

// ─── UsuarioProxy ───────────────────────────────────────────────────────────────────
// Responsável pelas chamadas HTTP de cadastro de usuários

export const UsuarioProxy = {
    cadastrar: (body: LoginRequest): Promise<LoginResponse> => {
        return Navegador.post<LoginResponse>("/usuario/cadastrar", body)
    },
};