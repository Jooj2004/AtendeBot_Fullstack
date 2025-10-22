"use client"

import { useState } from "react"
import { useTokenStore } from "@/store/token"
import { Inter } from "@/types/inter"
import { useInteractions } from "@/utils/queries"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import AtividadesSkeleton from "@/components/skeleton/atividades"

const Atividades = () => {
    const token = useTokenStore()
    const inter = useInteractions(token.token as string)
    const [filtro, setFiltro] = useState("7")
    const [pagina, setPagina] = useState(1)
    const itensPorPagina = 5

    const hasData = inter.data && (inter.data as Inter[]).length > 0

    const filtrar = (data: Inter[]) => {
        if (filtro === "all") return data
        const dias = parseInt(filtro)
        const limite = new Date()
        limite.setDate(limite.getDate() - dias)
        return data.filter(item => new Date(item.createAt) >= limite)
    }

    function formatarData(dataString: string) {
        const data = new Date(dataString)
        const dia = String(data.getDate()).padStart(2, "0")
        const mes = String(data.getMonth() + 1).padStart(2, "0")
        const ano = data.getFullYear()
        const horas = String(data.getHours()).padStart(2, "0")
        const minutos = String(data.getMinutes()).padStart(2, "0")
        return `${dia}/${mes}/${ano} ${horas}:${minutos}`
    }

    const filtradas = hasData ? filtrar(inter.data as Inter[]) : []

    const totalPaginas = Math.ceil(filtradas.length / itensPorPagina)
    const inicio = (pagina - 1) * itensPorPagina
    const fim = inicio + itensPorPagina
    const itensPagina = filtradas.slice(inicio, fim)

    const renderPaginas = () => {
        const paginas: (number | string)[] = []
        const delta = 2
        const esquerda = Math.max(2, pagina - delta)
        const direita = Math.min(totalPaginas - 1, pagina + delta)

        paginas.push(1)
        if (esquerda > 2) paginas.push("...")
        for (let i = esquerda; i <= direita; i++) paginas.push(i)
        if (direita < totalPaginas - 1) paginas.push("...")
        if (totalPaginas > 1) paginas.push(totalPaginas)

        return paginas
    }

    return (
        <>
            {inter.isLoading && <AtividadesSkeleton />}

            {!inter.isLoading && !hasData && (
                <div className="ml-[21%] w-full">
                    <h1 className="text-lg mb-1 font-semibold">Atividades</h1>
                    <p className="text-[7px] md:text-[10px] text-cyan-700 mb-2">
                        Histórico detalhado das interações do chatbot. Veja perguntas, respostas e filtre por período para acompanhar o uso.
                    </p>
                    
                    <div className="flex flex-col items-center justify-center mt-10 p-4 bg-white border border-cyan-200 rounded-md shadow-md">
                        <p className="text-cyan-700 font-semibold mb-2">Nenhum dado disponível.</p>
                        <p className="text-gray-500 text-sm">Não foram encontradas interações para exibir.</p>
                    </div>
                </div>
            )}

            {!inter.isLoading && hasData && (
                <div className="flex-1 ml-[21%] bg-secondary px-1">
                    <div>
                        <h1 className="text-lg mb-1 font-semibold">Atividades</h1>
                        <p className="text-[7px] md:text-[10px] text-cyan-700 mb-2">
                            Histórico detalhado das interações do chatbot. Veja perguntas, respostas e filtre por período para acompanhar o uso.
                        </p>
                    </div>
                    <div className="mb-4">
                        <select
                            name="filtro"
                            aria-label="Filtro de período"
                            value={filtro}
                            onChange={e => {
                                setFiltro(e.target.value)
                                setPagina(1)
                            }}
                            className="border border-cyan-950/20 rounded-md px-3 py-1 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-950/30 transition"
                        >
                            <option value="7">Últimos 7 dias</option>
                            <option value="30">Últimos 30 dias</option>
                            <option value="all">Tudo</option>
                        </select>
                    </div>

                    <div className="border border-cyan-950/20 rounded-lg p-2 shadow-sm bg-white">
                        {itensPagina.length === 0 ? (
                            <div className="text-center text-sm text-cyan-950/70 py-4">
                                Não há iterações
                            </div>
                        ) : (
                            <ul className="text-xs">
                                <li className="hidden font-semibold md:flex justify-between mb-3 text-sm text-cyan-950/80 border-b border-cyan-950/10 pb-1">
                                    <h3 className="w-[100px]">Data/Hora</h3>
                                    <h3 className="w-[220px]">Pergunta</h3>
                                    <h3 className="w-[220px]">Resposta</h3>
                                </li>

                                {itensPagina.map(item => (
                                    <li
                                        key={item.id}
                                        className="border-b border-cyan-950/10 py-2 md:flex justify-between items-start hover:bg-cyan-950/5 rounded-md transition"
                                    >
                                        <div className="w-[100px] mb-1 md:mb-0">
                                            <h3 className="font-semibold md:hidden mb-1">Data/Hora</h3>
                                            <span className="text-cyan-950/80">{formatarData(item.createAt)}</span>
                                        </div>

                                        <div className="w-[220px] mb-1 md:mb-0">
                                            <h3 className="font-semibold md:hidden mb-1">Pergunta</h3>
                                            <span>{item.question}</span>
                                        </div>

                                        <div className="w-[220px]">
                                            <h3 className="font-semibold md:hidden mb-1">Resposta</h3>
                                            <span>{item.botAnswer}</span>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    {totalPaginas > 1 && (
                        <div className="flex items-center justify-center mt-4 space-x-2">
                            <Button
                                variant={"secondary"}
                                onClick={() => setPagina(p => Math.max(p - 1, 1))}
                                disabled={pagina === 1}
                                className="px-3 py-1 border border-cyan-950/20 rounded-md text-sm hover:bg-cyan-950/10 disabled:opacity-50"
                            >
                                <ChevronLeft />
                            </Button>

                            {renderPaginas().map((p, i) =>
                                typeof p === "number" ? (
                                    <button
                                        key={i}
                                        onClick={() => setPagina(p)}
                                        className={`px-3 py-1 border rounded-md text-sm ${
                                            pagina === p
                                                ? "bg-cyan-950 text-white border-cyan-950"
                                                : "border-cyan-950/20 hover:bg-cyan-950/10"
                                        }`}
                                    >
                                        {p}
                                    </button>
                                ) : (
                                    <span key={i} className="px-2 py-1 text-sm text-cyan-950/50">...</span>
                                )
                            )}

                            <Button
                                variant={"secondary"}
                                onClick={() => setPagina(p => Math.min(p + 1, totalPaginas))}
                                disabled={pagina === totalPaginas}
                                className="px-3 py-1 border border-cyan-950/20 rounded-md text-sm hover:bg-cyan-950/10 disabled:opacity-50"
                            >
                                <ChevronRight />
                            </Button>
                        </div>
                    )}
                </div>
            )}
        </>
    )
}

export default Atividades