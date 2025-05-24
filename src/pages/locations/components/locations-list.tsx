import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { PageHeader } from "@/components/ui/page-header";
import { SearchBar } from "@/components/ui/search-bar";
import { Card } from "@/components/ui/card";
import { Star } from "lucide-react";
import { Location } from "../@types/location";
import { API_BASE_URL } from "@/constants/config";
import { useEffect } from "react";

// Substitua por seu JSON real depois


export function LocationsSearch() {
  const pathParams = useParams();
  const busca = pathParams.busca as string;
  const center = pathParams.center as string;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(false);
  const [locais, setLocais] = useState<Location[]>([]); // Defina o tipo correto para os locais


  useEffect(() => {
    async function fetchMap() {
        setLoading(true);
        setErro(false);
        try {
            let res;
            res = await fetch(`${API_BASE_URL}/places?name=${busca}&lat=${center?.split(",")[0]}&lng=${center?.split(",")[1]}`); 
            if (!res.ok) throw new Error("Erro ao buscar locais");
            const data = await res.json();
            setLocais(data);
        } catch (err) {
            console.error(err);
            setErro(true);
        } finally {
            setLoading(false);
        }
    }

    fetchMap();
    
  }, [busca]);

console.log(locais)
  return (
    <div className="flex flex-col bg-white min-h-screen">
      <PageHeader
        title="Locais Seguros"
        description={`Resultados para` + busca}
      />

      <div className="flex flex-col gap-4 p-6 fade">

        <div className="flex flex-col gap-4 pb-10">
          {locais.map((local) => (
            <Card
              key={local.place_id}
              className="p-4 rounded-xl shadow-md cursor-pointer bg-white border"
              onClick={() => {
                      navigate(`/locations/${local.place_id}`);
              }}
            >
              <h2 className="font-bold text-[#1f3d2b] mb-1">{local.name}</h2>
              <div className="flex gap-1 mb-1">
                {local.media === 0 ? (
                  <p className="text-sm text-gray-500">Nenhuma avaliação ainda.</p>
                ) : (Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className={
                      i < local.media
                        ? "fill-yellow-400 stroke-yellow-400"
                        : "text-gray-300"
                    }
                  />
                    ))
                )}
              </div>
              <p className="text-sm text-gray-700">{local.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
