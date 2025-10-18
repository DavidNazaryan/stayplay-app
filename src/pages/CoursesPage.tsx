import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Plus, ShoppingCart, CheckCircle2 } from 'lucide-react'
import { useAppStore } from '@/store/appStore'

const demoCourses = [
  {
    id: 'c1',
    title: '5к шагов каждый день: стартовый челлендж',
    author: '@coach_vika',
    price: 0,
    rating: 4.8,
    description: 'Мягкий вход в активную жизнь за 14 дней. Без спец. оборудования.',
  },
  {
    id: 'c2',
    title: 'Функциональные тренировки дома',
    author: '@fit_anton',
    price: 499,
    rating: 4.9,
    description: '20 коротких сессий по 15 минут + чек-листы и план питания.',
  },
  {
    id: 'c3',
    title: 'Бег с нуля до 5 км',
    author: '@run_nastia',
    price: 799,
    rating: 4.7,
    description: 'Пошаговая программа на 6 недель. Видео и голосовой коучинг.',
  },
]

export function CoursesPage() {
  const { courseCart, toggleCourseCart } = useAppStore()

  return (
    <div className="grid md:grid-cols-2 gap-4">
      {demoCourses.map((course) => (
        <Card key={course.id} className="rounded-2xl">
          <CardHeader>
            <CardTitle className="text-lg flex items-center justify-between">
              {course.title}
              <Badge className="rounded-xl" variant="secondary">
                {course.rating}★
              </Badge>
            </CardTitle>
            <CardDescription>
              {course.author} • {course.price === 0 ? 'бесплатно' : `${course.price} ₽`}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-slate-700">{course.description}</p>
          </CardContent>
          <CardFooter className="justify-between">
            <Button
              variant="secondary"
              className="rounded-xl"
              onClick={() => toggleCourseCart(course.id)}
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              {courseCart.includes(course.id) ? 'В корзине' : 'Добавить'}
            </Button>
            <Button className="rounded-xl">
              <CheckCircle2 className="h-4 w-4 mr-2" />
              Записаться
            </Button>
          </CardFooter>
        </Card>
      ))}

      {/* Форма добавления курса */}
      <Card className="rounded-2xl border-dashed">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl">
            <Plus className="h-5 w-5" />
            Добавить свой курс
          </CardTitle>
          <CardDescription>Фрилансер загружает курс — получает процент с продаж</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <Input className="rounded-xl" placeholder="Название курса" />
          <Textarea className="rounded-xl" placeholder="Краткое описание" />
          <div className="grid grid-cols-2 gap-2">
            <Input className="rounded-xl" type="number" placeholder="Цена, ₽ (0 — бесплатно)" />
            <Input className="rounded-xl" placeholder="Ваш @ник" />
          </div>
          <Button className="rounded-xl" variant="secondary">
            Загрузить материалы
          </Button>
        </CardContent>
        <CardFooter>
          <Button className="rounded-xl">Опубликовать</Button>
        </CardFooter>
      </Card>
    </div>
  )
}



