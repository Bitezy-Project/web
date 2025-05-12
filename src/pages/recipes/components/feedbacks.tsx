import { useSearchParams, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { Star } from "lucide-react";

const feedbacks = [
    
    
];


export function RecipeFeedbacks() {
    const pathParams = useParams()
    const recipeId = pathParams.recipeId as string;

    const [feedbacks, setFeedback] = useState([
        {
            id: "1",
            nome: "Anônimo",
            rating: 4,
            comment: "Achei que tinha poucas opções de sorvete sem glúten. Atendimento muito bom.",
        },
        {
            id: "2",
            nome: "Anônimo",
            rating: 3,
            comment: "Bom custo-benefício.",
        }
    ])

    return (
        <div className="flex flex-col min-h-screen bg-white fade">
            <div className="p-4">
                <button
                    onClick={() => alert("Função de adicionar ainda não implementada.")}
                    className="bg-[#9DA87F] text-white font-semibold px-4 py-2 rounded-md hover:bg-[#8a996f] transition"
                >
                    Adicionar seu Feedback
                </button>
            </div>

            <div className="px-4 pb-10 space-y-4">
                {feedbacks.length === 0 ? (
                    <p className="text-center text-sm text-gray-500">Nenhum feedback ainda.</p>
                ) : (
                    feedbacks.map((fb, i) => (
                        <div key={i} className="bg-white border rounded-xl p-4 shadow-sm">
                            <p className="font-bold text-[#1f3d2b]">{fb.nome}</p>
                            <div className="flex gap-1 mt-1">
                                {Array.from({ length: 5 }).map((_, j) => (
                                    <Star
                                        key={j}
                                        size={14}
                                        className={
                                            j < fb.rating
                                                ? "fill-yellow-400 stroke-yellow-400"
                                                : "text-gray-300"
                                        }
                                    />
                                ))}
                            </div>
                            <p className="text-sm text-gray-700 mt-2">{fb.comment}</p>
                        </div>
                    ))
                )}
            </div>

        </div>
    );
}
