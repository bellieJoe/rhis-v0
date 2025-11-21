"use client";
import { isAuth } from "@/api/authApi";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";


export const AuthMiddleware = ({children} : any) => {
    const dispatch = useDispatch();
    const router = useRouter();
    const authStore = useSelector((state : any) => state.auth);

    useEffect(() => {
        // if(authStore.user?.id) return;
        (async () => {
            const _isAuth = await isAuth(dispatch);
            if(!_isAuth) router.push('/auth/login');
        })();
    }, []);

    return <>{children}</>;
}