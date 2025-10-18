import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Plus, Clock, ShieldCheck, Star } from 'lucide-react'
import { useAppStore } from '@/store/appStore'
import { ReactionBar } from '@/components/ReactionBar'
import { MobileStatsCard } from '@/components/MobileStatsCard'

export function FeedPage() {
  const { feed } = useAppStore()

  return (
    <div className="space-y-4">
      {/* Mobile stats card - only show on mobile */}
      <div className="md:hidden">
        <MobileStatsCard />
      </div>
      
      {/* New activity form */}
      <Card className="rounded-2xl">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Новая активность</CardTitle>
          <CardDescription>Поделись, чем занимался(ась) сегодня</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <Textarea 
            placeholder="Например: пробежал 3 км, сделал растяжку..." 
            className="rounded-xl min-h-[100px] resize-none" 
          />
          <div className="flex flex-col sm:flex-row gap-2">
            <Button variant="secondary" className="rounded-xl btn-mobile flex-1">
              <Plus className="h-4 w-4 mr-2" />
              Добавить фото
            </Button>
            <Button className="rounded-xl btn-mobile flex-1">
              Опубликовать
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Feed posts */}
      {feed.map((post) => (
        <Card key={post.id} className="rounded-2xl">
          <CardHeader className="flex-row items-center gap-3 pb-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={post.user.avatar} />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <CardTitle className="text-base truncate">{post.user.name}</CardTitle>
              <CardDescription className="flex items-center gap-2 text-xs">
                <Clock className="h-3 w-3 flex-shrink-0" />
                только что
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="text-sm space-y-3">
            <div className="break-words">{post.text}</div>
            <ReactionBar post={post} />
          </CardContent>
          <CardFooter className="justify-between text-sm pt-3">
            <div className="flex items-center gap-2 text-xs">
              <ShieldCheck className="h-3 w-3" />
              <span className="hidden sm:inline">Безопасно и проверено</span>
              <span className="sm:hidden">Проверено</span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <Star className="h-3 w-3" />
              {post.likes}
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
