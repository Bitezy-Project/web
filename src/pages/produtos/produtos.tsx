import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { SearchBar } from "@/components/ui/searchBar";
import { BotaoVoltar } from "@/components/ui/botaoVoltar";

export function Produtos() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen bg-white">
        {/* Cabeçalho */}
        <div className="bg-[#9DA87F] text-[#1f3d2b] px-8 pb-6 flex flex-col justify-end min-h-[35vh]">
            <BotaoVoltar  />
            <h1 className="text-3xl font-bold">Produtos</h1>
            <p className="text-md mt-2">Busque por categoria</p>
        </div>

        {/* Campo de busca */}
        <SearchBar placeholder="Pesquise algum tópico"/>

        {/* Botões de categoria */}
        <div className="grid grid-cols-2 gap-4 p-6">
            <CategoriaButton label="Café da Manhã" onClick={() => navigate("/lista_produtos?categoria=cafe-da-manha")} />
            <CategoriaButton label="Almoço" onClick={() => navigate("/lista_produtos?categoria=almoco")} />
            <CategoriaButton label="Jantar" onClick={() => navigate("/lista_produtos?categoria=jantar")} />
            <CategoriaButton label="Snacks" onClick={() => navigate("/lista_produtos?categoria=snacks")} />
            <CategoriaButton label="Ver todos" full onClick={() => navigate("/lista_produtos")} />
        </div>
    </div>
  );
}

function CategoriaButton({
  label,
  onClick,
  full = false
}: {
  label: string;
  onClick: () => void;
  full?: boolean;
}) {
  return (
    <Card
      className={`bg-[#e6e6e6] p-4 text-center font-medium cursor-pointer hover:shadow-md ${
        full ? "col-span-2" : ""
      }`}
      onClick={onClick}
    >
      {label}
    </Card>
  );
}
