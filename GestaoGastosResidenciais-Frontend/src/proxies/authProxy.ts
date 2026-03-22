import { Navegador } from "../navigate/navigate";
import type { LoginResponse } from "../types";

export const AuthProxy = {
    verificar: (): Promise<LoginResponse> => {
        return Navegador.get<LoginResponse>("/seguranca/me");
    },
};