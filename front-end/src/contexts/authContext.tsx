import { createContext, useContext, useState, type ReactNode } from "react";
import type { Usuario } from "../types"

type AuthContextType = {
    usuario: Usuario | null;
    login: (usuario: Usuario) 
        => void
    logout: () 
        => void;
    estaLogado: boolean;
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function ProvedorAutenticacao({ children }: { children: ReactNode }) {
    const [usuario, setUsuario] = useState<Usuario | null>(null);

    function login(usuario: Usuario) {
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