import { CardButton } from "@/components/ui/card-button";
import { PageHeader } from "@/components/ui/page-header";
import { SearchBar } from "@/components/ui/search-bar";
import { useNavigate } from "react-router-dom";
import { RECIPE_CATEGORIES } from "../constants/categories";
import { useState } from "react";
import { API_BASE_URL } from "@/constants/config";
import { set } from "react-hook-form";

export function RecipesCategories() {
    const navigate = useNavigate();
    const [busca, setBusca] = useState("");
    const [erroBusca, setErroBusca] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSearch = async () => {
    try {
        setLoading(true);
        const response = await fetch(`${API_BASE_URL}/receitas`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ prompt: busca }),
        });
        setLoading(false);
        if (!response.ok) {
            throw new Error(`Erro: ${response.status}`);

        }

        const data = await response.json();
        console.log("Resultado da busca:", data);


        setErroBusca(false);  // limpa erro, se tinha
        navigate('/recipes/details', { state: { recipe: data } }); // exemplo usando a primeira
        } catch (error) {
            setLoading(false);
            setErroBusca(true);
            console.error("Erro ao buscar receitas:", error);

        }
    };


    return (
        <div className="flex flex-col bg-white min-h-screen">
            <PageHeader
                title="Categorias"
                description={"Escolha uma categoria para ver as receitas"}
            />

            <div className="flex flex-col gap-4 p-6 fade">
                <SearchBar
                    placeholder="O que você quer comer?"
                    value={busca}
                    onChange={setBusca}
                    onEnterPress={handleSearch}
                />
                {erroBusca && (
                    <p className="text-red-500 text-sm">Não foi possível realizar sua busca de receitas. Tente buscar outra receita.</p>
                )
                }
                {loading && (
                    <p className="text-gray-500 text-sm">Buscando receitas...</p>
                )}
                <div className="grid grid-cols-2 gap-2">
                    <CardButton className="py-2" label="Café da Manhã" onClick={() => navigate("/recipes/" + RECIPE_CATEGORIES.BREAKFAST)} />
                    <CardButton className="py-2" label="Almoço" onClick={() => navigate("/recipes/" + RECIPE_CATEGORIES.LUNCH)} />
                    <CardButton className="py-2" label="Jantar" onClick={() => navigate("/recipes/" + RECIPE_CATEGORIES.DINNER)} />
                    <CardButton className="py-2" label="Snacks" onClick={() => navigate("/recipes/" + RECIPE_CATEGORIES.SNACKS)} />
                    <CardButton className="col-span-2 py-2" label="Ver todos" onClick={() => navigate("/recipes/" + RECIPE_CATEGORIES.ALL)} />
                </div>
            </div>
        </div>
    )
}
