export type Company = {
  id: string
  name: string
  email: string
  CNPJ: string
  description?: string
  password: string
  createdAt: string
  updatedAt: string
  verification: boolean
  faqs?: {
    id: string
    question: string
    answer: string
    companyId: string
    createAt: string
    updateAt: string
  }[]
  inter?: {
    id: string
    question: string
    botAnswer: string
    companyId: string
    createAt: string
  }[]
  otp?: {
    id: string
    code: string
    companyId: string
    expiredAt: string
    used: boolean
  }[]
}