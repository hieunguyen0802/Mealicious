import { Children, createContext, PropsWithChildren, useState, useEffect, useContext } from "react"
import { supabase } from "../lib/supabase";
import { Session } from "@supabase/supabase-js";


type AuthData = {
    session: Session | null,
    loading: boolean,
}

export const AuthContext = createContext<AuthData>({
    session: null,
    loading: true
});

const AuthProvider = ({children}:PropsWithChildren) => {

    const [session, setSession] = useState<Session | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getSession = async () => {
            const {data, error} = await supabase.auth.getSession();
            setSession(data.session);
            setLoading(false);
        }

        getSession();


    },[]);

    return (
        <AuthContext.Provider value={{session, loading}}>
            {children}
        </AuthContext.Provider>
    )
}


export default AuthProvider;


export const useAuth = () => useContext(AuthContext);
