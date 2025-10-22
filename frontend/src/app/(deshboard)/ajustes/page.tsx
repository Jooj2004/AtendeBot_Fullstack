"use client"

import { FormCompany } from "@/components/ajustes/form-company"
import { Formemail } from "@/components/ajustes/form-email"
import { FormLog } from "@/components/ajustes/form-log"
import { FormPass } from "@/components/ajustes/form-pass"

const Ajustes = () => {
    return(
        <div className="flex-1 ml-[21%] bg-secondary px-1">
            <h1 className="text-lg mb-1 font-semibold">Ajustes</h1>
            <p className="text-[7px] md:text-[10px] text-cyan-700 mb-2">
                Aletera as informações da sua empresa
            </p>
            <div className="flex flex-col gap-2">
                <FormCompany />
                <FormPass />
                <Formemail />
                <FormLog />
            </div>
        </div>
    )
}

export default Ajustes