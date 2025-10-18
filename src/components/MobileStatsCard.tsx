import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { TrendingUp, PartyPopper, Flame, Dumbbell } from 'lucide-react'
import { useAppStore } from '@/store/appStore'
import { calculateProgress } from '@/lib/utils'

export function MobileStatsCard() {
  const { stats, logActivity } = useAppStore()
  
  const progress = calculateProgress(stats.steps, stats.goal)
  const level = Math.floor(stats.points / 1000) + 1

  return (
    <Card className="rounded-2xl">
      <CardHeader className="flex-row items-center gap-4">
        <div className="h-14 w-14 rounded-2xl bg-slate-900 text-white grid place-items-center font-bold text-lg">
          SP
        </div>
        <div className="flex-1">
          <CardTitle className="text-lg">Анна Н.</CardTitle>
          <CardDescription>Уровень {level} • {stats.points.toLocaleString()} очков</CardDescription>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Progress bar */}
        <div>
          <div className="text-sm mb-2">
            Прогресс цели по шагам ({stats.goal.toLocaleString()}): {progress}%
          </div>
          <Progress value={progress} className="h-3" />
        </div>
        
        {/* Streak */}
        <div className="flex items-center gap-2 text-sm">
          <Flame className="h-4 w-4 text-orange-500" />
          <span>Серия дней: <b className="ml-1">{stats.streak}</b></span>
        </div>
        
        {/* Stats grid */}
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-blue-500" />
            <span>{stats.steps.toLocaleString()} шагов</span>
          </div>
          <div className="flex items-center gap-2">
            <PartyPopper className="h-4 w-4 text-green-500" />
            <span>{stats.calories} ккал</span>
          </div>
        </div>
        
        {/* Quick action buttons */}
        <div className="grid grid-cols-2 gap-2">
          <Button 
            onClick={() => logActivity('steps1k')} 
            className="rounded-xl btn-mobile"
            variant="secondary"
          >
            <TrendingUp className="h-4 w-4 mr-2" />
            +1000 шагов
          </Button>
          <Button 
            onClick={() => logActivity('workout')} 
            className="rounded-xl btn-mobile"
          >
            <Dumbbell className="h-4 w-4 mr-2" />
            Тренировка
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

