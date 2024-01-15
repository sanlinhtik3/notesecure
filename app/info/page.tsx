"use client"

import { getAuth } from "firebase/auth";
import { useRouter } from "next/navigation"
import { app } from "../config";
import { useEffect } from "react";

export default function WithAuth({ children }: any) {
    const router = useRouter();
    const auth = getAuth(app);

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (!user) {
                router.push('/sign-in')
            }
        })
    }, [auth, router]);

    return (
        <>
            {children}
        </>
    )
}