import { LucideProps } from "lucide-react"
import { ForwardRefExoticComponent, RefAttributes } from "react"

type Props = {
    Icon:ForwardRefExoticComponent<
        Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
    >
    title: string
    item: string
}

export const ItemPage = ({Icon, title, item}: Props) => {
    return(
        <div className="w-full text-cyan-950 border-1 hover:bg-black/5 transition p-2 shadow-md md:my-4 border-b-gray-900/50 rounded-md bg-white">
            <div className="flex gap-2 items-center">
                <Icon className="h-5 aspect-square" />
                <p className="text-xs">{title}</p>
            </div>
            <div className="flex text-md px-1">
                {item === "Online" &&
                    <p className="text-green-800">{item}</p>
                }
                {item != "Online" &&
                    <p>{item}</p>
                }
            </div>
        </div>
    )
}