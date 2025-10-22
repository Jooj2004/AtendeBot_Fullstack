import { Company } from "@/types/company"
import { req } from "@/utils/axios"

export const serverON = async () => {
    try{
        const server = await req.get('/ping')
        if(server.data.pong) return true
        return false
    }catch{
        return false
    }
}

export const sendEmail = async (companyId: string) => {
    try{
        const res = await req.post('/auth/verification',{
            companyId
        })
        if(res.data.idOTP){
            return res.data.idOTP as string
        }
    }catch{
        return null
    }
}

export const verifyOTP = async (id: string, code:string) => {
    try{
        const res = await req.post('auth/useotp', {
            id,
            code
        })
        if(res.data.token && res.data.token){
            const data:{token: string, company:Company} = {
                token: res.data.token,
                company: res.data.company
            }
            return data
        }
        if(res.data.error) return res.data.error as string
    }catch{
        return null
    }
    return null
}