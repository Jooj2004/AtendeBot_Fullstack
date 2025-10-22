"use client"

import { Inter } from "@/types/inter"

export const Frequente = ({ date }: { date: Inter[] }) => {

    let freq: Record<string, number> = {}

    const dataArray = date || [] 

    dataArray.forEach(item => {
        const q = item.question.trim().toLowerCase().replace(/[?.,]/g, "")
        freq[q] = (freq[q] || 0) + 1
    })

    const ranking = Object.entries(freq)
        .map(([question, count]) => ({
            question,
            count: count as number
        }))
        .sort((a, b) => b.count - a.count)

    const top5 = ranking.slice(0, 3)

    const getWidth = (count: number, maxCount: number) => {
        return `${(count / maxCount) * 100}%`
    }
    console.log(dataArray)

    return (
        <div className="bg-white border rounded-md border-cyan-950/50 shadow-md p-1 mx-auto w-60 h-40 sm:w-2/3">
            <div className="p-1">
            <h2 className="font-semibold text-sm md:text-md mb-3">Perguntas Frequentes</h2>
            {top5.map((e, index) => (
                <div key={index}>
                <div className="flex justify-between gap-2 text-xs md:text-sm">
                    <p className="truncate text-cyan-950">{e.question}</p>
                    <p className="font-semibold">{e.count}</p>
                </div>
                <div className="w-full h-1 mb-2 mt-1 bg-gray-200">
                    <div
                    className="h-1 bg-blue-400 rounded-lg"
                    style={{ width: getWidth(e.count, top5[0].count) }}
                    ></div>
                </div>
                </div>
            ))}
            </div>
        </div>
    )
}