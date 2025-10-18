import { ReactNode } from 'react'
import { Header } from './Header'
import { BottomNavigation } from './BottomNavigation'

interface AppLayoutProps {
  children: ReactNode
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50 text-slate-900 flex flex-col">
      <Header />
      <main className="flex-1 mx-auto max-w-6xl px-4 py-4 md:py-6 pb-20 md:pb-6">
        {children}
      </main>
      <BottomNavigation />
    </div>
  )
}
