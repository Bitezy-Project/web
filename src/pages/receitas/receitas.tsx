import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { SearchBar } from "@/components/ui/searchBar";
import { BotaoVoltar } from "@/components/ui/botaoVoltar";

export function Receitas() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Cabeçalho */}
      <div className="bg-[#9DA87F] text-[#1f3d2b] px-8 pb-6 flex flex-col justify-end min-h-[35vh]">
        <BotaoVoltar />
        <h1 className="text-3xl font-bold">Receitas</h1>
        <p className="text-md mt-2">Busque por categoria</p>
      </div>

      {/* Campo de busca */}
      <SearchBar placeholder="Pesquise algum tópico"/>

      {/* Botões de categoria */}
      <div className="grid grid-cols-2 gap-4 p-6">
        <CategoryButton label="Café da Manhã" onClick={() => navigate("/lista_receitas?categoria=cafe-da-manha")} />
        <CategoryButton label="Almoço" onClick={() => navigate("/lista_receitas?categoria=almoco")} />
        <CategoryButton label="Jantar" onClick={() => navigate("/lista_receitas?categoria=jantar")} />
        <CategoryButton label="Snacks" onClick={() => navigate("/lista_receitas?categoria=snacks")} />
        <CategoryButton label="Ver todos" full onClick={() => navigate("/lista_receitas")} />
      </div>
    </div>
  );
}

function CategoryButton({ label, onClick, full = false }: { label: string; onClick: () => void; full?: boolean }) {
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
