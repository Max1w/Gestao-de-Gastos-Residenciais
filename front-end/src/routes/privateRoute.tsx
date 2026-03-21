import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { usarAutenticacao } from "../contexts/authContext";

type Propriedades = {
    children: ReactNode;
}

export function PrivateRoute({ children }: Propriedades) {
    const { estaLogado } = usarAutenticacao();

    if (!estaLogado) {
        return <Navigate to="/Login" replace />
    }

    return <>{children}</>;
}