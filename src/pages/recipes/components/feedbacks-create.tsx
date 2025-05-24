import { useSearchParams, useNavigate, useParams} from "react-router-dom";
import { useState } from "react";
import { Star } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import MOCKED_RECIPES from "@/assets/receitas.json";
import { TRecipe } from "../@types/recipe";
import { API_BASE_URL } from "@/constants/config";
import { useEffect } from "react";
import { useUser } from "@clerk/clerk-react";

export function FeedbackCreate() {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  const pathParams = useParams()
  const recipeId = pathParams.recipeId as string;
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(false);
  const [recipe, setRecipe] = useState<TRecipe | null>(null);
  const [nota, setNota] = useState(0);
  const [comentario, setComentario] = useState("");
  const [anonimo, setAnonimo] = useState(false);

  const { user } = useUser();
  

  useEffect(() => {
      async function fetchRecipe() {
          setLoading(true);
          setErro(false);
          try {
              let res;
              res = await fetch(`${API_BASE_URL}/receitas/${recipeId}`);
              if (!res.ok) throw new Error("Erro ao buscar receita");
              const data = await res.json();
              setRecipe(data);
          } catch (err) {
              console.error(err);
              setErro(true);
          } finally {
              setLoading(false);
          }
      }

      fetchRecipe();
      
  }, [recipeId]);


  const nomeReceita = recipe?.title;
  

  console.log("entrei")
  const handleSubmit = () => {
    if (nota === 0) {
      alert("Por favor, selecione uma nota.");
      return;
    }

    const feedback = {
      nota,
      comentario,
      autor: anonimo ? "Anônimo" : user?.fullName || "Usuário desconhecido",

    };

    fetch(`${API_BASE_URL}/receitas/${recipeId}/feedback`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(feedback),
    })
      .then((response) => {
        if (!response.ok) throw new Error("Erro ao enviar feedback");
        return response.json();
      })
      .then(() => {
        alert("Feedback enviado com sucesso!");
        navigate(-1);
      })
      .catch((error) => {
        console.error(error);
        alert("Erro ao enviar feedback");
      });

  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <PageHeader
        title={`Feedback ${nomeReceita}`}
        className="pb-3"
        description={"Deixe sua avaliação e comentário"}
    />

      {/* Conteúdo */}
      <div className="p-6 flex flex-col gap-6">
        <div>
          <label className="block font-semibold text-[#1f3d2b] mb-2">
            Avaliação
          </label>
          <div className="flex gap-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <button
                key={i}
                onClick={() => setNota(i + 1)}
                className="focus:outline-none"
              >
                <Star
                  size={28}
                  className={
                    i < nota
                      ? "fill-yellow-400 stroke-yellow-400"
                      : "text-gray-300"
                  }
                />
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block font-semibold text-[#1f3d2b] mb-2">
            Comentário
          </label>
          <textarea
            className="w-full border rounded-md p-2 text-sm focus:ring-2 focus:ring-[#9DA87F] focus:outline-none"
            rows={4}
            value={comentario}
            onChange={(e) => setComentario(e.target.value)}
            placeholder="Escreva aqui seu comentário..."
          />
        </div>

        <div className="flex items-center gap-2">
            <input
                id="anonimo"
                type="checkbox"
                checked={anonimo}
                onChange={() => setAnonimo(!anonimo)}
                className="w-4 h-4 text-[#9DA87F] border-gray-300 rounded focus:ring-[#9DA87F]"
            />
            <label htmlFor="anonimo" className="text-sm text-gray-700">
                Enviar como anônimo
            </label>
        </div>

        <button
          className="bg-[#9DA87F] text-white font-semibold py-2 rounded-md hover:bg-[#8a996f] transition"
          onClick={handleSubmit}
        >
          Enviar Feedback
        </button>
      </div>
    </div>
  );
}
