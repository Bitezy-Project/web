import { Input } from "./input";
import { Search } from "lucide-react";


type SearchBarProps = {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  onEnterPress?: () => void;
};

export function SearchBar({ placeholder, value, onChange, onEnterPress }: SearchBarProps) {
    return (
        <div className="flex items-center h-12 px-4 bg-[#e6e6e6] rounded-xl shadow-md">
            <Search className="text-gray-500" size={20} />
            <Input
                value={value}
                onChange={(e) => onChange?.(e.target.value)}
                onKeyDown={(e) => {
                if (e.key === "Enter") {
                    onEnterPress?.();
                }
                }}
                placeholder={placeholder}
                className="border-none bg-transparent text-black focus-visible:ring-0 h-full shadow-none"
            />
        </div>
    );

}
