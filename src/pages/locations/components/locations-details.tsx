import { useNavigate, useParams } from "react-router-dom";
import { Star } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { Card } from "@/components/ui/card";
import { Icon } from "leaflet";
import pinVerde from "@/assets/pinIcon.png";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

// Mock simulado
const localMock = {
  id: 1,
  nome: "Sorveteria da Maria",
  descricao: "Sorveteria com diversas opções sem glúten. Também servem bolos e tortas",
  nota: 4,
  endereco: "Rua Quata, 200 - Moema",
  local: { nome: "Restaurante Sem Glúten", lat: -23.561414, lng: -46.655881 },
};
const markerIcon = new Icon({
    iconUrl: pinVerde,
    iconSize: [32, 32], 
    iconAnchor: [16, 32]
});


const feedbacks = [
  {
    nome: "Anônimo",
    nota: 4,
    comentario: "Achei que tinha poucas opções de sorvete sem glúten. Atendimento muito bom.",
  },
  {
    nome: "Anônimo",
    nota: 3,
    comentario: "Achei que tinha poucas opções de sorvete sem glúten. Atendimento muito bom.",
  },
];

export function LocationsDetails() {
  const { id } = useParams();

  console.log("ID do local:", id);

  const local = localMock;

  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen bg-white">
      
        <PageHeader
            title={"Detalhes do " + local.nome}
            className="pb-3"
            description={"Veja mais informações sobre o" + local.nome}
        />

      {/* Card principal */}
      <div className="p-4">
        <Card className="p-4 shadow-md rounded-xl bg-white text-[#1f3d2b]">
          <h2 className="font-bold text-lg">{local.nome}</h2>

          <div className="flex gap-1 mt-1 mb-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                size={16}
                className={
                  i < local.nota
                    ? "fill-yellow-400 stroke-yellow-400"
                    : "text-gray-300"
                }
              />
            ))}
          </div>

          <p className="text-sm mb-4">{local.descricao}</p>
          <p className="text-sm font-semibold mb-1">{local.endereco}</p>
            <MapContainer
                center={[-23.561414, -46.655881]}
                zoom={15}
                style={{ height: "300px", width: "100%", borderRadius: "12px" }}
            >
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker key={local.id} position={[local.local.lat, local.local.lng]} icon={markerIcon}>
                    <Popup>{local.nome}</Popup>
                </Marker>
               
            </MapContainer>
        </Card>
      </div>

      {/* Seção de feedbacks */}
      <div className="px-4">
        <h2 className="font-bold text-[#1f3d2b] mb-2">Feedbacks</h2>

        <button
          onClick={() =>
            navigate(`feedbacks/create`, { relative: "path" })
          }
          className="bg-[#9DA87F] text-white font-semibold px-4 py-2 rounded-md mb-4"
        >
          Adicionar seu FeedBack
        </button>

        <div className="flex flex-col gap-3 pb-20">
          {feedbacks.map((fb, i) => (
            <Card key={i} className="p-4 rounded-xl shadow-sm bg-white text-sm">
              <p className="font-semibold text-[#1f3d2b] mb-1">{fb.nome}</p>
              <div className="flex gap-1 mb-2">
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
              <p className="text-gray-700">{fb.comentario}</p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
