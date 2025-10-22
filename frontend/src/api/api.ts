import { UpdateCompany } from "@/types/company";
import { Faq } from "@/types/faq";
import { Inter } from "@/types/inter";
import { req } from "@/utils/axios";

export const getFaqs = async (token:string):Promise<Faq[]> => {
    const res = await req.get('/faq/list',{
        headers:{
            Authorization: `Bearer ${token}`
        }
    })
    return res.data.list
} 

export const getFaq = async (token:string, id:string):Promise<Faq> => {
    const res = await req.get(`/faq/list/${id}`,{
        headers:{
            Authorization: `Bearer ${token}`
        }
    })
    return res.data.faq
}

export const addFaq = async (token:string, data:Faq) => {
    const res = await req.post('/faq/create', data, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return res
}

export const getInteractions = async (token:string): Promise<Inter[]> => {
    const res = await req.get('/company/interaction',{
        headers:{
            Authorization: `Bearer ${token}`
        }
    })
    return res.data.interactions
}