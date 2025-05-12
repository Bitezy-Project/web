import { useSearchParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Star } from "lucide-react";
import { BotaoVoltar } from "@/components/ui/botaoVoltar";

const feedbacks = [
    {
      id_receita: 1,
      nome: "Anônimo",
      nota: 4,
      comentario: "Achei que tinha poucas opções de sorvete sem glúten. Atendimento muito bom.",
    },
    {
      id_receita: 1,
      nome: "Anônimo",
      nota: 3,
      comentario: "Bom custo-benefício.",
    },
    {
      id_receita: 2,
      nome: "Anônimo",
      nota: 5,
      comentario: "Excelente opção para intolerantes!",
    },
  ];
  

export function FeedbacksReceitas() {
    const [params] = useSearchParams();
    const navigate = useNavigate();
  
    const nomeReceita = params.get("nome") ?? "Receita";
    const idReceita = Number(params.get("id")); // <- captura o ID da receita
  
    const feedbacksFiltrados = feedbacks.filter(fb => fb.id_receita === idReceita);
  
    return (
      <div className="flex flex-col min-h-screen bg-white">
        {/* Cabeçalho */}
        <div className="bg-[#9DA87F] text-[#1f3d2b] px-8 pb-6 flex flex-col justify-end min-h-[20vh]">
          <BotaoVoltar />
          <div>
            <h1 className="text-xl font-bold">Feedbacks</h1>
            <p className="text-sm">{nomeReceita}</p>
          </div>
        </div>
  
        {/* Botão adicionar */}
        <div className="p-4">
          <button
            onClick={() => alert("Função de adicionar ainda não implementada.")}
            className="bg-[#9DA87F] text-white font-semibold px-4 py-2 rounded-md hover:bg-[#8a996f] transition"
          >
            Adicionar seu Feedback
          </button>
        </div>
  
        {/* Lista */}
        <div className="px-4 pb-10 space-y-4">
          {feedbacksFiltrados.length === 0 ? (
            <p className="text-center text-sm text-gray-500">Nenhum feedback ainda.</p>
          ) : (
            feedbacksFiltrados.map((fb, i) => (
              <div key={i} className="bg-white border rounded-xl p-4 shadow-sm">
                <p className="font-bold text-[#1f3d2b]">{fb.nome}</p>
                <div className="flex gap-1 mt-1">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star
                      key={j}
                      size={14}
                      className={
                        j < fb.nota
                          ? "fill-yellow-400 stroke-yellow-400"
                          : "text-gray-300"
                      }
                    />
                  ))}
                </div>
                <p className="text-sm text-gray-700 mt-2">{fb.comentario}</p>
              </div>
            ))
          )}
        </div>

      </div>
    );
  }
  