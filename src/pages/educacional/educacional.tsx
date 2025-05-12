import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { SearchBar } from "@/components/ui/searchBar";


// Substitua com caminho real se for importar de JSON
import mockInfo from "@/assets/educacional_json.json";
import { BotaoVoltar } from "@/components/ui/botaoVoltar";

type Topico = {
  id: number;
  titulo: string;
  conteudo: string;
};

export function Educacional() {
  const [topicos, setTopicos] = useState<Topico[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    setTopicos(mockInfo);
  }, []);

  return (
    <div className="flex flex-col bg-white min-h-screen">
        {/* Cabeçalho */}
        <div className="bg-[#9DA87F] text-[#1f3d2b] px-8 pb-6 flex flex-col justify-end min-h-[30vh]">
            <BotaoVoltar />
            <h1 className="text-2xl font-bold">Informações Educacionais</h1>
            <p className="text-sm mt-2 mb-2">Explore conteúdos úteis para sua alimentação</p>
        </div>

        {/* Campo de busca */}
        <SearchBar placeholder="Pesquise algum tópico" />


        {/* Lista de tópicos */}
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
