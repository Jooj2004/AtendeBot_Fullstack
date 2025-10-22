"use client"

import { Button } from "@/components/ui/button"
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { serverON } from "@/services/auth"
import { useCompanyStore } from "@/store/company"
import { useTokenStore } from "@/store/token"
import { req } from "@/utils/axios"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"

type ErrorLogin = {
  email?: string[]
  password?: string[]
  error?: string
}

const vazio: ErrorLogin = {
  email: undefined,
  password: undefined,
  error: undefined,
}

const Lognin = () => {
  const router = useRouter()
  const {setToken} = useTokenStore()
  const company = useCompanyStore()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<ErrorLogin>(vazio)

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    const server = await serverON()
    if(!server){
      setError({
        ...vazio,
        error: "Servidor OFFLINE. Tente mais tarde"
      })
      return
    }
    try {
      const res = await req.post("/auth/signin", {
        email: email.toLowerCase(),
        password,
      })

      if (res.data.error) {
          const err = res.data.error

          if (typeof err === "string") {
              setError({
              ...vazio,
              error: err
              })
              return
          }
          else if (typeof err === "object") {
              setError({
              ...vazio,
              ...err
              })
              return
          }
        }
        setToken(res.data.token)
        company.setCompany(res.data.company)
        router.push("/verification")
    } catch (err: any) {
        console.error("Erro no login:", err)
        alert("Erro: " + (err.response?.data?.message || err.message || "erro desconhecido"))
    }
  }

  return (
    <Card className="mx-auto max-w-lg">
      <CardHeader>
        <CardTitle className="flex gap-1">
          Login <Image alt="logo" src={"/assets/logo.png"} width={20} height={20} />
        </CardTitle>
        <CardDescription className="hidden sm:block">
          Se ainda não tem uma conta, cadastre-se.
        </CardDescription>
        <CardAction>
          <Button variant={"link"}>
            <Link href={"/auth/signup"}>Cadastre-se</Link>
          </Button>
        </CardAction>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="relative">
          <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Digite o email da empresa:"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
              />
              {error?.email &&
                error.email.map((e, i) => (
                  <p key={i} className="text-red-500 text-xs">{e}</p>
                ))}
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                type="password"
                placeholder="Insira a sua senha:"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                required
              />
              {error?.password &&
                error.password.map((e, i) => (
                  <p key={i} className="text-red-500 text-xs">{e}</p>
                ))}
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
          <Button className="cursor-pointer my-4" type="submit">
            Entrar
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}

export default Lognin
