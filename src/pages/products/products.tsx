import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { SearchBar } from "@/components/ui/search-bar";
import { CardButton } from "@/components/ui/card-button";
import { PageHeader } from "@/components/ui/page-header";


export function Products() {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col min-h-screen bg-white ">
            <PageHeader
                title="Sugestão de Produtos"
                description={"Aqui você encontra sugestões de produtos seguros para o seu consumo."}
            />

            <div className="flex flex-col gap-4 p-6 fade">
                <SearchBar placeholder="Pesquise algum tópico" />

                <div className="grid grid-cols-2 gap-2">
                    <CardButton className="py-2" label="Café da Manhã" onClick={() => navigate("/lista_produtos?categoria=cafe-da-manha")} />
                    <CardButton className="py-2" label="Almoço" onClick={() => navigate("/lista_produtos?categoria=almoco")} />
                    <CardButton className="py-2" label="Jantar" onClick={() => navigate("/lista_produtos?categoria=jantar")} />
                    <CardButton className="py-2" label="Snacks" onClick={() => navigate("/lista_produtos?categoria=snacks")} />
                    <CardButton className="col-span-2 py-2" label="Ver todos" onClick={() => navigate("/lista_produtos")} />
                </div>
            </div>
        </div>
    );
}

