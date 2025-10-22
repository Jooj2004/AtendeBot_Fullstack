import { useState } from "react"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Button } from "../ui/button"
import { useTokenStore } from "@/store/token"
import { useCompanyStore } from "@/store/company"
import { req } from "@/utils/axios"

export const FormPass = () => {
    const { token } = useTokenStore()
    const { company } = useCompanyStore()

    const [actualPass, setActualPass] = useState<string>('')
    const [newPass, setNewPass] = useState<string>('')
    const [newPassConf, setNewPassConf] = useState<string>('')

    const [update, setUpdate] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [showModalLimit, setShowModalLimit] = useState<string | null>(null)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setUpdate(true)
        setShowModalLimit(null)

        const id = company?.id

        try {
            if (newPass != newPassConf) {
                const errorMsg = "As senhas não conferem! Tente novamente!"
                setShowModalLimit(errorMsg)
                return
            }

            const data = { id, actualPass, newPass}
            const res = await req.put("/auth/password", data, {
                headers: {
                    Authorization: `Bearer ${token as string}`
                }
            })

            const apiCompany = res.data.company
            const apiSucess = res.data.sucess

            if (!apiCompany || !apiSucess) {
                const errorMsg = res.data?.error || "Erro inesperado ao atualizar empresa."
                setShowModalLimit(typeof errorMsg === "string" ? errorMsg : Object.values(errorMsg).flat().join(" • "))
                return
            }

            setShowModal(true)
        } catch (err: any) {
            const errorMsg = err.response?.data?.error || "Erro inesperado ao atualizar empresa."
            setShowModalLimit(typeof errorMsg === "string" ? errorMsg : Object.values(errorMsg).flat().join(" • "))
        } finally {
            setUpdate(false)
        }
    }

    return (
        <div>
            <form
                onSubmit={handleSubmit}
                className="border px-1 py-2 md:px-2 md:py-3 rounded-md max-w-2xl mx-auto border-cyan-950/20 flex flex-col gap-3"
            >
                <div>
                    <h2 className="font-semibold">Atualização de Senha</h2>
                </div>
                <div className="border-b-2 pb-2 border-cyan-950/30 rounded-xs">
                    <Label className="my-1" htmlFor="actualPass">Senha atual</Label>
                    <Input
                        className="text-xs"
                        id="actualPass"
                        type="password"
                        placeholder="Digite a sua senha atual:"
                        required
                        onChange={(e) => setActualPass(e.target.value)}
                        value={actualPass}
                    />
                </div>
                <div>
                    <Label className="my-1" htmlFor="newPass">Nova Senha</Label>
                    <Input
                        className="text-xs"
                        id="newPass"
                        type="password"
                        placeholder="Digite sua nova senha:"
                        required
                        onChange={(e) => setNewPass(e.target.value)}
                        value={newPass}
                    />
                </div>
                <div>
                    <Label className="my-1" htmlFor="newPassConf">Confirme a Senha</Label>
                    <Input
                        className="text-xs"
                        id="newPassConf"
                        type="password"
                        placeholder="Confirme sua nova senha:"
                        required
                        onChange={(e) => setNewPassConf(e.target.value)}
                        value={newPassConf}
                    />
                    {newPass && newPassConf && newPass != newPassConf &&
                        <p className="text-[8px] text-red-800">As senhas não conferem!</p>
                    }
                </div>
                <div className="flex justify-between">
                    <div className={`aspect-square w-7 ${update ? "hidden" : ""}`}></div>
                    {update &&
                        <div className="aspect-square self-center w-7 border-4 border-blue-400 border-t-transparent rounded-full animate-spin shadow-lg"></div>
                    }
                    <Button
                        disabled={update}
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 transition-colors"
                    >
                        Salvar alterações
                    </Button>
                </div>
            </form>

            {showModal &&
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm transition-opacity duration-300">
                    <div className="bg-white/90 backdrop-blur-md px-8 py-6 rounded-2xl shadow-2xl max-w-md w-full text-center border border-blue-100 transform transition-transform duration-300 scale-95 animate-slideIn">
                        <p className="text-blue-700 text-lg font-semibold mb-6">
                            Empresa atualizada com sucesso!
                        </p>
                        <Button
                            variant="outline"
                            className="px-6 py-2 border-blue-500 text-blue-600 font-medium rounded-lg hover:bg-blue-50 transition-colors duration-200"
                            onClick={() => setShowModal(false)}
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
                            {showModalLimit}
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
        </div>
    )
}