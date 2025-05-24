import { useSearchParams, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { Star } from "lucide-react";
import MOCKED_RECIPES from "@/assets/receitas.json";
import { PageHeader } from "@/components/ui/page-header";
import { TRecipe } from "../@types/recipe";
import { API_BASE_URL } from "@/constants/config";
import { useEffect } from "react";
import { Feedback } from "../@types/recipe";
import { set } from "react-hook-form";



export function RecipeFeedbacks() {
    const navigate = useNavigate();
    const pathParams = useParams()
    const recipeId = pathParams.recipeId as string;
    const [feedbacks, setFeedback] = useState<Feedback[]>([]);
    const [loading, setLoading] = useState(true);
    const [erro, setErro] = useState(false);
    const [recipe, setRecipe] = useState<TRecipe | null>(null);


    
    useEffect(() => {
        async function fetchFeedback() {
            setLoading(true);
            setErro(false);
            try {
                let res;
                console.log("id" + recipeId)
                res = await fetch(`${API_BASE_URL}/receitas/${recipeId}`);
                if (!res.ok) throw new Error("Erro ao buscar receita");
                const data = await res.json();
                setRecipe(data);
                setFeedback(data.feedbacks);
                console.log(data.feedbacks);
            } catch (err) {
                console.error(err);
                setErro(true);
            } finally {
                setLoading(false);
            }
        }

        fetchFeedback();
        
    }, [recipeId]);
    
    if (!recipe) return;
    return (
        <div className="flex flex-col min-h-screen bg-white fade">
              <PageHeader
                title={"Feedbacks " + recipe?.title}
                className="pb-3"
                description={"Veja as avaliações da receita"}
                />
            <div className="p-4">
                <button
                    onClick={() => navigate(`./create`, { relative: "path" })}
                    className="bg-[#9DA87F] text-white font-semibold px-4 py-2 rounded-md hover:bg-[#8a996f] transition"
                >
                    Adicionar seu Feedback
                </button>
            </div>

            <div className="px-4 pb-10 space-y-4">
                {feedbacks.length === 0 ? (
                    <p className="text-center text-sm text-gray-500">Nenhum feedback ainda.</p>
                ) : (
                    feedbacks.map((fb, i) => (
                        <div key={i} className="bg-white border rounded-xl p-4 shadow-sm">
                            <p className="font-bold text-[#1f3d2b]">{fb.autor}</p>
                            <div className="flex gap-1 mt-1">
                                {Array.from({ length: 5 }).map((_, j) => (
                                    <Star
                                        key={j}
                                        size={14}
                                        className={
                                            j < Number(fb.nota)
                                                ? "fill-yellow-400 stroke-yellow-400"
                                                : "text-gray-300"
                                        }
                                    />
                                ))}
                            </div>
                            <p className="text-sm text-gray-700 mt-2">{fb.comentario}</p>
                        </div>
                    ))
                )}
            </div>

        </div>
    );
}
