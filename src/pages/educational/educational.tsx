import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { SearchBar } from "@/components/ui/search-bar";
import mockInfo from "@/assets/educacional_json.json";
import { CaretLeft } from "@phosphor-icons/react";

type Topico = {
    id: number;
    titulo: string;
    conteudo: string;
};

export function Educational() {
    const [topicos, setTopicos] = useState<Topico[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        setTopicos(mockInfo);
    }, []);

    return (
        <div className="flex flex-col bg-white min-h-screen fade">
            <SearchBar placeholder="Pesquise algum tópico" />

            <div className="flex flex-col gap-4 px-6 pb-10">
                {topicos.map((item) => (
                    <Card key={item.id} className="p-4 rounded-xl shadow-md">
                        <h2 className="text-base font-bold text-[#1f3d2b] mb-1">{item.titulo}</h2>
                        <p className="text-sm text-gray-700 mb-2 line-clamp-3">{item.conteudo}</p>
                        <button
                            onClick={() => navigate(`/educacional/${item.id}`)}
                            className="text-sm text-blue-600 font-medium text-right w-full hover:underline"
                        >
                            Ver mais
                        </button>
                    </Card>
                ))}
            </div>
        </div>
    );
}
