"use client"

import { useCompanyStore } from "@/store/company"
import { useTokenStore } from "@/store/token"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function Page () {
    const router = useRouter()
    const token = useTokenStore()
    const company = useCompanyStore()
    
    useEffect(() => {
        token.initializeToken()
        company.initializeCompany()
    }, [])

    useEffect(() => {
        setTimeout(()=> {
            router.refresh()
        }, 10000)
        if (token.token === null){
            router.push('/home')
        }else{
            router.push('/verification')
        }
    }, [token.token])

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-blue-600 to-indigo-900 text-white">
            <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin shadow-lg"></div>
            <p className="mt-6 text-xl font-semibold tracking-widest drop-shadow-lg">
                Carregando...
            </p>
        </div>
    )
}

