import { Route, Routes, useNavigate } from "react-router-dom";
import { CategoryRecipes } from "./components/category-recipes";
import { RecipesCategories } from "./components/categories";
import { RecipeDetails } from "./components/recipe-details";
import { RecipeFeedbacks } from "./components/feedbacks";
import { FeedbackCreate } from "./components/feedbacks-create";

export function Recipes() {
    return (
        <div className="flex flex-col min-h-screen bg-white gap-4">
            <Routes>
                <Route path="/" element={<RecipesCategories />} />
                <Route path="/:category" element={<CategoryRecipes />} />
                <Route path="/:category/:recipeId" element={<RecipeDetails />} />
                <Route path="/:category/:recipeId/feedbacks" element={<RecipeFeedbacks />} />
                <Route path="/:category/:recipeId/feedbacks/create" element={<FeedbackCreate />} />
            </Routes>
        </div>
    );
}