import { createContext, useContext, useState, type ReactNode } from "react";
import type { LoginResponse } from "../types"

const SESSION_KEY = "u5u4r1oLogad0";

type AuthContextType = {
    usuario: LoginResponse | null;
    login: (usuario: LoginResponse) 
        => void
    logout: () 
        => void;
    estaLogado: boolean;
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

// ─── Contexto ───────────────────────────────────────────────────────────────────
// Este arquivo tem a função de implementar o contexto de autenticação.
// Gerenciando o estado do usuário logado.

export function ProvedorAutenticacao({ children }: { children: ReactNode }) {

    const [usuario, setUsuario] = useState<LoginResponse | null>(() => {
        const salvo = sessionStorage.getItem(SESSION_KEY);
        return salvo ? JSON.parse(salvo) : null;
    });

    function login(usuario: LoginResponse) {
        const dadosPublicos = {
            nomeDoUsuario: usuario.nomeDoUsuario,
            codigoDoUsuario: usuario.codigoDoUsuario,
        };
        sessionStorage.setItem(SESSION_KEY, JSON.stringify(dadosPublicos));
        setUsuario(usuario);
    }

    function logout() {
        sessionStorage.removeItem(SESSION_KEY);
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