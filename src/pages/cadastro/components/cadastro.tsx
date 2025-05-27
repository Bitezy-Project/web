import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { API_BASE_URL } from "@/constants/config";
import { useAuth } from "@clerk/clerk-react";
import { set } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export function Register() {
  const [idade, setIdade] = useState("");
  const [tipoRestricao, setTipoRestricao] = useState("");
  const [tempoRestricao, setTempoRestricao] = useState("");
  const [outrasRestricoes, setOutrasRestricoes] = useState<string[]>([]);
  const [almoco, setAlmoco] = useState("");
  const [userExists, setUserExists] = useState(false);
  const navigate = useNavigate();


  const {getToken} = useAuth();
  


  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    if (checked) {
      setOutrasRestricoes([...outrasRestricoes, value]);
    } else {
      setOutrasRestricoes(outrasRestricoes.filter((item) => item !== value));
    }
  };
  async function fecthUser() {
    try{
      const token = await getToken();
      const res = await fetch(`${API_BASE_URL}/user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });
      if (!res.ok) {
          throw new Error("Erro ao buscar usuário");
      }
      const data = await res.json();
      setUserExists(data.filled_form);
      console.log("Usuário encontrado:", data.filled_form);
    }
    catch (error) {
      console.error("Erro ao buscar usuário:", error);
    }
  }

  async function RegisterUser() {
    try {
      const token = await getToken();
      if (!token) {
        console.error("Token não disponível");
        return;
      }
      console.log("Token obtido:", token);
      const res = await fetch(`${API_BASE_URL}/user/form`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          form: [
            { question: "idade", answer: idade },
            { question: "tipo_restricao", answer: tipoRestricao },
            { question: "tempo_restricao", answer: tempoRestricao },
            { question: "outras_restricoes", answer: outrasRestricoes.join(", ") },
            { question: "almoco", answer: almoco },
          ],
        }),
      });

      if (!res.ok) {
        throw new Error("Erro ao cadastrar usuário");
      }

      const data = await res.json();
      console.log("Usuário cadastrado com sucesso:", data);
      navigate(-1);
    
    } catch (error) {
      console.error("Erro ao cadastrar usuário:", error);
    }
    }

  useEffect(() => {
    
  fecthUser();

  }
  , []);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Aqui você pode processar os dados
    console.log({
      idade,
      tipoRestricao,
      tempoRestricao,
      outrasRestricoes,
      almoco,
    });
    RegisterUser();
  };

  return !userExists ? (
    <div className="min-h-screen flex items-center justify-center bg-[#9BA77B]">
      <div className="w-full max-w-sm p-6 bg-white/10 backdrop-blur-md rounded-lg shadow-lg text-white">
        <h1 className="text-3xl font-bold text-center mb-6">Cadastro de Restrição</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="number"
            className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-white/70 backdrop-blur-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#355E46]"
            value={idade}
            onChange={(e) => setIdade(e.target.value)}
            placeholder="Digite sua idade"
            required
          />



        <div>
          <label className="block text-sm">Tipo de restrição ao glúten</label>
          <select
            className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-white/70 backdrop-blur-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#355E46]"
            value={tipoRestricao}
            onChange={(e) => setTipoRestricao(e.target.value)}
            required
          >
            <option value="">Selecione...</option>
            <option value="celiaco">Doença Celíaca</option>
            <option value="alergia">Alergia ao Glúten</option>
            <option value="sensibilidade">Sensibilidade ao Glúten</option>
            <option value="outros">Outros</option>
          </select>
        </div>

          <div>
            <label className="block text-sm">Quando você descobriu sua restrição?</label>
            <select
              className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-white/70 backdrop-blur-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#355E46]"
              value={tempoRestricao}
              onChange={(e) => setTempoRestricao(e.target.value)}
              required
            >
              <option value="">Selecione...</option>
              <option value="1ano">Menos de 1 ano atrás</option>
              <option value="1-5anos">De 1 a 5 anos atrás</option>
              <option value="+5anos">A mais de 5 anos atrás</option>
              <option value="outros">Outros</option>
            </select>
          </div>

          <div>
            <label className="block text-sm">Outras restrições</label>
            <div className="space-y-1 text-black">
              {["Vegano", "Vegetariano", "Intolerante à lactose", "Diabético"].map((item) => (
                <div key={item}>
                  <label className="inline-flex items-center space-x-2">
                    <input
                      type="checkbox"
                      value={item}
                      checked={outrasRestricoes.includes(item)}
                      onChange={handleCheckboxChange}
                      className="form-checkbox h-4 w-4 text-[#355E46] bg-white border-gray-300 rounded focus:ring-[#355E46]"
                    />
                    <span className="text-gray-700">{item}</span>
                  </label>

                </div>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm">O que almoça normalmente?</label>
            <input
              type="text"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-white/70 backdrop-blur-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#355E46]"
              value={almoco}
              onChange={(e) => setAlmoco(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#355E46] text-white py-2 rounded hover:bg-[#2e523e]"
          >
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  ) :
  (
    <div className="min-h-screen flex items-center justify-center bg-[#9BA77B]">
      <div className="w-full max-w-sm p-6 bg-white/10 backdrop-blur-md rounded-lg shadow-lg text-white">
        <h1 className="text-3xl font-bold text-center mb-6">Cadastro de Restrição</h1>
        <p className="text-center text-lg">Você já completou o cadastro.</p>
        <button
          onClick={() => navigate(-1)}
          className="fade gap-0.5 mb-auto w-fit flex items-center mx-auto text-primary-foreground/70 mt-6 text-sm font-medium hover:text-primary-foreground hover:opacity-100 transition-all hover:bg-white/20 bg-white/10 px-4 py-2 rounded-lg"
        >
          Voltar para a página anterior
        </button>
      </div>
    </div>
  );
}


