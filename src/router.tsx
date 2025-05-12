import { createBrowserRouter } from "react-router-dom";
import { PAGES_PATH } from "./constants/pages";
import { Home } from "./pages/home/home";
import { Educational } from "./pages/educational/educational";
import { Products } from "./pages/products/products";
import { Recipes } from "./pages/recipes/recipes";
import { Locations } from "./pages/locations/locations";


export const router = createBrowserRouter([
    {
        path: PAGES_PATH.HOME + "/*",
        element: <Home />
    },
    {
        path: PAGES_PATH.EDUCATIONAL + "/*",
        element: <Educational />
    },
    {
        path: PAGES_PATH.PRODUCTS + "/*",
        element: <Products />
    },
    {
        path: PAGES_PATH.RECIPES + "/*",
        element: <Recipes />
    },
    {
        path: PAGES_PATH.LOCATIONS + "/*",
        element: <Locations />
    }
    
]);

