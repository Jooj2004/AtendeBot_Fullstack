"use client"

import { Inter } from "@/types/inter"

export const Palavras = ({ date }: { date: Inter[] }) => {

    const stopwords = new Set([
        "de", "a", "o", "que", "e", "do", "da", "em", "um", "para", "com",
        "não", "uma", "os", "no", "se", "na", "por", "mais", "as", "dos",
        "como", "mas", "foi", "ao", "ele", "das", "tem", "à", "seu", "sua",
        "ou", "ser", "quando", "muito", "há", "nos", "já", "está", "eu",
        "também", "só", "pelo", "pela", "até", "isso", "entre", "depois",
        "sem", "sobre", "me", "minha", "meu", "nosso", "nossa", "vocês", 
        "você", "é", "vai", "voce", "voces"
    ])

    let freq: Record<string, number> = {}
    const dataArray = date || []

    dataArray.forEach(item => {
        const text = item.question || ""
        const words = text
            .toLowerCase()
            .replace(/[.,!?;:]/g, "")
            .split(/\s+/)
            .filter(word => word && !stopwords.has(word))

        words.forEach(word => {
            freq[word] = (freq[word] || 0) + 1
        })
    })

    const ranking = Object.entries(freq)
        .map(([word, count]) => ({ word, count }))
        .sort((a, b) => b.count - a.count)

    const top10 = ranking.slice(0, 10)

    const getWidth = (count: number, maxCount: number) => `${(count / maxCount) * 100}%`

    return(
        <div className="bg-white border rounded-md border-cyan-950/50 shadow-md p-1 mx-auto w-60 h-auto sm:w-2/3">
            <h2 className="font-semibold text-sm md:text-md mb-3 p-1">Palavras Mais Usadas</h2>
            {top10.map((e, index) => (
                <div key={index} className="mb-2">
                    <div className="flex justify-between gap-2 text-xs md:text-sm">
                        <p className="truncate text-cyan-950">{e.word}</p>
                        <p className="font-semibold">{e.count}</p>
                    </div>
                    <div className="w-full h-1 bg-gray-200 rounded-lg">
                        <div
                            className="h-1 bg-green-400 rounded-lg"
                            style={{ width: getWidth(e.count, top10[0].count) }}
                        ></div>
                    </div>
                </div>
            ))}
        </div>
    )
}