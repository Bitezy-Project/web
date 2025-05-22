import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";
import { Card } from "@/components/ui/card";
import { SearchBar } from "@/components/ui/search-bar";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import pinVerde from "@/assets/pinIcon.png";
import { PageHeader } from "@/components/ui/page-header";
import { API_BASE_URL } from "@/constants/config";
import { Location } from "../@types/location";
import { set } from "react-hook-form";
import { Star } from "lucide-react";

const markerIcon = new Icon({
    iconUrl: pinVerde,
    iconSize: [32, 32], 
    iconAnchor: [16, 32]
});

// Componente auxiliar para recentralizar o mapa
function MapCenterUpdater({ center }: { center: [number, number] }) {
    const map = useMap();

    useEffect(() => {
        if (center[0] !== 0 && center[1] !== 0) {
            map.setView(center);
        }
    }, [center, map]);

    return null;
}

export function LocationsMap() {

    const navigate = useNavigate();
    const [busca, setBusca] = useState("");
    const [loading, setLoading] = useState(true);
    const [erro, setErro] = useState(false);
    const [center, setCenter] = useState<[number, number]>([0,0]); // Coordenadas iniciais
    const [locais, setLocais] = useState<Location[]>([]); // Defina o tipo correto para os locais
    const [userLocation, setUserLocation] = useState<[number, number] | null>(null);

    useEffect(() => {
        // Obter localização do usuário
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setUserLocation([latitude, longitude]);
                    setCenter([latitude, longitude]); // Atualiza o centro do mapa com a localização do usuário
                },
                (error) => {
                    console.warn("Erro ao obter localização:", error);
                }
            );
        }
    }, []);

    useEffect(() => {
        async function fetchMap() {
            if (center[0] === 0 && center[1] === 0) return; // Evita requisição inválida
            setLoading(true);
            setErro(false);
            try {
                const res = await fetch(`${API_BASE_URL}/places/?lat=${center[0]}&lng=${center[1]}`);
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
    }, [center]);

   

    const handleEnterSearch = () => {
        if (busca.trim()) {
            navigate(`/locations/${busca.toLowerCase()}/${center}`);
        }
    };

    return (
        <div className="flex flex-col bg-white min-h-screen">
            <PageHeader
                title="Localizações"
                description="Encontre os melhores locais para visitar."
            />
            <div className="flex flex-col gap-4 p-6 fade">
                <SearchBar
                    placeholder="Digite aqui..."
                    value={busca}
                    onChange={setBusca}
                    onEnterPress={handleEnterSearch}
                />

                <MapContainer
                    center={center}
                    zoom={15}
                    style={{ height: "300px", width: "100%", borderRadius: "12px" }}
                >
                    <TileLayer
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <MapCenterUpdater center={center} />

                    {locais.map((local, idx) => (
                        <Marker key={idx} position={[local.location.lat, local.location.lng]} icon={markerIcon}>
                            <Popup>
                                <div 
                                    className="font-bold mb-1 text-[#1f3d2b] cursor-pointer hover:underline"
                                    onClick={
                                        
                                        () => navigate(`${local.place_id}`)}
                                >
                                    {local.name}
                                </div>
                                <div className="flex gap-1 mb-1">
                                    {Array.from({ length: 5 }).map((_, i) => (
                                        <Star
                                            key={i}
                                            size={14}
                                            className={
                                                i < local.rating
                                                    ? "fill-yellow-400 stroke-yellow-400"
                                                    : "text-gray-300"
                                            }
                                        />
                                    ))}
                                </div>
                                <p className="text-sm text-gray-700">{local.description}</p>
                            </Popup>
                        </Marker>
                    ))}
                </MapContainer>

                <Card className="bg-[#e6e6e6] mt-2 p-4 py-3 text-[#1f3d2b] text-center font-semibold">
                    Pesquise por nome de locais, regiões, tipo de restaurantes, etc.
                </Card>
            </div>
        </div>
    );
}
