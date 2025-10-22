"use client"

import { useState } from "react"
import { LogoDeashboard } from "./logo"
import { MenuItem } from "./menu-item"
import { useCompanyStore } from "@/store/company"

const menu = ['Dashboard', 'FAQs', 'Análises', 'Atividades', 'Ajustes']

export const LeftPage = () => {
    const {company} = useCompanyStore()

    const [active, setActive] = useState<number>(0)

    return(
        <div className="w-[21%] p-2 h-screen border fixed border-r-gray-800/50 flex flex-col justify-between bg-white">
            <div>
                <LogoDeashboard />
                <div className="flex flex-col">
                    {menu.map((e, index)=> (
                        <MenuItem key={index} text={e} item={index} active={active} setActive={setActive}/>
                    ))}
                </div>
            </div>
            <footer className="py-5 flex gap-2 items-center min-w-0">
                <div className="w-12 aspect-square rounded-full bg-blue-100 flex-shrink-0 flex items-center justify-center">
                    <p className="text-4xl text-cyan-950">{company?.name[0]}</p>
                </div>
                <p className="hidden sm:block text-cyan-950 truncate max-w-xs">{company?.name}</p>
            </footer>
        </div>
    )
}