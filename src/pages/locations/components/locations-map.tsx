import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
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

const markerIcon = new Icon({
    iconUrl: pinVerde,
    iconSize: [32, 32], 
    iconAnchor: [16, 32]
});




export function LocationsMap() {

    const navigate = useNavigate();
    const [busca, setBusca] = useState("");
    const [loading, setLoading] = useState(true);
    const [erro, setErro] = useState(false);
    const [locais, setLocais] = useState<Location[]>([]); // Defina o tipo correto para os locais

    useEffect(() => {
        async function fetchMap() {
            setLoading(true);
            setErro(false);
            try {
                let res;
                res = await fetch(`${API_BASE_URL}/places`);
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
        
    }, []);

    console.log(locais);

    const handleEnterSearch = () => {
    if (busca.trim()) {
        navigate(`/locations/${busca.toLowerCase()}`);
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
                    center={[-23.561414, -46.655881]}
                    zoom={15}
                    style={{ height: "300px", width: "100%", borderRadius: "12px" }}
                >
                    <TileLayer
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {locais.map((local, idx) => (
                        <Marker key={idx} position={[local.location.lat, local.location.lng]} icon={markerIcon}>
                            <Popup>{local.name}</Popup>
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
