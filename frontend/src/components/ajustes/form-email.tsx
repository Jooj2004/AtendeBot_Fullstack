import { useState } from "react"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Button } from "../ui/button"
import { useTokenStore } from "@/store/token"
import { useCompanyStore } from "@/store/company"
import { req } from "@/utils/axios"
import { useRouter } from "next/navigation"

export const Formemail = () => {
  const { token } = useTokenStore()
  const { company } = useCompanyStore()
  const { push } = useRouter()

  const actualEmail = company?.email as string ?? ""
  const [newEmail, setNewEmail] = useState<string>("")

  const [update, setUpdate] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [showModalLimit, setShowModalLimit] = useState<string | null>(null)
  const [showConfirm, setShowConfirm] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setShowConfirm(true)
  }

  const confirmSubmit = async () => {
    setUpdate(true)
    setShowConfirm(false)
    setShowModalLimit(null)

    try {
      const email = { email: newEmail }
      const res = await req.put("/company/email", email, {
        headers: {
          Authorization: `Bearer ${token as string}`
        }
      })

      const apiCompany = res.data.company

      if (!apiCompany) {
        const errorMsg =
          res.data?.error || "Erro inesperado ao atualizar empresa."
        setShowModalLimit(
          typeof errorMsg === "string"
            ? errorMsg
            : Object.values(errorMsg).flat().join(" • ")
        )
        return
      }

      if (apiCompany) {
        push("/auth/lognin")
      }

      setShowModal(true)
    } catch (err: any) {
      const errorMsg =
        err.response?.data?.error || "Erro inesperado ao atualizar empresa."
      setShowModalLimit(
        typeof errorMsg === "string"
          ? errorMsg
          : Object.values(errorMsg).flat().join(" • ")
      )
    } finally {
      setUpdate(false)
    }
  }

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="border px-1 py-2 md:px-2 md:py-3 rounded-md max-w-2xl mx-auto border-cyan-950/20 flex flex-col gap-3"
      >
        <div>
          <h2 className="font-semibold">Atualização de E-mail</h2>
        </div>
        <div>
          <Label className="my-1">E-mail atual</Label>
          <Input
            className="text-xs"
            type="text"
            disabled={true}
            value={actualEmail}
          />
        </div>
        <div>
          <Label className="my-1" htmlFor="email">
            Novo E-mail
          </Label>
          <Input
            className="text-xs"
            id="email"
            type="email"
            placeholder="Digite seu novo email:"
            required
            onChange={(e) => setNewEmail(e.target.value)}
            value={newEmail}
          />
        </div>
        <div className="flex justify-between">
          <div className={`aspect-square w-7 ${update ? "hidden" : ""}`}></div>
          {update && (
            <div className="aspect-square self-center w-7 border-4 border-blue-400 border-t-transparent rounded-full animate-spin shadow-lg"></div>
          )}
          <Button
            disabled={update}
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 transition-colors"
          >
            Salvar alterações
          </Button>
        </div>
      </form>

      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white/90 px-8 py-6 rounded-2xl shadow-2xl max-w-md w-full text-center border border-cyan-200">
            <p className="text-blue-700 text-lg font-semibold mb-6">
              Tem certeza que deseja alterar o e-mail?
            </p>
            <p className="text-blue-500 text-xs mb-3">
              Caso atualize para um email que não tenha acesso para receber o token, atualmente, sua conta se perderá para sempre.
            </p>
            <div className="flex justify-center gap-4">
              <Button
                variant="outline"
                className="px-6 py-2 border-gray-400 text-gray-700 rounded-lg hover:bg-gray-100"
                onClick={() => setShowConfirm(false)}
              >
                Cancelar
              </Button>
              <Button
                className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700"
                onClick={confirmSubmit}
              >
                Confirmar
              </Button>
            </div>
          </div>
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white/90 px-8 py-6 rounded-2xl shadow-2xl max-w-md w-full text-center border border-blue-100">
            <p className="text-blue-700 text-lg font-semibold mb-6">
              Empresa atualizada com sucesso!
            </p>
            <p className="text-xs text-blue-950">
              Você sera direcionado a página de login!
            </p>
            <Button
              variant="outline"
              className="px-6 py-2 border-blue-500 text-blue-600 font-medium rounded-lg hover:bg-blue-50"
              onClick={() => setShowModal(false)}
            >
              Fechar
            </Button>
          </div>
        </div>
      )}

      {showModalLimit && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white/90 px-8 py-6 rounded-2xl shadow-2xl max-w-md w-full text-center border border-red-100">
            <p className="text-red-700 text-lg font-semibold mb-6">
              {showModalLimit}
            </p>
            <Button
              variant="outline"
              className="px-6 py-2 border-red-500 text-red-600 font-medium rounded-lg hover:bg-red-50"
              onClick={() => setShowModalLimit(null)}
            >
              Fechar
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}