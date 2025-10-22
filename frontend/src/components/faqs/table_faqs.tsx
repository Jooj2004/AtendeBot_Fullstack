"use client"

import React, { useState } from "react"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { useTokenStore } from "@/store/token"
import { useAddFaq } from "@/utils/mutations"
import { Faq } from "@/types/faq"
import { queryClient } from "@/utils/QueryClient"
import { AxiosResponse } from "axios"

export const TableFaqs = () => {
    const {token} = useTokenStore()

    const addFaq = useAddFaq(token as string)

    const [question, setQuestion] = useState('')
    const [answer, setAnswer] = useState('')
    const [showModal, setShowModal] = useState(false)
    const [showModalLimit, setShowModalLimit] = useState<string | null>()

    const handleSubmit = (e:React.FormEvent) => {
        e.preventDefault()

        const data = {question, answer}

        addFaq.mutate(data,{
        onSettled: () => {
            setQuestion('')
            setAnswer('')
        },
        onSuccess: (response: AxiosResponse<Faq>) => {
            if (response.data && (response.data.error || response.data.answer || response.data.question)) {
                const errorMsg = response.data.error
                || response.data.answer?.[0]
                || response.data.question?.[0]
                || "Erro ao adicionar FAQ"

                setShowModalLimit(errorMsg)
                return
            }
            const newFaq = response.data
            const faqs = queryClient.getQueryData<Faq[]>(['faqs']) || []
            queryClient.setQueryData(['faqs'], [newFaq, ...faqs])
            queryClient.invalidateQueries({ queryKey: ['faqs'] })
            setShowModal(true)
        }
        })
    }
    return(
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">

            <Label htmlFor="question">Pergunta:</Label>
            <Input
                className="text-sm"
                id="question"
                type="text"
                placeholder="Digite a sua pergunta: "
                onChange={(e) => setQuestion(e.target.value)}
                value={question}
                required
            />
            <Label htmlFor="answer">Resposta:</Label>
            <Input
                className="text-sm"
                id="answer"
                type="text"
                placeholder="Digite a sua resposta: "
                onChange={(e) => setAnswer(e.target.value)}
                value={answer}
                required
            />
            <Button disabled={addFaq.isPending} type="submit">Enviar</Button>
            <div className={`aspect-square w-7 ${addFaq.isPending ?'hidden' : ''}`}></div>
            {addFaq.isPending &&             
                <div className="aspect-square self-center w-7 border-4 border-blue-400 border-t-transparent rounded-full animate-spin shadow-lg"></div>
            }
            {showModal && 
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm transition-opacity duration-300">
                <div className="bg-white/90 backdrop-blur-md px-8 py-6 rounded-2xl shadow-2xl max-w-md w-full text-center border border-blue-100 transform transition-transform duration-300 scale-95 animate-slideIn">
                    <p className="text-blue-700 text-lg font-semibold mb-6">
                        FAQ adicionada com sucesso!
                    </p>
                    <Button
                        variant="outline"
                        className="px-6 py-2 border-blue-500 text-blue-600 font-medium rounded-lg hover:bg-blue-50 transition-colors duration-200"
                        onClick={() => {
                            setShowModal(false)
                        }
                        }
                    >
                        Fechar
                    </Button>
                </div>
                </div>
            }
            {showModalLimit && 
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm transition-opacity duration-300">
                <div className="bg-white/90 backdrop-blur-md px-8 py-6 rounded-2xl shadow-2xl max-w-md w-full text-center border border-red-100 transform transition-transform duration-300 scale-95 animate-slideIn">
                <p className="text-red-700 text-lg font-semibold mb-6">
                    {typeof showModalLimit === 'string' 
                        ? showModalLimit 
                        : Object.values(showModalLimit).flat().join(' • ')
                    }
                </p>
                <Button
                    variant="outline"
                    className="px-6 py-2 border-red-500 text-red-600 font-medium rounded-lg hover:bg-red-50 transition-colors duration-200"
                    onClick={() => setShowModalLimit(null)}
                >
                    Fechar
                </Button>
                </div>
            </div>
            }
        </form>
    )
}