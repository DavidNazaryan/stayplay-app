import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Lock } from 'lucide-react'
import { useAppStore } from '@/store/appStore'

export function FoodPage() {
  const { stats } = useAppStore()

  return (
    <Card className="rounded-2xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl">
          <Lock className="h-5 w-5" />
          Еда — fast secret
        </CardTitle>
        <CardDescription>Скрытая фича. Откроется после уровня 7.</CardDescription>
      </CardHeader>
      <CardContent>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button disabled className="rounded-xl">
                Разблокировать
              </Button>
            </TooltipTrigger>
            <TooltipContent className="rounded-xl">
              Наберите ещё {Math.max(0, 7 - Math.floor(stats.points / 1000) - 1)} уровней
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </CardContent>
    </Card>
  )
}



