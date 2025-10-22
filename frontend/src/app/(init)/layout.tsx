import "../globals.css"
import { Header } from "@/components/layout/header";

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      className={`py-3 px-8 min-h-screen bg-gradient-to-br from-[#2825eb] via-[#1915eb] to-[#5403d6]`}
    >
      <Header />
      {children}
    </div>
  )
}
