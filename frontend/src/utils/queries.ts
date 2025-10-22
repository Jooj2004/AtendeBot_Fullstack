import { getFaq, getFaqs, getInteractions } from "@/api/api";
import { Faq } from "@/types/faq";
import { Inter } from "@/types/inter";
import { useQuery } from "@tanstack/react-query";

export const useFaqs = (token:string) => {
    return useQuery<Faq[]>({
        queryKey: ['faqs'],
        queryFn: () => getFaqs(token)
    })
}

export const useFaq = (token:string, id:string) => {
    return useQuery<Faq>({
        queryKey: ['faqs'],
        queryFn: () => getFaq(token, id)
    })
}

export const useInteractions = (token:string) => {
    return useQuery<Inter[]>({
        queryKey: ['inters'],
        queryFn: () => getInteractions(token)
    })
}