"use client"

import { Button } from "@/components/ui/button"
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { serverON } from "@/services/auth"
import { useCompanyStore } from "@/store/company"
import { req } from "@/utils/axios"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import React, { useState } from "react"

type ErrorSignup = {
    name?: string[]
    email?: string[]
    CNPJ?: string[]
    description?: string[]
    password?: string[]
    error?: string
}

let vazio = {
    name: undefined,
    email: undefined,
    CNPJ: undefined,
    description: undefined,
    password: undefined,
    error: undefined,
}

const Signup = () => {
    const router = useRouter()
    const {setCompany} = useCompanyStore()

    const[name, setName] = useState('')
    const[description, setDescription] = useState('')
    const[cnpj, setCnpj] = useState('')
    const[email, setEmail] = useState('')
    const[password, setPassword] = useState('')
    const[confPass, setConfPass] = useState('')

    const [error, setError] = useState<ErrorSignup>(vazio)
    
    const handleSubmit = async (event:React.FormEvent) => {
        event.preventDefault()
        const server = await serverON()
        if(!server){
            setError({
                ...vazio,
                error: "Servidor OFFLINE. Tente mais tarde"
            })
            return
        }
            if(password === confPass){
                try{
                    const res = await req.post('/auth/signup', {
                        name,
                        email: email.toLowerCase(),
                        CNPJ: cnpj,
                        description,
                        password
                    })
                    if (res.data.error) {
                        const err = res.data.error

                        if (typeof err === "string") {
                            setError({
                            ...vazio,
                            error: err
                            })
                        }
                        else if (typeof err === "object") {
                            setError({
                            ...vazio,
                            ...err
                            })
                        }
                    }
                    if(res.data.newCompany){
                        setCompany(res.data.newCompany)
                        router.push("/verification")
                    }
                }catch (err: any) {
                    const status = err.response?.status
                    const data = err.response?.data

                    if (status === 500) {
                        setError({
                        ...vazio,
                        error: "Erro, Problema interno ou CNPJ já existente"
                        })
                    } else if (data?.error) {
                        const errContent = data.error

                        if (typeof errContent === "string") {
                        setError({
                            ...vazio,
                            error: errContent
                        })
                        } else if (typeof errContent === "object") {
                        setError({
                            ...vazio,
                            ...errContent
                        })
                        }
                    } else {
                        alert("Erro: " + (data?.message || err.message || "erro desconhecido"))
                    }
                }
        }
    }

    return(
        <Card className="mx-auto max-w-lg">
            <CardHeader>
                <CardTitle className="flex gap-1">Cadastre-se<Image alt="logo" src={"/assets/logo.png"} width={20} height={20}/></CardTitle>
                <CardDescription className="hidden sm:block">Cadastre-se para começar a usar nossos serviços personalizados.</CardDescription>
                <CardAction>
                    <Button variant={"link"}><Link href={'/auth/lognin'}>Login</Link></Button>
                </CardAction>
            </CardHeader>
            <form onSubmit={handleSubmit}>
                <CardContent className="relative">
                    <div className="flex flex-col gap-2">
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="name">Nome da empresa</Label>
                            <Input
                                id="name"
                                type="text"
                                placeholder="Digite o nome da empresa:"
                                required
                                onChange={(e)=>setName(e.target.value)}
                                value={name}
                            />
                            {error?.name &&
                               <>
                                    {error.name.map((e, index) => (
                                        <p key={index} className="text-xs text-red-500">{e}</p>
                                    ))}
                               </>
                            }
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="description">Descrição</Label>
                            <Input
                                id="description"
                                type="text-area"
                                placeholder="Descreva sua empresa:"
                                onChange={(e)=>setDescription(e.target.value)}
                                value={description}
                            />
                            {error?.description &&
                               <>
                                    {error.description.map((e, index) => (
                                        <p key={index} className="text-red-500 text-xs">{e}</p>
                                    ))}
                               </>
                            }
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="CNPJ">CNPJ</Label>
                            <Input
                                id="CNPJ"
                                type="text"
                                placeholder="Digite o CNPJ da empresa:"
                                required
                                onChange={(e)=>setCnpj(e.target.value)}
                                value={cnpj}
                            />
                            {error?.CNPJ &&
                               <>
                                    {error.CNPJ.map((e, index) => (
                                        <p key={index} className="text-red-500 text-xs">{e}</p>
                                    ))}
                               </>
                            }
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="Digite o email da empresa:"
                                required
                                onChange={(e)=>setEmail(e.target.value)}
                                value={email}
                            />
                            {error?.email &&
                               <>
                                    {error.email.map((e, index) => (
                                        <p key={index} className="text-red-500 text-xs">{e}</p>
                                    ))}
                               </>
                            }
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="password">Senha</Label>
                            <Input
                                id="password"
                                type="password"
                                placeholder="Crie uma senha segura:"
                                required
                                onChange={(e)=>setPassword(e.target.value)}
                                value={password}
                            />
                            {error?.password &&
                               <>
                                    {error.password.map((e, index) => (
                                        <p key={index} className="text-red-500 text-xs">{e}</p>
                                    ))}
                               </>
                            }
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="confPassword">Confirmar senha</Label>
                            <Input
                                id="confPassword"
                                type="password"
                                placeholder="Confirme a sua senha:"
                                required
                                onChange={(e)=>setConfPass(e.target.value)}
                                value={confPass}
                            />
                            {confPass && password != confPass &&
                                <p className="text-red-500 text-xs">As senhas não coisidem. Tente novamente</p>
                            }
                        </div>
                    </div>
                    {error?.error && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center bg-blue-100/30 backdrop-blur-sm">
                            <div className="bg-white/80 backdrop-blur-md px-6 py-4 rounded-xl shadow-xl max-w-md w-full text-center border border-blue-200">
                            <p className="text-blue-700 text-base font-medium mb-4">{error.error}</p>
                            <Button variant="outline" onClick={() => setError(vazio)}>
                                Fechar
                            </Button>
                            </div>
                        </div>
                    )}
                </CardContent>
                <CardFooter>
                    <Button className="cursor-pointer my-4" type="submit">Cadastrar</Button>
                </CardFooter>
            </form>
        </Card>
    )
}

export default Signup