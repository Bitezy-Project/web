import { CardButton } from "@/components/ui/card-button";
import { PageHeader } from "@/components/ui/page-header";
import { SearchBar } from "@/components/ui/search-bar";
import { useNavigate } from "react-router-dom";
import { RECIPE_CATEGORIES } from "../constants/categories";

export function RecipesCategories() {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col  bg-white min-h-screen fade">
            <PageHeader
                title="Categorias"
                description={"Escolha uma categoria para ver as receitas"}
            />

            <div className="flex flex-col gap-4 p-6">
                <SearchBar placeholder="Pesquise algum tópico" />

                <div className="grid grid-cols-2 gap-2 ">
                    <CardButton className="py-2" label="Café da Manhã" onClick={() => navigate("/recipes/" + RECIPE_CATEGORIES.BREAKFAST)} />
                    <CardButton className="py-2" label="Almoço" onClick={() => navigate("/recipes/" + RECIPE_CATEGORIES.LUNCH)} />
                    <CardButton className="py-2" label="Jantar" onClick={() => navigate("/recipes/" + RECIPE_CATEGORIES.DINNER)} />
                    <CardButton className="py-2" label="Snacks" onClick={() => navigate("/recipes/" + RECIPE_CATEGORIES.SNACKS)} />
                </div>
            </div>
        </div>
    )
}