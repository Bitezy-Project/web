import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { SearchBar } from "@/components/ui/searchBar";
import { Clock, BarChart, Star } from "lucide-react";

// Substitua com caminho real
import receitasMock from "@/assets/receitas_json.json";
import { BotaoVoltar } from "@/components/ui/botaoVoltar";

type Receita = {
  id: number;
  nome: string;
  imagem: string;
  tempo: string;
  dificuldade: string;
  categoria: string;
  avaliacao: number;
};

export function ListaReceitas() {
  const [receitas, setReceitas] = useState<Receita[]>([]);
  const [busca, setBusca] = useState("");
  const [params] = useSearchParams();
  const navigate = useNavigate();

  const categoria = params.get("categoria");

  useEffect(() => {
    const filtradas = categoria
      ? receitasMock.filter((r) => r.categoria === categoria)
      : receitasMock;
  
    setReceitas(filtradas);
  }, [categoria]);

  const receitasFiltradas = receitas.filter((r) =>
    r.nome.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <div className="flex flex-col bg-white min-h-screen">
      {/* Cabeçalho */}
      <div className="bg-[#9DA87F] text-[#1f3d2b] px-8 pb-6 flex flex-col justify-end min-h-[30vh]">
        <BotaoVoltar />
        <h1 className="text-3xl font-bold">Receitas</h1>
        <p className="text-sm mt-2 mb-2">Categoria: {categoria}</p>
      </div>

      {/* Barra de busca */}
      <SearchBar
        placeholder="Buscar receita..."
        value={busca}
        onChange={setBusca}
      />

      {/* Lista */}
      <div className="flex flex-col gap-4 px-6 pb-10">
        {receitasFiltradas.map((r) => (
          <Card
            key={r.id}
            onClick={() => navigate(`/detalhes_receita?id=${r.id}`)}
            className="flex gap-4 bg-[#e6e6e6] p-3 rounded-xl shadow-md cursor-pointer"
          >
            <img
              src={r.imagem}
              alt={r.nome}
              className="w-24 h-24 rounded-xl object-cover"
            />
            <div className="flex flex-col justify-between flex-1">
              <h2 className="text-md font-bold text-[#1f3d2b]">{r.nome}</h2>
              <div className="flex items-center text-sm text-gray-600 gap-4">
                <span className="flex items-center gap-1">
                  <Clock size={14} /> {r.tempo}
                </span>
                <span className="flex items-center gap-1">
                  <BarChart size={14} /> {r.dificuldade}
                </span>
              </div>
              <p className="text-xs text-gray-600">{r.categoria}</p>
              <div className="flex gap-1 mt-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    className={i < r.avaliacao ? "fill-yellow-400 stroke-yellow-400" : "text-gray-300"}
                  />
                ))}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
