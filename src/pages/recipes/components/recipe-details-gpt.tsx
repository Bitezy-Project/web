import { useSearchParams, useNavigate, useParams, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Clock, BarChart, Star } from "lucide-react";
import MOCKED_RECIPES from "@/assets/receitas.json";
import { PageHeader } from "@/components/ui/page-header";
import { TRecipe } from "../@types/recipe";
import { set } from "react-hook-form";
import { API_BASE_URL } from "@/constants/config";


export function RecipeDetails2() {
    const navigate = useNavigate();
    const pathParams = useParams()
    const [loading, setLoading] = useState(true);
    const [erro, setErro] = useState(false);

    const location = useLocation();
    // const recipeId = pathParams.recipeId as string;
    const recipe = (location.state as { recipe: TRecipe }).recipe;

    if (!recipe) return <div>Receita não encontrada</div>;

    console.log(recipe);


    return (
        <div className="flex flex-col min-h-screen bg-white fade">
            <PageHeader
                title={recipe.title}
                className="pb-3"
                description={"Veja os detalhes da receita"}
            />
            <div className="bg-primary text-primary-foreground px-6 pb-6  flex flex-col gap-2">
                <div className="flex justify-between items-center text-sm">
                    <div className="flex gap-3 text-gray-800">
                        <span className="flex items-center gap-1 font-medium">
                            <Clock size={16} /> {recipe.prep_time}
                        </span>
                        <span className="flex items-center gap-1 font-medium">
                            <BarChart size={16} /> {recipe.difficulty}
                        </span>
                    </div>
                </div>

                <div className="flex gap-1 items-center">
                    {recipe.rating === 0 ? (
                        <span className="text-gray-300">Ainda não há avaliações</span>
                    ) : (
                    Array.from({ length: 5 }).map((_, i) => (
                        <Star
                            key={i}
                            size={16}
                            className={i < recipe.rating ? "fill-yellow-400 stroke-yellow-400" : "text-gray-300"}
                        />
                    )))}

                    <button
                        className="bg-white text-[#1f3a2c] px-3 py-1 rounded-full text-xs font-semibold ml-auto"
                        onClick={() => navigate(`/recipes/${recipe._id}/feedbacks`, { relative: "path" })}
                    >
                        Ver Feedbacks
                    </button>
                </div>
            </div>

            <div className="p-6 space-y-4">
                <div>
                    <h2 className="font-bold text-[#1f3a2c] text-lg">Ingredientes</h2>
                    <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                        {recipe.ingredients.map((item, i) => (
                            <li key={i}>{item}</li>
                        ))}
                    </ul>
                </div>

                <div>
                    <h2 className="font-bold text-[#1f3a2c] text-lg">Modo de Preparo</h2>
                    <p className="text-sm text-gray-700 whitespace-pre-line">
                        {recipe.steps.map((item, i) => (
                            <span key={i}>
                                {item}
                                {i < recipe.steps.length - 1 && <br />}
                            </span>
                        ))}
                    </p>
                </div>
            </div>
        </div>
    );
}
