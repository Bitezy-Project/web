import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';

export function PageHeader({ title, description, returnButton = true, className }: { title: string; description: string; returnButton?: boolean, className?: string }) {
    const navigate = useNavigate()

    return (
        <div className={twMerge("bg-primary text-primary-foreground p-6 flex flex-col justify-end min-h-[40vh] sm:min-h-[40vh] md:min-h-[32vh]", className)}>
            <div className="absolute top-6 right-6 flex items-center gap-2">
                <SignedOut>
                    <SignInButton />
                </SignedOut>
                <SignedIn>
                    <UserButton />
                </SignedIn>
            </div>

            {
                returnButton && (
                    <button
                        onClick={() => navigate(-1)}
                        className="fade gap-0.5 mb-auto w-fit flex items-center text-primary-foreground/70 mt-2 text-sm font-medium hover:text-primary-foreground hover:opacity-100 transition-all hover:bg-white/20 bg-white/10 px-4 py-2 rounded-lg"
                    >
                        <ArrowLeft size={16} />
                        Voltar
                    </button>
                )
            }

            <h1 className="text-3xl font-bold">{title}</h1>
            <p className="opacity-80 leading-[1.25rem]">{description}</p>
        </div>
    )
}