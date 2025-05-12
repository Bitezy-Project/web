import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";
import { Card } from "@/components/ui/card";
import { SearchBar } from "@/components/ui/search-bar";

import pinVerde from "@/assets/pinIcon.png";

const markerIcon = new Icon({
    iconUrl: pinVerde,
    iconSize: [32, 32], 
    iconAnchor: [16, 32]
});

const locaisMock = [
    { nome: "Restaurante Sem Glúten", lat: -23.561414, lng: -46.655881 },
    { nome: "Padaria Natural", lat: -23.564023, lng: -46.652908 },
    { nome: "Café Saudável", lat: -23.562222, lng: -46.658201 },
];

export function Locations() {
    return (
        <div className="flex flex-col bg-white min-h-screen">
            <SearchBar placeholder="Digite aqui..." />

            <div className="p-6">
                <MapContainer
                    center={[-23.561414, -46.655881]}
                    zoom={15}
                    style={{ height: "300px", width: "100%", borderRadius: "12px" }}
                >
                    <TileLayer
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {locaisMock.map((local, idx) => (
                        <Marker key={idx} position={[local.lat, local.lng]} icon={markerIcon}>
                            <Popup>{local.nome}</Popup>
                        </Marker>
                    ))}
                </MapContainer>
            </div>

            <Card className="bg-[#e6e6e6] m-8 text-[#1f3d2b] text-center font-semibold">
                Pesquise por nome de locais, regiões, tipo de restaurantes, etc.
            </Card>
        </div>
    );
}
