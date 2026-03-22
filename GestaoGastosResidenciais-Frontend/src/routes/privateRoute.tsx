import { Navigate, Outlet } from "react-router-dom";
import { usarAutenticacao } from "../contexts/authContext";

export function PrivateRoute() {
    const { estaLogado } = usarAutenticacao();

    if (!estaLogado) {
        return <Navigate to="/login" replace />
    }

    return <Outlet />;
}