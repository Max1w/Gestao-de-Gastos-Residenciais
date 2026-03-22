import { createContext, useContext, useState, type ReactNode } from "react";
import type { LoginResponse } from "../types"

type AuthContextType = {
    usuario: LoginResponse | null;
    login: (usuario: LoginResponse) 
        => void
    logout: () 
        => void;
    estaLogado: boolean;
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function ProvedorAutenticacao({ children }: { children: ReactNode }) {
    const [usuario, setUsuario] = useState<LoginResponse | null>(null);

    function login(usuario: LoginResponse) {
        setUsuario(usuario);
    }

    function logout() {
        setUsuario(null);
    }

    return (
        <AuthContext.Provider value={{ usuario, login, logout, estaLogado: !!usuario }}>
            {children}
        </AuthContext.Provider>
    )
}

export function usarAutenticacao() {
    return useContext(AuthContext);
}