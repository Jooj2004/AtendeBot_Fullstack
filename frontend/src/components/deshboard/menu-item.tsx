"use client"

import { Activity, LayoutDashboard, MessageSquare, Settings, TrendingUp } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

type Props = {
    text:string
    item:number
    active: number
    setActive: (item:number) => void
}

export const MenuItem = ({text, item, active, setActive}:Props) => {
    const router = useRouter()

    useEffect(() => {
        if(active === 0) router.push('/deshboard')
    }, [active])


    const handleClick = () => {
        setActive(item)
        if(item === 0) router.push('/deshboard')
        if(item === 1) router.push('/faqs')
        if(item === 2) router.push('/analises')
        if(item === 3) router.push('/atividades')
        if(item === 4) router.push('/ajustes')
    }

    return(
        <div 
        onClick={handleClick}
            className={`my-3 flex gap-2 text-cyan-950 hover:bg-blue-100 hover:opacity-70 active:opacity-70 hover:rounded-md font-semibold py-2 px-3 cursor-pointer
                ${active === item ? 'bg-blue-100 rounded-md' : ' '}    
            `}
        >
            {item === 0 &&
                <>
                    <LayoutDashboard className="h-5 aspect-square"/>
                    <p className="hidden sm:block">{text}</p>
                </>
            }
            {item === 1 &&
                <>
                    <MessageSquare className="h-5 aspect-square"/>
                    <p className="hidden sm:block">{text}</p>
                </>
            }
            {item === 2 &&
                <>
                    <TrendingUp className="h-5 aspect-square"/>
                    <p className="hidden sm:block">{text}</p>
                </>
            }
            {item === 3 &&
                <>
                    <Activity className="h-5 aspect-square"/>
                    <p className="hidden sm:block">{text}</p>
                </>
            }
            {item === 4 &&
                <>
                    <Settings className="h-5 aspect-square"/>
                    <p className="hidden sm:block">{text}</p>
                </>
            } 
        </div>
    )
}