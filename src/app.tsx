import { Routes, Route } from "react-router-dom";
import { PAGES_PATH } from "./constants/pages";
import { Home } from "./pages/home/home";
import { Educational } from "./pages/educational/educational";
import { Products } from "./pages/products/products";
import { Recipes } from "./pages/recipes/recipes";
import { Locations } from "./pages/locations/locations";


export function App() {
    return (
        <div className="w-full h-full flex flex-col">
            <Routes>
                <Route path={PAGES_PATH.HOME + "/*"} element={<Home />} />
                <Route path={PAGES_PATH.EDUCATIONAL + "/*"} element={<Educational />} />
                <Route path={PAGES_PATH.PRODUCTS + "/*"} element={<Products />} />
                <Route path={PAGES_PATH.RECIPES + "/*"} element={<Recipes />} />
                <Route path={PAGES_PATH.LOCATIONS + "/*"} element={<Locations />} />
            </Routes>
            
        </div>
    );
}