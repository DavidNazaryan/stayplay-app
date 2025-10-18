import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Separator } from '@/components/ui/separator'
import { TrendingUp, Dumbbell, Flame, Target } from 'lucide-react'
import { useAppStore } from '@/store/appStore'
import { MobileQuickActions } from '@/components/MobileQuickActions'

export function TrackerPage() {
  const { stats, integrations, updateStats, updateIntegrations, logActivity } = useAppStore()

  return (
    <div className="space-y-4">
      {/* Mobile quick actions - only show on mobile */}
      <div className="md:hidden">
        <MobileQuickActions />
      </div>
      
      <div className="grid md:grid-cols-2 gap-4">
        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <TrendingUp className="h-5 w-5" />
              Дневные цели
            </CardTitle>
            <CardDescription>Автосинхронизация из HealthKit / Google Fit / Samsung Health</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="goal">Цель по шагам</Label>
              <Input
                id="goal"
                type="number"
                className="rounded-xl mt-1"
                value={stats.goal}
                onChange={(e) => updateStats({ goal: Number(e.target.value || 0) })}
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <Button
                onClick={() => updateStats({ steps: 0 })}
                variant="secondary"
                className="rounded-xl btn-mobile"
              >
                Сбросить шаги
              </Button>
              <Button
                onClick={() => updateStats({ workouts: 0 })}
                variant="secondary"
                className="rounded-xl btn-mobile"
              >
                Сбросить тренировки
              </Button>
            </div>
            <Separator />
            <div className="grid gap-2 text-sm">
              <div className="flex items-center justify-between">
                <span>Apple Health</span>
                <Switch
                  checked={integrations.apple}
                  onCheckedChange={(checked) => updateIntegrations({ apple: checked })}
                />
              </div>
              <div className="flex items-center justify-between">
                <span>Google Fit</span>
                <Switch
                  checked={integrations.google}
                  onCheckedChange={(checked) => updateIntegrations({ google: checked })}
                />
              </div>
              <div className="flex items-center justify-between">
                <span>Samsung Health</span>
                <Switch
                  checked={integrations.samsung}
                  onCheckedChange={(checked) => updateIntegrations({ samsung: checked })}
                />
              </div>
            </div>
            <Button variant="secondary" className="w-full rounded-xl btn-mobile">
              Синхронизировать сейчас
            </Button>
          </CardContent>
        </Card>

        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <Dumbbell className="h-5 w-5" />
              Быстрый учёт
            </CardTitle>
            <CardDescription>Добавляй активность в один тап (автоновость в ленте)</CardDescription>
          </CardHeader>
          <CardContent className="grid sm:grid-cols-2 gap-3">
            <Button
              onClick={() => logActivity('steps1k')}
              className="rounded-xl btn-mobile"
            >
              <TrendingUp className="h-4 w-4 mr-2" />
              +1 000 шагов
            </Button>
            <Button
              onClick={() => logActivity('workout')}
              variant="secondary"
              className="rounded-xl btn-mobile"
            >
              <Dumbbell className="h-4 w-4 mr-2" />
              Тренировка
            </Button>
            <Button variant="secondary" className="rounded-xl btn-mobile">
              <Flame className="h-4 w-4 mr-2" />
              Растяжка
            </Button>
            <Button variant="secondary" className="rounded-xl btn-mobile">
              <Target className="h-4 w-4 mr-2" />
              Интервалы
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
