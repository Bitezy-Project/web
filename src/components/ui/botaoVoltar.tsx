import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

type BotaoVoltarProps = {
  className?: string;
  size?: number;
  color?: string;
};

export function BotaoVoltar({ className = "", size = 24, color = "#1f3d2b" }: BotaoVoltarProps) {
  const navigate = useNavigate();

  return (
    <div className={`inline-flex items-center ${className} mb-4`}>
      <button
        onClick={() => navigate(-1)}
        aria-label="Voltar"
        className="p-1 rounded-full hover:bg-gray-200 transition focus:outline-none"
        style={{ lineHeight: 0 }}
      >
        <ArrowLeft size={size} color={color} />
      </button>
    </div>
  );
}
