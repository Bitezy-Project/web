import { Routes, Route } from "react-router-dom";
import { PAGES_PATH } from "./constants/pages";
import { Home } from "./pages/home/home";
import { Educational } from "./pages/educational/educational";
import { Products } from "./pages/products/products";
import { Recipes } from "./pages/recipes/recipes";
import { Locations } from "./pages/locations/locations";
import { Auth } from "./pages/login/auth";
import { SignInButton, useUser } from "@clerk/clerk-react";

export function App() {
  const { user, isLoaded } = useUser();

  return isLoaded && user ? (
    <div className="w-full h-full flex flex-col">
      <Routes>
        <Route path={PAGES_PATH.HOME + "/*"} element={<Home />} />
        <Route path={PAGES_PATH.EDUCATIONAL + "/*"} element={<Educational />} />
        <Route path={PAGES_PATH.PRODUCTS + "/*"} element={<Products />} />
        <Route path={PAGES_PATH.RECIPES + "/*"} element={<Recipes />} />
        <Route path={PAGES_PATH.LOCATIONS + "/*"} element={<Locations />} />
        <Route path={PAGES_PATH.LOGIN + "/*"} element={<Auth />} />
      </Routes>
    </div>
  ) : (
    <div className="w-full h-screen flex items-center justify-center bg-gradient-to-r from-[#9DA87F] to-[#7C8F6B]">
      <div className="bg-white p-10 rounded-xl shadow-lg flex flex-col items-center gap-6">
        <h1 className="text-3xl font-bold text-[#1f3d2b]">Bem-vindo!</h1>
        <p className="text-gray-600">Faça login para acessar o sistema</p>

        <SignInButton>
          <button className="bg-[#9DA87F] text-white px-6 py-2 rounded-md font-semibold hover:bg-[#8a996f] transition">
            Entrar
          </button>
        </SignInButton>
      </div>
    </div>
  );
}
