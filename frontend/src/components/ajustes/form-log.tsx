import { useState } from "react"
import { Button } from "../ui/button"
import { useCompanyStore } from "@/store/company"
import { useTokenStore } from "@/store/token"
import { useRouter } from "next/navigation"
import { req } from "@/utils/axios"

export const FormLog = () => {
    const {clearCompany} = useCompanyStore()
    const token = useTokenStore()
    const {push} = useRouter()

    const [conf, setConf] = useState(false)
    const [confLog, setConfLog] = useState(false)

    const handleLog = () => {
        clearCompany()
        token.clearToken()
        push('/home')
    }

    const handleClearCompany = async () => {
        const res = await req.delete('/company/delete',{
            headers:{
                Authorization: `Bearer ${token.token}`
            }
        })

        const success = res.data.success

        if(success){
            alert(res.data.message)
            handleLog()
        }
    }

    return(
        <div className="mb-6 border px-1 w-full py-2 md:px-2 md:py-3 rounded-md max-w-2xl mx-auto border-cyan-950/20 flex flex-col items-center gap-3">
            <div>
                <Button 
                    variant={"destructive"}
                    onClick={() => setConf(true)}
                >
                    Deletar Conta
                </Button>
            </div>
            <div>
                <Button
                    onClick={() => setConfLog(true)}
                >
                    Sair
                </Button>
            </div>

            {conf &&
                <div  className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm transition-opacity duration-300">
                    <div className="border-1 bg-blue-200 rounded-md border-cyan-950/30 py-3 px-2 flex flex-col items-center gap-4">
                        <p className="font-semibold text-blue-900">Deseja realmente deletar a sua conta?</p>
                        <div className="flex gap-4">
                            <Button
                                variant={"destructive"}
                                onClick={handleClearCompany}
                            >Sim</Button>
                            <Button
                                onClick={()=> setConf(false)}
                            >Não</Button>
                        </div>
                    </div>
                </div>
            }

            {confLog &&
                <div  className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm transition-opacity duration-300">
                    <div className="border-1 bg-blue-200 rounded-md border-cyan-950/30 py-3 px-2 flex flex-col items-center gap-4">
                        <p className="font-semibold text-blue-900">Deseja realmente sair da sua conta?</p>
                        <div className="flex gap-4">
                            <Button
                                variant={"destructive"}
                                onClick={handleLog}
                            >Sim</Button>
                            <Button
                                onClick={()=> setConfLog(false)}
                            >Não</Button>
                        </div>
                    </div>
                </div>
            }

        </div>
    )
}