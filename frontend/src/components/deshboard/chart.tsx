import { LineChart, Line, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts"
import { ChartConfig, ChartContainer, ChartTooltipContent } from "@/components/ui/chart"
import { Inter } from "@/types/inter"

export const Chart = ({ date }: { date: Inter[] }) => {
  const created = date.map(e => e.createAt)
  const apenasDatas = created.map(d => new Date(d).toISOString().split("T")[0])

  const contagem = apenasDatas.reduce<Record<string, number>>((acc, data) => {
    acc[data] = (acc[data] || 0) + 1
    return acc
  }, {})

  let interacoesPorDia = Object.entries(contagem).map(([data, interacoes]) => ({
    data,
    interacoes
  }))

  const hoje = new Date().toISOString().split("T")[0]
  if (!interacoesPorDia.find(d => d.data === hoje)) {
    interacoesPorDia.push({ data: hoje, interacoes: 0 })
  }

  interacoesPorDia.sort((a, b) => a.data.localeCompare(b.data))

  const hojeObj = interacoesPorDia.find(d => d.data === hoje)
  if (hojeObj) {
    interacoesPorDia = interacoesPorDia.filter(d => d.data !== hoje)
    interacoesPorDia.push(hojeObj)
  }

  interacoesPorDia = interacoesPorDia.slice(-20)

  const chartConfig = {
    interacoes: {
      label: "Interações",
      color: "#2563eb"
    }
  } satisfies ChartConfig

  return (
    <ChartContainer config={chartConfig} className="w-60 h-60 sm:w-full mx-auto">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={interacoesPorDia}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="data"
            tickFormatter={date => {
              const d = new Date(date)
              return `${d.getDate()}/${d.getMonth() + 1}`
            }}
            interval={0}
            tick={{ fontSize: 10 }}
            angle={-20}
            textAnchor="end"
          />
          <YAxis tick={{ fontSize: 10 }} />
          <Line
            type="monotone"
            dataKey="interacoes"
            stroke={chartConfig.interacoes.color}
            dot={{ r: 4 }}
          />
          <Tooltip content={<ChartTooltipContent />} />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
