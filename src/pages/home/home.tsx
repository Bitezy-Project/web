import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { SearchBar } from "@/components/ui/search-bar";

import { MdRestaurantMenu, MdShoppingCart } from "react-icons/md";
import { IoLocation } from "react-icons/io5";
import { FaBook } from "react-icons/fa";
import { CardButton } from "@/components/ui/card-button";
import { PAGES_PATH } from "@/constants/pages";
import { PageHeader } from "@/components/ui/page-header";

export function Home() {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col bg-white min-h-screen">
            <PageHeader 
                title="Olá!"
                description="O que você quer comer hoje?"
                returnButton={false}
            />

            <div className="flex flex-col gap-4 p-6 fade">
                <SearchBar placeholder="Pesquise algum tópico" />

                <div className="grid grid-cols-2 gap-2">
                    <CardButton
                        icon={<MdRestaurantMenu size={28} color="#1f3d2b" />}
                        label="Receitas Seguras"
                        onClick={() => navigate(PAGES_PATH.RECIPES)}
                    />
                    <CardButton
                        icon={<MdShoppingCart size={28} color="#1f3d2b" />}
                        label="Sugestão de Produtos"
                        onClick={() => navigate(PAGES_PATH.PRODUCTS)}
                    />
                    <CardButton
                        icon={<IoLocation size={28} color="#1f3d2b" />}
                        label="Locais Confiáveis"
                        onClick={() => navigate(PAGES_PATH.LOCATIONS)}
                    />
                    <CardButton
                        icon={<FaBook size={28} color="#1f3d2b" />}
                        label="Informações Educacionais"
                        onClick={() => navigate(PAGES_PATH.EDUCATIONAL)}
                    />
                </div>
            </div>
            
        </div>
    );
}

