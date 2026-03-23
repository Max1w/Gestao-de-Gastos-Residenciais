import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login } from "../pages/Login";
import {PrivateRoute } from "./privateRoute";
import { VisaoGeral } from "../pages/VisaoGeral";
import { Transacao } from "../pages/Transacoes";
import { Categoria } from "../pages/Categorias";
import { Pessoa } from "../pages/Pessoas";
import { Layout } from "../components/Layout/layout";
import { TotaisPorCategoria } from "../pages/TotaisPorCategoria";
import { TotaisPorPessoa } from "../pages/TotaisPorPessoa";

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
                        <Route path="/totaisPorCategoria" element={<TotaisPorCategoria />} />
                        <Route path="/totaisPorPessoa"    element={<TotaisPorPessoa />} />
                    </Route>

                </Route>

                <Route path="/" element={<Navigate to="/login" replace />} />

                <Route path="*" element={<Navigate to="/login" replace />} />

            </Routes>
        </BrowserRouter>
    )
}