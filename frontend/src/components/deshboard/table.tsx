import { Inter } from "@/types/inter"

export const Table = ({date}:{date:Inter[]}) => {

    const setDataLong = (date: string | Date) => {
        const d = new Date(date)
        return d.toLocaleString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        })
    }

    const setDataSmall = (date: string | Date) => {
        const d = new Date(date)
        return d.toLocaleString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
        })
    }

    return(
        <table className="w-full text-xs table-auto border-collapse">
                        <caption className="text-lg font-semibold mb-2 text-center">
                            Últimas Interações
                        </caption>
                        <thead>
                            <tr className="border-b border-black/50">
                                <th className="px-3 py-2 text-center">Data/Hora</th>
                                <th className="px-3 py-2 text-left">Pergunta</th>
                            </tr>
                        </thead>
                        <tbody>
                            {date &&
                                [...date].slice(0, 5).map((e, index) => (
                                        <tr
                                            key={index}
                                            className="border-b border-black/20 hover:bg-black/5 transition"
                                        >
                                            <td className="px-3 py-2 md:hidden text-center">
                                                {setDataSmall(e.createAt as string)}
                                            </td>

                                            <td className="px-3 py-2 hidden md:table-cell text-center">
                                                {setDataLong(e.createAt as string)}
                                            </td>

                                            <td className="px-3 py-2 max-w-xs">
                                                {e.question}
                                            </td>
                                        </tr>
                                ))
                            }
                        </tbody>
                    </table>
    )
}