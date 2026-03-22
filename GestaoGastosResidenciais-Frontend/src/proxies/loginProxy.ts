import { Navegador } from "../navigate/navigate"
import type { LoginRequest, LoginResponse } from "../types"

export const LoginProxy = {
    logar: (body: LoginRequest): Promise<LoginResponse> => {
        return Navegador.post<LoginResponse>("/seguranca/login", body)
    },

    logout: (): Promise<void> => {
        return Navegador.post<void>("/seguranca/logout", {});
    },
};