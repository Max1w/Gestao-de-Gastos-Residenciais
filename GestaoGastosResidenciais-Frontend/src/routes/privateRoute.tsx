import { Navigate, Outlet } from "react-router-dom";
import { usarAutenticacao } from "../contexts/authContext";

// ─── PrivateRoute ───────────────────────────────────────────────────────────────────
// Protege as rotas internas: redireciona para o login se o usuário não estiver autenticado
// Caso esteja autenticado, renderiza a rota filha normalmente via Outlet

export function PrivateRoute() {
    const { estaLogado } = usarAutenticacao();

    if (!estaLogado) {
        return <Navigate to="/login" replace />
    }

    return <Outlet />;
}