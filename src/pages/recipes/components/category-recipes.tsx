import { useEffect, useState } from "react";
import { useSearchParams, useNavigate, useParams } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { SearchBar } from "@/components/ui/search-bar";
import { Clock, BarChart, Star } from "lucide-react";
import MOCKED_RECIPES from "@/assets/receitas.json";
import { PageHeader } from "@/components/ui/page-header";
import { RECIPE_CATEGORIES, RECIPE_CATEGORIES_LABELS } from "../constants/categories";
import { TRecipe } from "../@types/recipe";

export function CategoryRecipes() {
    const [busca, setBusca] = useState("");
    const pathParams = useParams();
    const categoryKey = pathParams.category as RECIPE_CATEGORIES;
    const navigate = useNavigate();

    const categoryRecipes = MOCKED_RECIPES[categoryKey as keyof typeof MOCKED_RECIPES] as TRecipe[];

    if (!categoryKey || !categoryRecipes)

        return (
            <div className="flex flex-col bg-white min-h-screen">
                <PageHeader
                    title={RECIPE_CATEGORIES_LABELS[categoryKey]}
                    description={"Confira as receitas disponíveis"}
                />

                {
                    (!categoryKey || !categoryRecipes) ? (
                        <p className="p-6"> Não foi possível encontrar receitas nessa categoria.</p>
                    ) : (
                        <div className="flex flex-col gap-4 p-6 fade">
                            <SearchBar
                                placeholder="Buscar receita..."
                                value={busca}
                                onChange={setBusca}
                            />
                            <div className="flex flex-col gap-4 pb-10">
                                {categoryRecipes.map((r) => (
                                    <Card
                                        key={r.id}
                                        onClick={() => navigate(`/recipes/${categoryKey}/${r.id}`)}
                                        className="flex gap-4 bg-[#e6e6e6] p-3 rounded-xl shadow-md cursor-pointer"
                                    >
                                        <img
                                            src={r.image}
                                            alt={r.name}
                                            className="w-24 h-24 rounded-xl object-cover"
                                        />
                                        <div className="flex flex-col justify-between flex-1">
                                            <h2 className="text-md font-bold text-[#1f3d2b]">{r.name}</h2>
                                            <div className="flex items-center text-sm text-gray-600 gap-4">
                                                <span className="flex items-center gap-1">
                                                    <Clock size={14} /> {r.time}
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
