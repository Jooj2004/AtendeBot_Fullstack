"use client"
import { motion } from "framer-motion";
import { Logo } from "@/components/layout/logo"
import { Button } from "@/components/ui/button"
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { sendEmail, verifyOTP } from "@/services/auth";
import { useCompanyStore } from "@/store/company";
import { useTokenStore } from "@/store/token";

const EmailVerify = () => {
    const router = useRouter()
    const searchParams = useSearchParams()
    const info = searchParams.get("info")

    const token = useTokenStore()
    const company = useCompanyStore()

    let data = null
    if (info) {
        try {
            data = JSON.parse(decodeURIComponent(info))
        } catch (e) {
            alert('Erro. Tente novamente mais tarde!')
            router.push('/')
        }
    }

    const[codOTP, setCodOTP] = useState('')
    const[idOtp, setIdOtp] = useState(data.idOTP || '') 
    const[error, setError] = useState<string | null>()
    const[newSend, setNewSend] = useState<boolean>()

    const sendNewEmail = async () => {
        setNewSend(false)
        setError(null)
        setCodOTP("")
        const email = await sendEmail(data.companyId)
        setIdOtp(email)
    }

    const handleVerify = async () => {
        const otp = await verifyOTP(idOtp, codOTP)
        if(typeof otp === 'string') {
            setError(otp)
            return
        }
        if(otp === null || otp === undefined){
            alert("Erro. Tente novamente mais tarde")
            return
        }
        token.setToken(otp.token);
        company.setCompany(otp.company);
        router.push('/deshboard')
    }

    useEffect(()=> {
        setTimeout(() => {
            setNewSend(true)
        },10000)
    }, [newSend])

    return(
        <div className="py-3 text-white px-8 min-h-screen bg-gradient-to-br from-[#2825eb] via-[#1915eb] to-[#5403d6]">
            <header className="flex items-center justify-between h-7 mb-10">
                <Logo/>
                <Button onClick={()=> router.push('/home')} className="cursor-pointer text-white" variant="link">Sair</Button>
            </header>
            <motion.section 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="w-[80%] mx-auto flex flex-col sm:flex-row"
            >
            <div className="max-w-lg md:mx-auto md:border md:border-white/40 md:rounded-md md:shadow-2xl md:p-5">
                <div>
                    <h1 className="text-3xl mb-4 lg:text-5xl text-white font-semibold">Confirme seu cadastro</h1>
                    <p className="text-sm mb-4 lg:text-lg">Insira o código enviado para {data.email} </p>
                </div>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2,duration: 0.8 }}
                    className="w-full flex items-center justify-center sm:flex-row mb-4"
                >
                    <InputOTP
                        maxLength={6}
                        value={codOTP}
                        onChange={(e) => setCodOTP(e)}
                    >
                        <InputOTPGroup>
                            <InputOTPSlot index={0}/>
                            <InputOTPSlot index={1}/>
                            <InputOTPSlot index={2}/>
                            <InputOTPSlot index={3}/>
                            <InputOTPSlot index={4}/>
                            <InputOTPSlot index={5}/>
                        </InputOTPGroup>
                    </InputOTP>
                </motion.div>
                {error &&
                    <p className="text-xs text-center p-1 sm:text-sm text-red-500">{error}</p>
                }
                <div>
                    <Button onClick={handleVerify} className="bg-pink-500 cursor-pointer w-full mb-4">Confirmar</Button>
                    {newSend &&
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1 }}
                        >
                            <p className="group mb-4 text-xs cursor-pointer">
                                Não recebeu o código?{' '}
                                <motion.span
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 1, duration: 1 }}
                                    onClick={sendNewEmail} 
                                    className="group-hover:underline active:opacity-50 cursor-pointer text-blue-600"
                                >
                                    Reenviar
                                </motion.span>
                            </p>
                        </motion.div>
                    }
                </div>
            </div>
        </motion.section>
        </div>
    )
}

export default EmailVerify