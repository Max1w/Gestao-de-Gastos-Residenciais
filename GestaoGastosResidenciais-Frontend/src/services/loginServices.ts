import { LoginProxy } from "../proxies/loginProxy";
import type { LoginRequest, LoginResponse } from "../types";

// ─── LoginService ───────────────────────────────────────────────────────────────────
// Camada de serviço de autenticação, responsável por chamar o proxy correspondente

export const LoginService = {
    logar: async (credenciais: LoginRequest): Promise<LoginResponse> => {
        return await LoginProxy.logar(credenciais);
    },

    logout: async (): Promise<void> => {
        await LoginProxy.logout();
    },
}