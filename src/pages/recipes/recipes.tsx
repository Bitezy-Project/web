import { Route, Routes, useNavigate } from "react-router-dom";
import { CategoryRecipes } from "./components/category-recipes";
import { RecipesCategories } from "./components/categories";
import { RecipeDetails } from "./components/recipe-details";
import { RecipeFeedbacks } from "./components/feedbacks";
import { FeedbackCreate } from "./components/feedbacks-create";
import { RecipeDetails2 } from "./components/recipe-details-gpt";

export function Recipes() {
    return (
        <div className="flex flex-col min-h-screen bg-white gap-4">
            <Routes>
                <Route path="/" element={<RecipesCategories />} />
                <Route path="/details" element={<RecipeDetails2 />} />
                <Route path="/:category" element={<CategoryRecipes />} />
                <Route path="/category/:category/recipe/:recipeId" element={<RecipeDetails />} />
                <Route path="/:recipeId/feedbacks" element={<RecipeFeedbacks />} />
                <Route path="/:recipeId/feedbacks/create" element={<FeedbackCreate />} />
            </Routes>
        </div>
    );
}