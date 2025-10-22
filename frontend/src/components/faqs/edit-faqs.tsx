"use client"

import { Input } from "../ui/input"
import { useState } from "react"
import { Label } from "../ui/label"
import { Button } from "../ui/button"
import { req } from "@/utils/axios"
import { queryClient } from "@/utils/QueryClient"

export const EditFaqs = ({question, answer, id, token, setModalEdit}:{question:string, answer:string, id:string, token:string, setModalEdit: (e:boolean) => void}) => {

    const [questionState, setQuestion] = useState(question)
    const [answerState, setAnswer] = useState(answer)

    const handleSubmit = async (e:React.FormEvent) => {
        e.preventDefault()
        const data = {id, question: questionState, answer: answerState}

        const res = await req.put('/faq/edit', data,{
            headers:{
                Authorization: `Bearer ${token}`
            }
        })
        console.log(res.data)
        console.log(data)
        if(res.data.error){
            alert("Não foi possível atualizar, tente novamente mais tarder")
        }
        if(res.data.faq){
            alert("Atualizada com sucesso!")
        }
        queryClient.invalidateQueries({ queryKey: ['faqs'] })
        setModalEdit(false)
    }

    return(
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <Label htmlFor="question">Edite sua pergunta:</Label>
            <p className="text-[9px] text-cyan-950">{questionState}</p>
            <Input
                className="text-sm"
                id="question"
                type="text"
                placeholder="Edite sua pergunta: "
                onChange={(e) => setQuestion(e.target.value)}
                value={questionState}
                required
            />
            <Label htmlFor="answer">Edite sua resposta:</Label>
            <p className="text-[9px] text-cyan-950">{answerState}</p>
            <Input
                className="text-sm"
                id="answer"
                type="text"
                placeholder="Edite sua resposta: "
                onChange={(e) => setAnswer(e.target.value)}
                value={answerState}
                required
            />
            <Button type="submit">Confirmar</Button>
            <Button variant={"secondary"} onClick={()=>setModalEdit(false)}>Sair</Button>
        </form>
    )
}