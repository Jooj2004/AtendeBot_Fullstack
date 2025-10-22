"use client"
import { ItemPage } from "@/components/deshboard/itens-page"
import { useCompanyStore } from "@/store/company"
import { useTokenStore } from "@/store/token"
import { useEffect, useState } from "react"
import {Mail, MessageSquare, MessageCircle, CheckCircle} from "lucide-react"
import { useInteractions } from "@/utils/queries"
import { Table } from "@/components/deshboard/table"
import { Inter } from "@/types/inter"
import { Chart } from "@/components/deshboard/chart"
import { serverON } from "@/services/auth"
import { useRouter } from "next/navigation"
import DashboardSkeleton from "@/components/skeleton/deshboard"
import { Button } from "@/components/ui/button"

const Deshboard = () => {
    const router = useRouter()
    const company = useCompanyStore()
    const token = useTokenStore()

    useEffect(() => {
        const verify = async () => {
            const server = await serverON()
            if(!server) router.push('/')
            company.initializeCompany()
            token.initializeToken()
        }
        verify()
    }, [])

    const [stats, setStats] = useState({
        totalMessage: '0',
        questions: '0',
        chats: '0',
        server: 'Online'
    })

    const inter = useInteractions(token.token as string)

    useEffect(()=>{
        const status = async () => {
            if(inter.data){
                const now = new Date()
                const fiveMinutesAgo = new Date(now.getTime() - 5 * 60 * 1000)

                let totQ = inter.data.map(e => e.question)
                let totR = inter.data.map(e => e.botAnswer)

                const activeChats = inter.data.filter(e => {
                    const createdAt = new Date(e.createAt)
                    return createdAt > fiveMinutesAgo
                }).length

                await setStats(e => ({
                    ...e,
                    totalMessage: String(totQ.length + totR.length),
                    questions: String(totR.length),
                    chats: String(activeChats)
                }))
            }
        }
        status()
    }, [inter.data])

    const link = `${process.env.NEXT_PUBLIC_MY_URL}/chatbot?id=${company.company?.id}`
    const [cop, setCop] = useState(false)
    const copiar = async () => {
        try{
            await navigator.clipboard.writeText(link)
            setCop(true)
            setTimeout(() => setCop(false), 10000)
        } catch (err) {
            alert("Erro ao copiar: " + err)
        }
    }
    
    return(
        <>
            {inter.isLoading &&
                <DashboardSkeleton />
            }
            {!inter.isLoading &&
                <div className="flex-1 ml-[21%] bg-secondary px-1">
                    <div>
                        <h1 className="text-lg mb-1 font-semibold">Deshboard</h1>
                        <p className="text-[7px] md:text-[10px] text-cyan-700 mb-2">Resumo das atividades e informações principais</p>
                    </div>
                    <div>
                        <p className="p-2 text-xs text-cyan-950 border-1 border-b-gray-900/50 rounded-md bg-white"> {link} </p>
                        
                        <Button 
                            variant={"outline"} 
                            size={"sm"}
                            onClick={()=>router.push(`/chatbot?id=${company.company?.id}`)}
                        >Ir</Button>

                        <Button
                            variant={cop ?"secondary" :"outline"}
                            size={"sm"}
                            onClick={copiar}
                        >{cop ?'Copiado!' :'Copiar'}</Button>

                        <p className="p-2 text-[8px] md:text-[10px] text-cyan-950">Olá! 😊 <br/>
                            O link acima é o endpoint do nosso chatbot. Para utilizá-lo, você deve enviar uma requisição HTTP com a sua pergunta no corpo (body) da requisição. O chatbot irá processar a sua mensagem e devolver a resposta automaticamente.
                            É uma maneira prática de integrar o chatbot diretamente ao seu site ou aplicação e obter respostas em tempo real! 🚀</p>
                    </div>
                    <section className="p-2 flex flex-col gap-2 sm:flex-row justify-around">
                        <ItemPage 
                            Icon={Mail}
                            title="Total de menssagens"
                            item={stats.totalMessage}
                        />
                        <ItemPage 
                            Icon={MessageSquare}
                            title="Perguntas respondidas"
                            item={stats.questions}
                        />
                        <ItemPage 
                            Icon={MessageCircle}
                            title="Chat ativos"
                            item={stats.chats}
                        />
                        <ItemPage
                            Icon={CheckCircle}
                            title="Chatbot"
                            item={stats.server}
                        />
                    </section>
                    {inter.data && inter.data.length > 0 &&
                        <section className="flex items-center flex-col sm:flex-row w-full mx-auto gap-2">

                            <div className="w-full shadow-md border border-cyan-950/50 rounded-md">
                                    <Table date={inter.data as Inter[]}/>
                            </div>

                            <div className="border-1 w-60 shadow-md rounded-md border-cyan-950/50 h-60 sm:flex-1">
                                    <Chart date={inter.data as Inter[]}/>
                            </div>
                            
                        </section>
                    }
                    {inter.data && inter.data.length <= 0 &&
                        <section className="flex flex-col items-center justify-center p-10 px-5 text-center bg-gray-100 rounded-xl max-w-xl mx-auto my-5">
                        <h2 className="text-2xl text-gray-800 mb-4">Bem-vindo!</h2>
                        <p className="text-base text-gray-600 leading-relaxed">
                            Parece que é seu primeiro acesso ou você ainda não criou suas FAQs. Crie suas perguntas frequentes para ajudar seus usuários a encontrarem respostas rapidamente
                        </p>
                        </section>
                    }
                </div>
            }
        </>
    )
}

export default Deshboard