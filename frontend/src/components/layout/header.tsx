"use client"

import { useState } from "react"
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "../ui/sheet"
import { Logo } from "@/components/layout/logo"
import { MenuItem } from "./menu-item"

export const Header = () => {
  const [open, setOpen] = useState(false)

  return (
    <header className="mb-10 sm:mb-0">
      <div className="flex">
        <div className="flex flex-1 h-8 p-1 items-center">
          <Logo/>
        </div>
        <div className="sm:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <div className="cursor-pointer hover:opacity-80 active:opacity-80">
                <div className="w-5 bg-white h-1 m-1 rounded-md"></div>
                <div className="w-5 bg-white h-1 m-1 rounded-md"></div>
              </div>
            </SheetTrigger>
            <SheetContent side="right" className="bg-[#232381] rounded-md border-none p-5">
              <SheetTitle>
                <div className="flex flex-1 h-8 p-1 items-center"><Logo/></div>
              </SheetTitle>
              <SheetDescription></SheetDescription>
              <nav className="h-full pb-28">
                <MenuItem onClickItem={() => setOpen(false)} />
              </nav>
            </SheetContent>
          </Sheet>
        </div>
        <div className="hidden sm:flex">
          <nav className="mb-20">
            <MenuItem />
          </nav>
        </div>
      </div>
    </header>
  )
}