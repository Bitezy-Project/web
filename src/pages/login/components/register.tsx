import { useState } from "react";
import { Link } from "react-router-dom";

export default function Register() {
  const [nome, setNome] = useState("");
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");

  const handleCadastro = (e: React.FormEvent<HTMLFormElement>) => {

    e.preventDefault();
    if (senha !== confirmarSenha) {
      alert("As senhas não coincidem.");
      return;
    }
    // Lógica de cadastro aqui
    console.log(nome, usuario, senha);
  };

  console.log("entrei")
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#9BA77B]">
      <div className="w-full max-w-sm p-6 bg-white/10 backdrop-blur-md rounded-lg shadow-lg text-white">
        <h1 className="text-3xl font-bold text-center mb-6">Criar Conta</h1>

        <form onSubmit={handleCadastro} className="space-y-4">
          <div>
            <label className="block text-sm">Nome</label>
            <input
              type="text"
              className="w-full px-4 py-2 rounded border text-black"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm">Usuário</label>
            <input
              type="text"
              className="w-full px-4 py-2 rounded border text-black"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm">Senha</label>
            <input
              type="password"
              className="w-full px-4 py-2 rounded border text-black"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm">Confirmar Senha</label>
            <input
              type="password"
              className="w-full px-4 py-2 rounded border text-black"
              value={confirmarSenha}
              onChange={(e) => setConfirmarSenha(e.target.value)}
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

        <p className="text-sm text-center mt-4">
          Já tem uma conta?{" "}
          <Link to="/login" className="text-blue-100 underline">
            Entrar
          </Link>
        </p>
      </div>
    </div>
  );
}
