import { useForm } from "react-hook-form";
import { z } from "zod";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import GOOGLE_LOGO from "@/assets/google-logo.svg"
import { useEffect, useState } from "react";
import { supabase } from "@/services/supabase/supabase";
import { useUser } from "@/hooks/use-user";
import { toast } from "sonner";


export function Login() {
    const [ email, setEmail ] = useState("")
    const [ password, setPassword ] = useState("")
    const { session } = useUser()
    const [ loading, setLoading ] = useState(false)

    const signInWithEmailPwd = async () => {
        setLoading(true)
        const { data, error } = await supabase.auth.signUp({
            email,
            password
        })
        setLoading(false)
        
        if (error?.status ?? 0 >= 400) {
            toast.error("Requisição inválida. Verifique os dados fornecidos.");
            return;
        }
    }

    useEffect(() => {
        console.log(session)
    }, [session])

    return (
        <div className="flex flex-col items-center justify-center gap-6 h-full bg-muted">
            <Card className="overflow-hidden w-full max-w-[26rem] bg-primary">
                <CardContent className="flex flex-col gap-6 p-6">
                    <div className="flex flex-col">
                        <h1 className="text-2xl font-semibold">Login</h1>
                        <p className="text-balance text-sm opacity-40">
                            Entre na sua conta para acessar seus recursos.
                        </p>
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" placeholder="m@example.com" value={email} onChange={(ev) => setEmail(ev.currentTarget.value)} />
                    </div>
                    <div className="grid gap-2">
                        <div className="flex items-center">
                            <Label htmlFor="password">Senha</Label>
                            <a href="#" className="ml-auto text-sm underline-offset-2 hover:underline opacity-50">Esqueceu sua senha?</a>
                        </div>
                        <Input id="password" type="password" placeholder="Senha..." value={password} onChange={(ev) => setPassword(ev.currentTarget.value)}  />
                    </div>
                    
                    <Button type="submit" className="w-full" onClick={() => signInWithEmailPwd()} loading={loading}>Entrar</Button>

                    <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                        <span className="relative z-10 bg-background px-2 text-muted-foreground">Ou continue com</span>
                    </div>

                    <Button variant="outline" className="w-full gap-2" loading={loading}>
                        <img src={GOOGLE_LOGO} className="h-4" alt="" />
                        <span className="">Entrar com Google</span>
                    </Button>

                    <div className="text-center text-sm">
                        Não tem uma conta?{" "}
                        <a href="#" className="underline underline-offset-4"> Cadastre-se</a>
                    </div>
                </CardContent>
            </Card>
            <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
                Ao prosseguir, você concorda com nossos <a href="#">Termos de Serviço</a>
            </div>
        </div>
    )
}