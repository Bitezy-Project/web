import { useSearchParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Clock, BarChart, Star } from "lucide-react";
import { BotaoVoltar } from "@/components/ui/botaoVoltar";

// simule o import real
import receitasMock from "@/assets/receitas_json.json";

type Receita = {
  id: number;
  nome: string;
  tempo: string;
  dificuldade: string;
  avaliacao: number;
  ingredientes: string[];
  modo_preparo: string;
};

export function DetalhesReceita() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const [receita, setReceita] = useState<Receita | null>(null);

  const id = Number(params.get("id"));

  useEffect(() => {
    const encontrada = receitasMock.find((r) => r.id === id);
    setReceita(encontrada || null);
  }, [id]);

  if (!receita) {
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <p className="text-gray-600">Receita não encontrada.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Cabeçalho */}
      <div className="bg-[#9DA87F] text-[#1f3d2b] px-6 py-6 flex flex-col gap-2">
        <BotaoVoltar />


        <h1 className="text-2xl font-bold">{receita.nome}</h1>

        <div className="flex justify-between items-center text-sm">
          <div className="flex gap-3 text-gray-800">
            <span className="flex items-center gap-1">
              <Clock size={16} /> {receita.tempo}
            </span>
            <span className="flex items-center gap-1">
              <BarChart size={16} /> {receita.dificuldade}
            </span>
          </div>

          <button
            className="bg-white text-[#1f3a2c] px-3 py-1 rounded-full text-xs font-semibold"
            onClick={() => navigate(`/receitas/feedback?id=${receita.id}&nome=${receita.nome}`)}

          >
            Ver Feedbacks
          </button>
        </div>

        <div className="flex gap-1 mt-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              size={16}
              className={
                i < receita.avaliacao
                  ? "fill-yellow-400 stroke-yellow-400"
                  : "text-gray-300"
              }
            />
          ))}
        </div>
      </div>

      {/* Conteúdo */}
      <div className="px-6 py-8 space-y-6">
        <div>
          <h2 className="font-bold text-[#1f3a2c] text-lg mb-2">Ingredientes</h2>
          <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
            {receita.ingredientes.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="font-bold text-[#1f3a2c] text-lg mb-2">Modo de Preparo</h2>
          <p className="text-sm text-gray-700 whitespace-pre-line">
            {receita.modo_preparo}
          </p>
        </div>
      </div>
    </div>
  );
}
