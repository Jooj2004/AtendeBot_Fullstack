"use client"

import { Inter } from "@/types/inter"
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts"

export const Taxa = ({ date }: { date: Inter[] }) => {
    let dateArray = date || []

    let total = dateArray.length
    
    let { bot, faq } = dateArray.reduce(
        (acc, e) => {
            if (e.botOrFaq === 1) acc.bot++
            else if (e.botOrFaq === 2) acc.faq++
            return acc
        },
        { bot: 0, faq: 0 }
    )

    const botPct = total > 0 ? (bot / total) * 100 : 0
    const faqPct = total > 0 ? (faq / total) * 100 : 0

    const data = [
        { name: "Chatbot", value: Math.round(botPct) },
        { name: "FAQ", value: Math.round(faqPct) }
    ]

    const COLORS = ["#1E40AF", "#93C5FD"] 

    return (
        <div className="bg-white border rounded-md border-cyan-950/50 shadow-md mx-auto w-60 h-40 sm:w-1/3">
            <h2 className="font-semibold text-sm md:text-md mb-3 pt-1 px-1">Taxa de Resposta 
                <span className="text-[8px] pt-1 flex gap-1 font-bold">
                    Chatbot <div className="aspect-square w-[8px] bg-[#1E40AF] rounded-xs"></div>
                    Faq <div className="aspect-square w-[8px] bg-[#93C5FD] rounded-xs"></div>
                </span> 
            </h2>
            <div className="w-full flex items-center justify-center">
                <ResponsiveContainer width="100%" height={130}>
                    <PieChart>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="40%"
                            innerRadius="40%"
                            outerRadius="80%"
                            paddingAngle={2}
                            dataKey="value"
                            label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
                            fontSize={10}
                        >
                            {data.map((_, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} fontSize={10}/>
                            ))}
                        </Pie>
                        <Tooltip formatter={(value, name) => [`${value}%`, name]}/>
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}