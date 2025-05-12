import { Input } from "./input";
import { Search } from "lucide-react";

type SearchBarProps = {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
};

export function SearchBar({ placeholder, value, onChange }: SearchBarProps) {
  return (
    <div className="flex items-center gap-2 mx-6 mb-3 mt-[10px] bg-[#e6e6e6] p-2 rounded-xl shadow-md">
      <Search className="text-gray-500" size={20} />
      <Input
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
        className="border-none bg-transparent text-black focus-visible:ring-0"
      />
    </div>
  );
  
}
