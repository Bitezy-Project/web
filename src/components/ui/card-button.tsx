import { twMerge } from "tailwind-merge";
import { Card } from "./card";

export function CardButton({ icon, label, onClick, className }: { icon?: React.ReactNode; label: string; onClick: () => void, className?: string }) {
    return (
        <Card
            className={twMerge(["p-4 text-center hover:shadow-md cursor-pointer flex flex-col items-center justify-center w-full ", className])}
            onClick={onClick}
        >
            {
                icon && (
                    <div className="text-primary mb-2">{icon}</div>
                )
            }
            <p className="font-medium">{label}</p>
        </Card>
    );
}
