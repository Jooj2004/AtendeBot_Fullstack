import { Company } from "@/types/company"
import { create } from "zustand"

type CompanyStore = {
  company: Company | null
  setCompany: (company: Company) => void
  initializeCompany: () => void
  clearCompany: () => void
}

export const useCompanyStore = create<CompanyStore>((set) => ({
  company: null,
  setCompany: (company) => {
    if (typeof window !== 'undefined' && company) {
      const companyString = JSON.stringify(company)
      localStorage.setItem('company', companyString)
    }
    set({ company })
  },
  clearCompany: () => {
    localStorage.removeItem('company')
    set({ company: null })
  },
  initializeCompany: () => {
    const stored = localStorage.getItem('company')
    const company = JSON.parse(stored as string) || null
    set({ company })
  }
}))