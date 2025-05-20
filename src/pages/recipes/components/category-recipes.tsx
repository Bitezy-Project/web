import { useEffect, useState } from "react";
import { useSearchParams, useNavigate, useParams } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { SearchBar } from "@/components/ui/search-bar";
import { Clock, BarChart, Star } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { RECIPE_CATEGORIES, RECIPE_CATEGORIES_LABELS } from "../constants/categories";
import { API_BASE_URL } from "@/constants/config";
import { TRecipe } from "../@types/recipe";


export function CategoryRecipes() {
    const pathParams = useParams();
    const navigate = useNavigate();
    const categoryKey = pathParams.category as RECIPE_CATEGORIES;

    const [busca, setBusca] = useState("");
    const [loading, setLoading] = useState(true);
    const [erro, setErro] = useState(false);

    const [recipes, setRecipes] = useState<TRecipe[]>([]);




    useEffect(() => {
        async function fetchRecipes() {
            setLoading(true);
            setErro(false);
            try {
                let res
                if (categoryKey !== RECIPE_CATEGORIES.ALL) {
                    res = await fetch(`${API_BASE_URL}/receitas/categoria/${categoryKey}`);
                }
                else {
                    res = await fetch(`${API_BASE_URL}/recipes`);
                }
                if (!res.ok) throw new Error("Erro ao buscar receitas");
                const data = await res.json();
                setRecipes(data);
            } catch (err) {
                console.error(err);
                setErro(true);
            } finally {
                setLoading(false);
            }
        }

        if (categoryKey) {
            fetchRecipes();
        }
    }, [categoryKey]);
    console.log(categoryKey);

        return (
            <div className="flex flex-col bg-white min-h-screen">
                <PageHeader
                    title={RECIPE_CATEGORIES_LABELS[categoryKey]}
                    description={"Confira as receitas disponíveis"}
                />

                {
                    (!categoryKey || !recipes) ? (
                        <p className="p-6"> Não foi possível encontrar receitas nessa categoria.</p>
                    ) : (
                        <div className="flex flex-col gap-4 p-6 fade">
                            <SearchBar
                                placeholder="Buscar receita..."
                                value={busca}
                                onChange={setBusca}
                            />
                            <div className="flex flex-col gap-4 pb-10">
                                {recipes.map((r) => (
                                    <Card
                                        key={r.id}
                                        onClick={() => navigate(`/recipes/${categoryKey}/${r.id}`)}
                                        className="flex gap-4 bg-[#e6e6e6] p-3 rounded-xl shadow-md cursor-pointer"
                                    >
                                        <div className="flex flex-col justify-between flex-1">
                                            <h2 className="text-md font-bold text-[#1f3d2b]">{r.title}</h2>
                                            <div className="flex items-center text-sm text-gray-600 gap-4">
                                                <span className="flex items-center gap-1">
                                                    <Clock size={14} /> {r.prep_time}
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <BarChart size={14} /> {r.difficulty}
                                                </span>
                                            </div>
                                            <p className="text-xs text-gray-600">{RECIPE_CATEGORIES_LABELS[categoryKey]}</p>
                                            <div className="flex gap-1 mt-1">
                                                {Array.from({ length: 5 }).map((_, i) => (
                                                    <Star
                                                        key={i}
                                                        size={14}
                                                        className={i < r.rating ? "fill-yellow-400 stroke-yellow-400" : "text-gray-300"}
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    )
                }

               
            </div>
        );
}
