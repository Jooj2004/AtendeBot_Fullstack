"use client"

import { Button } from "@/components/ui/button"
import { sendEmail } from "@/services/auth"
import { useCompanyStore } from "@/store/company"
import { useTokenStore } from "@/store/token"
import { req } from "@/utils/axios"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

const Verification = () => {
    let Exec = false

    const router = useRouter()
    const token = useTokenStore()
    const company = useCompanyStore()

    const[error, setError] = useState<string>()

    useEffect(()=> {
        if(Exec) return
        Exec = true
        const run = async () => {
            if(token.token != null ){
                if(company.company?.verification === false){
                    const email = await sendEmail(company.company.id)
                    if(email != null || email != undefined){
                        const data = {
                            email: company.company.email,
                            idOTP: email,
                            companyId: company.company.id,
                        }
                        const objStr = encodeURIComponent(JSON.stringify(data))
                        router.push(`/verification/email?info=${objStr}`)
                        return
                    }
                }
                try{
                    const res = await req.get('/private',{
                    headers:{
                        Authorization: `Bearer ${token.token}`
                    }
                    })
                    if(res.data.error){
                        router.push('/auth/lognin')
                        return
                    } 
                    router.push('/deshboard') 
                }catch(err){
                    setError('Sua sessão foi encerrada por inatividade ou por motivos de segurança. Por favor, faça login novamente para continuar usando o sistema.')
                    localStorage.removeItem('token')
                    localStorage.removeItem('company')
                    company.clearCompany()
                    token.clearToken()
                    setTimeout(()=>{
                        router.push('/auth/lognin')
                    }, 2000)
                }
            }else{
                if(company.company?.verification === false){
                    const email = await sendEmail(company.company.id)
                    if(email != null || email != undefined){
                        const data = {
                            email: company.company.email,
                            idOTP: email,
                            companyId: company.company.id,
                        }
                        const objStr = encodeURIComponent(JSON.stringify(data))
                        router.push(`/verification/email?info=${objStr}`)
                    }
                }
            }

        }
        run()
    }, [])
    
    return(
        <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-blue-600 to-indigo-900 text-white">
            <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin shadow-lg"></div>
            {error && (
                <p className="mt-6 text-center text-xs font-semibold tracking-widest drop-shadow-lg">
                    {error}
                </p>
            )}
            {!error &&
                <p className="mt-6 text-xl font-semibold tracking-widest drop-shadow-lg">
                    Carregando...
                </p>
            }
        </div>
    )
}

export default Verification