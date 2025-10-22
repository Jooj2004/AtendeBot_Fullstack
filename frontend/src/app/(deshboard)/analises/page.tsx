"use client"

import { Frequente } from "@/components/analises/frequente"
import { Palavras } from "@/components/analises/palavras"
import { Taxa } from "@/components/analises/taxa"
import { Chart } from "@/components/deshboard/chart"
import AnalisesSkeleton from "@/components/skeleton/analises"
import { useTokenStore } from "@/store/token"
import { Inter } from "@/types/inter"
import { useInteractions } from "@/utils/queries"

const Analise = () => {
    const token = useTokenStore()
    const inter = useInteractions(token.token as string)

    const hasData = inter.data && (inter.data as Inter[]).length > 0

    return (
        <div className="flex-1 ml-[21%] bg-secondary sm:px-1">
            <div>
                <h1 className="text-lg mb-1 font-semibold">Análises</h1>
                <p className="text-[7px] md:text-[10px] text-cyan-700 mb-2">Análise de Atividades e Indicadores</p>
            </div>

            {inter.isLoading && (
                <AnalisesSkeleton />
            )}

            {!inter.isLoading && !hasData && (
                <div className="flex flex-col items-center justify-center mt-10 p-4 bg-white border border-cyan-200 rounded-md shadow-md">
                    <p className="text-cyan-700 font-semibold mb-2">Nenhum dado disponível.</p>
                    <p className="text-gray-500 text-sm">Não foram encontradas interações para exibir.</p>
                </div>
            )}

            {hasData && (
                <>
                    <Chart date={inter.data as Inter[]} />
                    <div className="flex flex-col sm:flex-row gap-2 p-2">
                        <Frequente date={inter.data as Inter[]} />
                        <Taxa date={inter.data as Inter[]} />
                    </div>
                    <Palavras date={inter.data as Inter[]} />
                </>
            )}
        </div>
    )
}

export default Analise