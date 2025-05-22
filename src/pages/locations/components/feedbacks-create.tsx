import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { Star } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { API_BASE_URL } from "@/constants/config";
import { useUser } from "@clerk/clerk-react";


export function FeedbackCreate() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const [nota, setNota] = useState(0);
  const [comentario, setComentario] = useState("");
  const [anonimo, setAnonimo] = useState(false);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState<string | null>(null);
  const { user } = useUser();

  const handleSubmit = async () => {
    setLoading(true);
    setErro(null);

    try {
      const res = await fetch(`${API_BASE_URL}/places/${id}/review`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nota,
          comentario,
          autor: anonimo ? "Anônimo" : user?.fullName || "Usuário desconhecido"
        }),
      });

      if (!res.ok) {
        throw new Error("Erro ao enviar feedback");
      }

      const data = await res.json();
      console.log("Feedback enviado com sucesso:", data);
      alert("Feedback enviado com sucesso!");
      navigate(-1);
    } catch (error: any) {
      console.error("Erro ao enviar feedback:", error);
      setErro(error.message || "Erro desconhecido");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <PageHeader
        title={`Feedback para o Local`}
        className="pb-3"
        description={"Deixe sua avaliação e comentário"}
      />

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

        {erro && <p className="text-red-500 text-sm">{erro}</p>}

        <button
          className={`bg-[#9DA87F] text-white font-semibold py-2 rounded-md hover:bg-[#8a996f] transition ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Enviando..." : "Enviar Feedback"}
        </button>
      </div>
    </div>
  );
}
