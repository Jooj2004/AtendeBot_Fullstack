"use client"

import { ItemMenssagem } from "@/components/chat/item"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { req } from "@/utils/axios"
import Image from "next/image"
import { useSearchParams } from "next/navigation"
import { useEffect, useRef, useState } from "react"

type Question = {
    question: string
}

const Chatbot = () => {
    useEffect(()=>{
        setLogin(true)
        const getFaqs = async () => {
            const res = await req.get(`/faq/list/public/${searchParams.get("id")}`)
            if(res.data.list){
                let faqs = res.data.list
                setFaqs(faqs)
            }
            setLogin(false) 
        }
        getFaqs()
    }, [])

    const [login, setLogin] = useState(false)
    const [loginBot, setLoginBot] = useState(false)
    const [textInput, setTextInput] = useState<string>("")
    const [question, setQuestion] = useState<string|null>(null)
    const [answer, setAnswer] = useState<string|null>(null)

    const [faqs, setFaqs] = useState<Question[]>()

    const searchParams = useSearchParams()

    const messagesEndRef = useRef<HTMLDivElement | null>(null)
    useEffect(()=>{
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [faqs])

    const handleClick = async () => {
        try {
            const currentQuestion = textInput
            setQuestion(currentQuestion)

            const res = await req.post(
                `/chat/new/${searchParams.get("id")}`, 
                { question: currentQuestion }
            )

            if (res.data.error) {
                alert("Erro! Tente mais tarde!")
                setLoginBot(false)
                return
            }

            if (res.data.answer && typeof res.data.answer === "string") {
                setAnswer(res.data.answer)
            }
            
        } catch (err) {
            alert("Erro!" + err)
        }finally{
            setTextInput("")
            setLoginBot(false)
        }
    }

    return(
        <div className="bg-secondary h-screen w-full">
        <div className="flex flex-col items-center h-screen bg-white py-3 mx-auto md:border shadow-md border-cyan-950/10 rounded-md px-4 max-w-xl">    
            <div className="flex items-center gap-2 mb-5">
                <h1 className="text-4xl font-bold">Chatbot</h1>
                <Image 
                    height={70} 
                    width={70} 
                    alt="logo" 
                    src={'/assets/logo.png'}
                />
            </div>

            <div>
                <h2 className="text-blue-950 font-semibold text-3xl">
                    Olá! Como posso ajudar você hoje?
                </h2>
            </div>

            <div className="my-6 w-full max-h-60 overflow-auto">
                {login &&
                    <div 
                        className="w-10 aspect-square border-r-2 border-b-2 border-l-2 border-cyan-300 animate-spin rounded-full mx-auto">
                    </div>
                }
                {faqs && !login && !question  &&
                    faqs.map((e, index) =>(
                        <div 
                            key={index} 
                            className="w-full flex justify-center" 
                            onClick={()=> setTextInput(e.question)}
                        >
                            <ItemMenssagem text={e.question}/>
                        </div>
                    ))
                }
                <div className="w-full flex flex-col">
                    {question &&
                        <div className="bg-blue-200 rounded-md px-3 mt-2 mb-8 py-2 w-[80%] text-blue-950 font-semibold self-end">
                            {question}
                        </div>
                    }
                    {loginBot &&
                        <div>
                            <Image 
                                height={20} 
                                width={20} 
                                alt="logo" 
                                src={'/assets/logo.png'}
                            />
                            <div className="flex gap-1 animate-pulse mt-1">
                                <div className="w-1 aspect-square rounded-full bg-blue-400"></div>
                                <div className="w-1 aspect-square rounded-full bg-blue-500"></div>
                                <div className="w-1 aspect-square rounded-full bg-blue-600"></div>
                            </div>
                        </div>
                    }
                    {!loginBot && answer &&
                        <div className="bg-amber-100 text-sm rounded-md px-3 mt-2 mb-8 py-2 w-[80%] text-blue-500 font-semibold self-start">
                            {answer}
                        </div>
                    }
                </div>
                <div ref={messagesEndRef}/>
            </div>

            <div className="w-full">
                <Label>
                    <Input 
                        className="w-full h-10 text-sm text-neutral-900" 
                        type="text" 
                        placeholder="Digite sua menssagem"
                        value={textInput}
                        onChange={(e)=>setTextInput(e.target.value)}
                    />
                </Label>
                <Button 
                    onClick={()=>{
                        if(textInput){
                            setLoginBot(true)
                            handleClick()
                        }
                    }}
                    className="bg-blue-600 mx-auto w-30 my-5 block hover:bg-blue-800 cursor-pointer"
                >Send</Button>
            </div>
        </div>
        </div>
    )
}

export default Chatbot