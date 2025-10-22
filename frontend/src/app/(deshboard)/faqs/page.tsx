"use client"

import { EditFaqs } from "@/components/faqs/edit-faqs"
import { TableFaqs } from "@/components/faqs/table_faqs"
import FaqsSkeleton from "@/components/skeleton/faqs"
import { Button } from "@/components/ui/button"
import { useTokenStore } from "@/store/token"
import { req } from "@/utils/axios"
import { useFaqs } from "@/utils/queries"
import { queryClient } from "@/utils/QueryClient"
import { useState } from "react"

const Faqs = () => {
    const token = useTokenStore()

    const [modalEdit, setModalEdit] = useState(false)
    const [exclude, setExclude] = useState(false)
    const [question, setQuestion] = useState('')
    const [answer, setAnswer] = useState('')
    const [id, setId] = useState('')

    const faqs = useFaqs(token.token as string)

    const handleExclud = async (id: string) => {
        const res = await req.delete(`/faq/delete/${id}`,{
            headers: {
                Authorization: `Bearer ${token.token}`
            }
        })
        if(res.data.del){
            alert('Deletado com sucesso')
        }
        if(res.data.error){
            alert('Falha ao deletar!')
        }
        queryClient.invalidateQueries({ queryKey: ['faqs'] })
    }

    return(
        <>
            {faqs.isLoading &&
                <FaqsSkeleton/>
            }
            {!faqs.isLoading &&
                <div className="flex-1 ml-[21%] bg-secondary px-1">
                    <div>
                        <h1 className="text-lg mb-1 font-semibold">FAQs</h1>
                        <p className="text-[7px] md:text-[10px] text-cyan-700 mb-2">Cadastre as perguntas mais frequentes dos clientes. O chatbot usará essas informações para responder automaticamente. Dica: Priorize clareza e relevância!</p>
                    </div>
                    <div className="mx-auto border my-3 py-5 px-2 border-cyan-950/50 rounded-md shadow-md w-60 md:w-1/2">
                        <TableFaqs />
                    </div>
                    <p className="text-xs md:text-sm text-gray-700 mb-2">
                        Cada conta pode cadastrar até 15 FAQs. Isso ajuda a controlar o uso do token do bot via OpenAI e garante respostas rápidas e precisas.
                    </p>
                    {faqs.data && faqs.data.length > 0 &&
                        <div>
                            <h2 className="font-semibold md:text-lg">Suas FAQs({faqs.data.length})</h2>
                            {faqs.data.map((e,index) => (
                                <div key={index} className="border flex my-3 flex-col gap-2 mx-1 p-1 md:px-2 md:py-3 rounded-md shadow-md">
                                    <p className="text-sm md:text-md font-semibold text-blue-950">{e.question}</p>
                                    <p className="text-xs md:text-sm text-cyan-900">{e.answer}</p>
                                    <div>
                                        <Button 
                                            className="mr-2"
                                            size="sm"
                                            onClick={() => {
                                                setQuestion(e.question)
                                                setAnswer(e.answer)
                                                setId(e.id as string)
                                                setModalEdit(true)
                                            }}
                                        >Editar</Button>

                                        <Button 
                                            variant="destructive"
                                            size="sm"
                                            onClick={() => {
                                                setExclude(true)
                                                setId(e.id as string)
                                            }}
                                        >Excluir</Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    }
                    {faqs.data && faqs.data.length <= 0 &&
                        <></>
                    }
                    {modalEdit &&
                        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm transition-opacity duration-300">
                            <div className="bg-white p-4 aspect-square w-80 md:w-96 shadow-lg rounded-md">
                                <EditFaqs question={question} answer={answer} id={id} token={token.token as string} setModalEdit={setModalEdit}/>
                            </div>
                        </div>
                    }
                    {exclude &&
                        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm transition-opacity duration-300">
                            <div className="bg-white p-4 w-80 md:w-96 shadow-lg rounded-md flex flex-col items-center justify-center gap-5">
                                <p className="text-lg font-semibold">Tem certeza que deseja excluir essa FAQ? </p>
                                <Button variant="destructive" onClick={() => {
                                    setExclude(false)
                                    handleExclud(id)
                                }}>Sim</Button>
                                <Button onClick={()=>{
                                    setExclude(false)
                                }}>Não</Button>
                            </div>
                        </div>
                    }
                </div>
            }
        </>
    )
}

export default Faqs