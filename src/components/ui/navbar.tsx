import { ModeToggle } from "@/components/mode-toggle"
import { TEXTS } from "@/constants/texts"
import { Package } from "lucide-react"

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-gray-800 bg-black backdrop-blur supports-[backdrop-filter]:bg-black/60">
      <div className="container flex h-14 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <Package className="h-6 w-6 text-[#3A9542]" />
          <h1 className="text-lg font-semibold text-white">{TEXTS.appName}</h1>
        </div>
        <div className="flex items-center">
          <ModeToggle />
        </div>
      </div>
    </nav>
  )
}
