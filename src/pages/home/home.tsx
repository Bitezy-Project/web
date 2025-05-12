import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { SearchBar } from "@/components/ui/searchBar";

import { MdRestaurantMenu, MdShoppingCart } from "react-icons/md";
import { IoLocation } from "react-icons/io5";
import { FaBook } from "react-icons/fa";

export function Home() {
  const navigate = useNavigate();

return (
  <div className="flex flex-col bg-white min-h-screen">
    {/* Cabeçalho */}
    <div className="bg-[#9DA87F] text-[#1f3d2b] px-8 pb-6 flex flex-col justify-end min-h-[40vh] sm:min-h-[40vh] md:min-h-[32vh]">
        <h1 className="text-3xl font-bold">Olá!</h1>
        <p className="text-md mt-2">O que você quer comer hoje?</p>
    </div>


    {/* Campo de busca */}
    <SearchBar placeholder="Pesquise algum tópico"/>

    {/* Botões principais */}
    <div className="grid grid-cols-2 gap-4 p-6">
      <CardButton
        icon={<MdRestaurantMenu size={28} color="#1f3d2b"/>}
        label="Receitas Seguras"
        onClick={() => navigate("/receitas")}
      />
      <CardButton
        icon={<MdShoppingCart size={28} color="#1f3d2b" />}
        label="Sugestão de Produtos"
        onClick={() => navigate("/produtos")}
      />
      <CardButton
        icon={<IoLocation size={28} color="#1f3d2b"/>}
        label="Locais Confiáveis"
        onClick={() => navigate("/locais")}
      />
      <CardButton
        icon={<FaBook size={28} color="#1f3d2b"/>}
        label="Informações Educacionais"
        onClick={() => navigate("/educacional")}
      />
    </div>
  </div>
);
}

function CardButton({
  icon,
  label,
  onClick
}: {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}) {
  return (
    <Card
      className="p-4 text-center hover:shadow-md cursor-pointer flex flex-col items-center justify-center"
      onClick={onClick}
    >
      <div className="text-primary mb-2">{icon}</div>
      <p className="font-medium">{label}</p>
    </Card>
  );
}
