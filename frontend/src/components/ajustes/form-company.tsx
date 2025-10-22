import { useState } from "react"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Button } from "../ui/button"
import { useTokenStore } from "@/store/token"
import { useCompanyStore } from "@/store/company"
import { req } from "@/utils/axios"
import { Company } from "@/types/company"

export const FormCompany = () => {
    const { token } = useTokenStore()
    const { company, setCompany } = useCompanyStore()

    const [name, setName] = useState(company?.name || "")
    const [description, setDescription] = useState(company?.description || "")
    const [CNPJ, setCNPJ] = useState(company?.CNPJ || "")

    const [update, setUpdate] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [showModalLimit, setShowModalLimit] = useState<string | null>(null)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setUpdate(true)
        setShowModalLimit(null)

        try {
            const data = { name, description, CNPJ }
            const res = await req.put("/company/edit", data, {
                headers: {
                    Authorization: `Bearer ${token as string}`
                }
            })

            const apiCompany = res.data.company

            if (!apiCompany) {
                const errorMsg = res.data?.error || "Erro inesperado ao atualizar empresa."
                setShowModalLimit(typeof errorMsg === "string" ? errorMsg : Object.values(errorMsg).flat().join(" • "))
                return
            }

            const normalizedCompany: Company = {
                ...apiCompany,
                createdAt: apiCompany.createAt || apiCompany.createdAt,
                updatedAt: apiCompany.updateAt || apiCompany.updatedAt,
            }

            setCompany(normalizedCompany)
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
                    <h2 className="font-semibold">Informações da Empresa</h2>
                </div>
                <div>
                    <Label className="my-1" htmlFor="name">Nome da empresa</Label>
                    <Input
                        className="text-xs"
                        id="name"
                        type="text"
                        placeholder="Digite o nome da empresa:"
                        required
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                    />
                </div>
                <div>
                    <Label className="my-1" htmlFor="description">Descrição</Label>
                    <Input
                        className="text-xs"
                        id="description"
                        type="text"
                        placeholder="Digite a descrição da empresa:"
                        required
                        onChange={(e) => setDescription(e.target.value)}
                        value={description}
                    />
                </div>
                <div>
                    <Label className="my-1" htmlFor="CNPJ">CNPJ</Label>
                    <Input
                        className="text-xs"
                        id="CNPJ"
                        type="text"
                        placeholder="Digite o CNPJ da empresa:"
                        required
                        onChange={(e) => setCNPJ(e.target.value)}
                        value={CNPJ}
                    />
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