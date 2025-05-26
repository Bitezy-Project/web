import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { SearchBar } from "@/components/ui/search-bar";
import { CaretLeft } from "@phosphor-icons/react";
import { PageHeader } from "@/components/ui/page-header";
import { Topico } from "./@types/topico";
import { API_BASE_URL } from "@/constants/config";


export function Educational() {
    const [topicos, setTopicos] = useState<Topico[]>([]);
    const navigate = useNavigate();


    async function fecthInfo() {
        try {
            const response = await fetch(`${API_BASE_URL}/info`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (!response.ok) {
                throw new Error("Erro ao buscar tópicos educacionais");
            }
            const data = await response.json();
            setTopicos(data);
        } catch (error) {
            console.error("Erro ao buscar tópicos educacionais:", error);
            
        }
    }

    useEffect(() => {
        fecthInfo();
    }, []);

    return (
        <div className="flex flex-col bg-white min-h-screen">
            <PageHeader
                title="Educacional"
                description="Encontre os melhores locais para visitar."
            />
            <div className="flex flex-col gap-4 p-6 fade">
                <SearchBar placeholder="Pesquise algum tópico" />

                <div className="flex flex-col gap-4 pb-10">
                    {topicos.map((item) => (
                        <Card key={item.id} className="p-4 rounded-xl shadow-md">
                            <h2 className="text-base font-bold text-[#1f3d2b] mb-1">{item.titulo}</h2>
                            <p className="text-sm text-gray-700 mb-2 line-clamp-3">{item.conteudo}</p>
                        </Card>
                    ))}
                </div>
            </div>

        </div>
    );
}
