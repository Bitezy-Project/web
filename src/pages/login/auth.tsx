import { Route, Routes, useNavigate } from "react-router-dom";
import Login from "./components/login";
import Register from "./components/register";


export function Auth() {
    return (
        <div className="flex flex-col min-h-screen bg-white gap-4">
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />
            </Routes>
        </div>
    );
}