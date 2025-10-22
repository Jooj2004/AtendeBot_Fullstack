export const ItemMenssagem = ({text}:{text:string}) => {
    return(
        <div 
            className="bg-blue-200 rounded-md px-3 my-2 py-2 w-[80%] text-center
            hover:opacity-80 cursor-pointer
            "
        >
            <p className="text-blue-950 text-xs font-semibold">
                {text}
            </p>
        </div>
    )
}