import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login } from "../pages/Login";
import {PrivateRoute } from "./privateRoute";
import { VisaoGeral } from "../pages/VisaoGeral";

export function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>

                <Route path="/login" element={<Login />} />

                <Route path="/visaoGeral" element={
                    <PrivateRoute><VisaoGeral /></PrivateRoute>
                }/>

            </Routes>
        </BrowserRouter>
    )
}