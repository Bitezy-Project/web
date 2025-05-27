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
import { API_BASE_URL } from "@/constants/config";
import { useState } from "react";

export function Home() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [erroBusca, setErroBusca] = useState(false);

    const [busca, setBusca] = useState("");

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

        if (!response.ok) {
            throw new Error(`Erro: ${response.status}`);
            setLoading(false);
            setErroBusca(true);
        }
        setLoading(true);
        console.log(loading);
        setErroBusca(false);  // limpa erro, se tinha
        const data = await response.json();
        console.log("Resultado da busca:", data);

        
        navigate('/recipes/details', { state: { recipe: data } }); // exemplo usando a primeira
        } catch (error) {
            setErroBusca(true);
            setLoading(false);
            console.error("Erro ao buscar receitas:", error);
        }
    };

    return (
        <div className="flex flex-col bg-white min-h-screen">
            <PageHeader 
                title="Olá!"
                description="O que você quer comer hoje?"
                returnButton={false}
            />

            <div className="flex flex-col gap-4 p-6 fade">
                <SearchBar placeholder="O que você quer comer?"
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

