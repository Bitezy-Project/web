import { Route, Routes } from "react-router-dom";
import { Login } from "./login/login";

export function AuthRoutes() {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
        </Routes>
    )
}