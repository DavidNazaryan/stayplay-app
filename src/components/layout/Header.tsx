import { Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export function Header() {
  return (
    <div className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 safe-top">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-2xl bg-slate-900 text-white grid place-items-center font-bold">
            SP
          </div>
          <div className="hidden sm:block">
            <div className="font-semibold leading-4">StayPlay</div>
            <div className="text-xs text-slate-500">Соцсеть активностей</div>
          </div>
        </div>
        
        {/* Mobile search - simplified */}
        <div className="flex-1 max-w-xs mx-4 md:hidden">
          <div className="relative">
            <Input 
              placeholder="Поиск" 
              className="rounded-xl pr-10 text-sm" 
            />
            <Button 
              variant="ghost" 
              size="icon" 
              className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8"
            >
              <Search className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        {/* Desktop search */}
        <div className="hidden md:flex items-center gap-2 w-80">
          <Input placeholder="Поиск" className="rounded-xl" />
          <Button variant="secondary" className="rounded-xl">
            <Search className="h-4 w-4" />
          </Button>
        </div>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="cursor-pointer touch-target">
              <AvatarImage src="https://i.pravatar.cc/150?img=1" />
              <AvatarFallback>AN</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="rounded-2xl w-56">
            <DropdownMenuLabel>Профиль</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="touch-target">Настройки</DropdownMenuItem>
            <DropdownMenuItem className="touch-target">Помощь</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-600 touch-target">Выйти</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}
