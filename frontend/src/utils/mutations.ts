import { addFaq} from "@/api/api"
import { Faq } from "@/types/faq"
import { useMutation } from "@tanstack/react-query"

export const useAddFaq = (token:string) => {
    return useMutation({
        mutationFn: (data:Faq) => addFaq(token, data) 
    })
}