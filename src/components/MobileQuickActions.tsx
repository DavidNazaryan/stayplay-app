import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { TrendingUp, Dumbbell, Flame, Target } from 'lucide-react'
import { useAppStore } from '@/store/appStore'

export function MobileQuickActions() {
  const { logActivity } = useAppStore()

  const quickActions = [
    {
      id: 'steps1k',
      icon: TrendingUp,
      label: '+1000 шагов',
      color: 'text-blue-500',
      bgColor: 'bg-blue-50',
      action: () => logActivity('steps1k'),
    },
    {
      id: 'workout',
      icon: Dumbbell,
      label: 'Тренировка',
      color: 'text-green-500',
      bgColor: 'bg-green-50',
      action: () => logActivity('workout'),
    },
    {
      id: 'stretch',
      icon: Flame,
      label: 'Растяжка',
      color: 'text-orange-500',
      bgColor: 'bg-orange-50',
      action: () => console.log('Растяжка'),
    },
    {
      id: 'intervals',
      icon: Target,
      label: 'Интервалы',
      color: 'text-purple-500',
      bgColor: 'bg-purple-50',
      action: () => console.log('Интервалы'),
    },
  ]

  return (
    <Card className="rounded-2xl">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Быстрые действия</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3">
          {quickActions.map(({ id, icon: Icon, label, color, bgColor, action }) => (
            <Button
              key={id}
              onClick={action}
              variant="ghost"
              className={`rounded-xl btn-mobile h-16 flex flex-col items-center gap-2 ${bgColor} hover:opacity-80`}
            >
              <Icon className={`h-6 w-6 ${color}`} />
              <span className="text-xs font-medium">{label}</span>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

