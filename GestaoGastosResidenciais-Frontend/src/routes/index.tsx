import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Login } from "../pages/Login";
import {PrivateRoute } from "./privateRoute";
import { VisaoGeral } from "../pages/VisaoGeral";
import { Transacao } from "../pages/Transacoes";
import { Categoria } from "../pages/Categorias";
import { Pessoa } from "../pages/Pessoas";
import { TotalPorCategoria } from "../pages/TotaisPorCategoria";
import { TotalPorPessoa } from "../pages/TotaisPorPessoa";
import { Layout } from "../components/Layout/layout";

export function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>

                <Route path="/login" element={<Login />} />

                 <Route element={<PrivateRoute />}>

                    <Route element={<Layout />}>
                        <Route path="/visaoGeral"         element={<VisaoGeral />} />
                        <Route path="/transacoes"         element={<Transacao />} />
                        <Route path="/categorias"         element={<Categoria />} />
                        <Route path="/pessoas"            element={<Pessoa />} />
                        <Route path="/totaisPorCategoria" element={<TotalPorCategoria />} />
                        <Route path="/totaisPorPessoa"    element={<TotalPorPessoa />} />
                    </Route>

                </Route>

                <Route path="/" element={<Navigate to="/login" replace />} />

                <Route path="*" element={<Navigate to="/login" replace />} />

            </Routes>
        </BrowserRouter>
    )
}