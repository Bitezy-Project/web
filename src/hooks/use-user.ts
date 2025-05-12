import { supabase } from "@/services/supabase/supabase"
import { Session } from "@supabase/supabase-js"
import { useEffect, useState } from "react"

interface UseUserResponse {
    session: null | Session
}

export function useUser(): UseUserResponse {
    const [session, setSession] = useState<null | Session>(null)

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session)
        })
        
        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session)
        })
        
        return () => subscription.unsubscribe()
    }, [])

    return {
        session
    }
}