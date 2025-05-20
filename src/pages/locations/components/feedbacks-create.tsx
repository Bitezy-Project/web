import { useSearchParams, useNavigate, useParams} from "react-router-dom";
import { useState } from "react";
import { Star } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";


export function FeedbackCreate() {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  const pathParams = useParams()
  const recipeId = pathParams.localId as string;

  const localMock = {
  id: 1,
  nome: "Sorveteria da Maria",
  descricao: "Sorveteria com diversas opções sem glúten. Também servem bolos e tortas",
  nota: 4,
  endereco: "Rua Quata, 200 - Moema",
  local: { nome: "Restaurante Sem Glúten", lat: -23.561414, lng: -46.655881 },
};
  const local = localMock
  


  const [nota, setNota] = useState(0);
  const [comentario, setComentario] = useState("");
  const [anonimo, setAnonimo] = useState(false);

  console.log("entrei")
  const handleSubmit = () => {
    // Simulação do envio
    alert(`Feedback enviado!\nNota: ${nota}\nComentário: ${comentario}`);
    navigate(-1); // volta para a tela anterior
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <PageHeader
        title={`Feedback ${local.nome}`}
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
