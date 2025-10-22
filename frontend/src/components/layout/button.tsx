import Link from "next/link"

type Props = {
    type: string
}

export const Button = ({type}: Props) => {
    return(
        <button className={`text-sm cursor-pointer text-white rounded-lg py-1 px-2 outline-none hover:opacity-70 active:opacity-70
                            ${type === '1' 
                                ?'bg-pink-500' 
                                : 'bg-blue-900 border border-blue-300'
                            }`
        }>
            {type === '1' &&
                <Link href="/auth/signup">Cadastre-se</Link>
            }
            {type === '2' &&
                <Link href="/about">Saiba-mais</Link>
            }
        </button>
    )
}