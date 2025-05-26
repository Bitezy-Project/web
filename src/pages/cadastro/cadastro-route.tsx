import { Route, Routes } from "react-router-dom";
import {Register} from "./components/cadastro";


export function RegisterRoute() {
    return (
        <div className="flex flex-col min-h-screen bg-white gap-4">
            <Routes>
                <Route path="/" element={< Register/>} />
            </Routes>
        </div>
    );
}