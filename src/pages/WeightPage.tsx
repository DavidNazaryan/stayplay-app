import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Progress } from '@/components/ui/progress'
import { Separator } from '@/components/ui/separator'
import { useAppStore } from '@/store/appStore'
import { calculateWeightProgress } from '@/lib/utils'

export function WeightPage() {
  const { stats, updateStats, addWeightEntry } = useAppStore()
  const [newWeight, setNewWeight] = React.useState('')

  const weightProgress = calculateWeightProgress(
    stats.currentWeight,
    stats.targetWeight,
    stats.weightHistory[0]
  )

  const handleAddWeight = () => {
    const weight = parseFloat(newWeight)
    if (!isNaN(weight)) {
      addWeightEntry(weight)
      setNewWeight('')
    }
  }

  return (
    <div className="grid md:grid-cols-2 gap-4">
      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle className="text-xl">Контроль веса</CardTitle>
          <CardDescription>Синхронизация с приложениями здоровья или ручной ввод</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="text-sm">
            Текущий вес: <b>{stats.currentWeight.toFixed(1)} кг</b>
          </div>
          <div className="text-sm mb-1">
            Прогресс к цели ({stats.targetWeight.toFixed(1)} кг): {weightProgress}%
          </div>
          <Progress value={weightProgress} className="h-2" />
          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label htmlFor="weight">Новый вес (кг)</Label>
              <Input
                id="weight"
                value={newWeight}
                onChange={(e) => setNewWeight(e.target.value)}
                placeholder="например, 77.6"
                className="rounded-xl mt-1"
              />
            </div>
            <div>
              <Label htmlFor="wgoal">Цель (кг)</Label>
              <Input
                id="wgoal"
                type="number"
                value={stats.targetWeight}
                onChange={(e) => updateStats({ targetWeight: parseFloat(e.target.value || '0') })}
                className="rounded-xl mt-1"
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button onClick={handleAddWeight} className="rounded-xl">
              Сохранить
            </Button>
            <Button variant="secondary" className="rounded-xl">
              Импорт из Health
            </Button>
          </div>
          <Separator />
          <div className="text-xs text-slate-500">
            Последние записи: {stats.weightHistory.slice(-5).map((w) => w.toFixed(1)).join(' • ')}
          </div>
        </CardContent>
      </Card>

      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle className="text-xl">Полезно знать</CardTitle>
          <CardDescription>Вес обновляется автоматически при синхронизации</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <div>• Для iOS используем HealthKit (требуются разрешения на шаги, калории и вес).</div>
          <div>• Для Android — Google Fit / Samsung Health (те же разрешения).</div>
          <div>• Ручной ввод создаёт запись и автоновость в ленте.</div>
        </CardContent>
      </Card>
    </div>
  )
}

