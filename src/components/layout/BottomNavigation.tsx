import { Users, TrendingUp, Triangle, BookOpen, Lock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAppStore } from '@/store/appStore'

export function BottomNavigation() {
  const { activeTab, setActiveTab } = useAppStore()

  const navItems = [
    { id: 'feed', icon: Users, label: 'Лента' },
    { id: 'tracker', icon: TrendingUp, label: 'Подсчёт' },
    { id: 'weight', icon: Triangle, label: 'Вес' },
    { id: 'courses', icon: BookOpen, label: 'Курсы' },
    { id: 'food', icon: Lock, label: 'Еда' },
  ]

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 border-t bg-white/90 backdrop-blur safe-bottom">
      <div className="mx-auto max-w-6xl grid grid-cols-5 gap-1 p-2">
        {navItems.map(({ id, icon: Icon, label }) => (
          <Button
            key={id}
            onClick={() => setActiveTab(id)}
            variant={activeTab === id ? 'default' : 'ghost'}
            className="rounded-2xl btn-mobile flex flex-col items-center gap-1 py-2"
          >
            <Icon className="h-5 w-5" />
            <span className="text-xs font-medium">{label}</span>
          </Button>
        ))}
      </div>
    </div>
  )
}
