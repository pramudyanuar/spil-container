import type { ReactNode } from "react"
import { Navbar } from "../ui/navbar"

interface LayoutProps {
  children: ReactNode
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <main className="container mx-auto px-4 py-6">
        {children}
      </main>
    </div>
  )
}
