import { useState } from "react";
import { Link } from "react-router-dom";

export default function Login() {
  const [user, setUser] = useState("");
  const [senha, setSenha] = useState("");

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Lógica de autenticação aqui
    console.log(user, senha);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#9BA77B]">
      <div className="w-full max-w-sm p-6 bg-white/10 backdrop-blur-md rounded-lg shadow-lg text-white">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold mt-2">GlutEase</h1>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm">E-mail</label>
            <input
              type="username"
              className="w-full px-4 py-2 rounded border text-black"
              value={user}
              onChange={(e) => setUser(e.target.value)}
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
          <button
            type="submit"
            className="w-full bg-[#355E46] text-white py-2 rounded hover:bg-[#2e523e]"
          >
            Entrar
          </button>
        </form>

        <p className="text-sm text-center mt-4">
          Não tem uma conta?{" "}
          <Link to="/login/register" className="text-blue-100 underline">
            Cadastre-se
          </Link>
        </p>
      </div>
    </div>
  );
}
