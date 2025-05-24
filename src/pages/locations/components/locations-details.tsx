import { useNavigate, useParams } from "react-router-dom";
import { Star } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { Card } from "@/components/ui/card";
import { Icon } from "leaflet";
import pinVerde from "@/assets/pinIcon.png";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import { API_BASE_URL } from "@/constants/config";
import { Feedback, Location } from "../@types/location";

const markerIcon = new Icon({
    iconUrl: pinVerde,
    iconSize: [32, 32], 
    iconAnchor: [16, 32]
});

export function LocationsDetails() {
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(false);
  const [local, setLocal] = useState<Location | null>(null);
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);


  const navigate = useNavigate();

  useEffect(() => {
    async function fetchMap() {
      setLoading(true);
      setErro(false);
      try {
        const res = await fetch(`${API_BASE_URL}/places/${id}`, { method: "GET" });
        if (!res.ok) throw new Error("Erro ao buscar local");
        const data = await res.json();
        setLocal(data);
        console.log(data);
        setFeedbacks(data.reviews);
      } catch (err) {
        console.error(err);
        setErro(true);
      } finally {
        setLoading(false);
      }
    }

    fetchMap();
  }, [id]);

  if (!local) return <div className="p-4">Carregando...</div>;

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <PageHeader
        title={`${local.name}`}
        className="pb-3"
        description={`Veja mais informações sobre o ${local.name}`}
      />

      <div className="p-4">
        <Card className="p-4 shadow-md rounded-xl bg-white text-[#1f3d2b]">
          <h2 className="font-bold text-lg">{local.name}</h2>

          <div className="flex gap-1 mt-1 mb-2">
            {local.media === 0 ? (
              <p className="text-sm text-gray-500">Nenhuma avaliação ainda.</p>
            ) : (
              Array.from({ length: 5 }).map((_, i) => (
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

          <p className="text-sm mb-4">{local.description}</p>
          <p className="text-sm font-semibold mb-1">{local.adress}</p>

          <MapContainer
            center={[local.location.lat, local.location.lng]}
            zoom={15}
            style={{ height: "300px", width: "100%", borderRadius: "12px" }}
          >
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker key={local.place_id} position={[local.location.lat, local.location.lng]} icon={markerIcon}>
              <Popup>{local.name}</Popup>
            </Marker>
          </MapContainer>
        </Card>
      </div>

      <div className="px-4">
        <h2 className="font-bold text-[#1f3d2b] mb-2">Feedbacks</h2>

        <button
          onClick={() => navigate(`feedbacks/create`, { relative: "path" })}
          className="bg-[#9DA87F] text-white font-semibold px-4 py-2 rounded-md mb-4"
        >
          Adicionar seu Feedback
        </button>

        <div className="flex flex-col gap-3 pb-20">
          {feedbacks.length === 0 ? (
            <p className="text-center text-sm text-gray-500">
              Nenhum feedback ainda.
            </p>
          ) : (
            feedbacks.map((fb, i) => (
            <Card key={i} className="p-4 rounded-xl shadow-sm bg-white text-sm">
              <p className="font-semibold text-[#1f3d2b] mb-1">{fb.autor}</p>
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
                ))
              }
              </div>
              <p className="text-sm text-gray-700">{fb.comentario}</p>
              </Card>
          )
          ))}
        </div>
      </div>
    </div>
  );
}
