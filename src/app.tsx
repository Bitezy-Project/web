import { Routes, Route } from "react-router-dom";
import { PAGES_PATH } from "./constants/pages";
import { Home } from "./pages/home/home";
import { Educational } from "./pages/educational/educational";
import { Products } from "./pages/products/products";
import { Recipes } from "./pages/recipes/recipes";
import { Locations } from "./pages/locations/locations";
import { Auth } from "./pages/login/auth";
import { SignedIn, SignInButton, useAuth, useSignIn, useUser,  } from "@clerk/clerk-react";

export function App() {
    const { user, isLoaded } = useUser()
    
    return (isLoaded && user) ? (
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
        <div className="w-full h-full bg-red-500">
            <p>no login</p>
            
        
            <SignInButton >

                <button >sign in</button>
            </SignInButton>
        </div>
    )
}