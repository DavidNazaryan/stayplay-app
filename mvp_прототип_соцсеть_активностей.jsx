import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Search, Trophy, TrendingUp, Users, Dumbbell, Star, Plus, Lock, Flame, Target, Clock, BookOpen, ShoppingCart, CheckCircle2, ShieldCheck, Heart, ThumbsUp, PartyPopper, Apple, Triangle } from "lucide-react";

// --- Demo data ---
const users = [
  { id: 1, name: "Анна", avatar: "https://i.pravatar.cc/150?img=1" },
  { id: 2, name: "Илья", avatar: "https://i.pravatar.cc/150?img=2" },
  { id: 3, name: "Мария", avatar: "https://i.pravatar.cc/150?img=3" },
  { id: 4, name: "Дмитрий", avatar: "https://i.pravatar.cc/150?img=4" },
];

const demoCourses = [
  {
    id: "c1",
    title: "5к шагов каждый день: стартовый челлендж",
    author: "@coach_vika",
    price: 0,
    rating: 4.8,
    desc: "Мягкий вход в активную жизнь за 14 дней. Без спец. оборудования.",
  },
  {
    id: "c2",
    title: "Функциональные тренировки дома",
    author: "@fit_anton",
    price: 499,
    rating: 4.9,
    desc: "20 коротких сессий по 15 минут + чек-листы и план питания.",
  },
  {
    id: "c3",
    title: "Бег с нуля до 5 км",
    author: "@run_nastia",
    price: 799,
    rating: 4.7,
    desc: "Пошаговая программа на 6 недель. Видео и голосовой коучинг.",
  },
];

const initialFeed = [
  { id: "p1", user: users[0], text: "Закрыла 8 000 шагов и тренировку на кор!", likes: 12, type: "walk", reactions: { like: 3, heart: 5, fire: 4 } },
  { id: "p2", user: users[2], text: "Пробежала 3 км за 18:45. Иду на личный рекорд!", likes: 21, type: "run", reactions: { like: 7, heart: 8, fire: 6 } },
  { id: "p3", user: users[1], text: "Взял серебро в еженедельном рейтинге🔥", likes: 7, type: "rank", reactions: { like: 2, heart: 1, fire: 3 } },
];

function Stat({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <Card className="rounded-2xl">
      <CardHeader className="pb-2">
        <CardDescription>{label}</CardDescription>
        <CardTitle className="text-3xl">{value}</CardTitle>
      </CardHeader>
      {sub && (
        <CardFooter className="pt-0">
          <Badge variant="secondary" className="rounded-xl">{sub}</Badge>
        </CardFooter>
      )}
    </Card>
  );
}

function ReactionBar({ post, onReact }: any) {
  return (
    <div className="flex items-center gap-3 text-sm">
      <Button variant="ghost" className="h-8 rounded-xl" onClick={() => onReact(post.id, "like")}><ThumbsUp className="h-4 w-4 mr-1"/>{post.reactions.like}</Button>
      <Button variant="ghost" className="h-8 rounded-xl" onClick={() => onReact(post.id, "heart")}><Heart className="h-4 w-4 mr-1"/>{post.reactions.heart}</Button>
      <Button variant="ghost" className="h-8 rounded-xl" onClick={() => onReact(post.id, "fire")}><Flame className="h-4 w-4 mr-1"/>{post.reactions.fire}</Button>
    </div>
  );
}

export default function App() {
  const [activeTab, setActiveTab] = useState("feed");
  const [feed, setFeed] = useState(initialFeed);
  const [points, setPoints] = useState(1250);
  const [level, setLevel] = useState(5);
  const [steps, setSteps] = useState(3200);
  const [calories, setCalories] = useState(450);
  const [workouts, setWorkouts] = useState(2);
  const [streak, setStreak] = useState(4);
  const [goal, setGoal] = useState(8000);
  const [courseCart, setCourseCart] = useState<string[]>([]);
  const [appleConnected, setAppleConnected] = useState(true);
  const [googleConnected, setGoogleConnected] = useState(false);
  const [samsungConnected, setSamsungConnected] = useState(false);

  // Weight tracking
  const [currentWeight, setCurrentWeight] = useState(78.0);
  const [targetWeight, setTargetWeight] = useState(72.0);
  const [newWeight, setNewWeight] = useState<string>("");
  const [weightHistory, setWeightHistory] = useState<number[]>([79.2, 78.8, 78.2, 78.0]);

  const progress = Math.min(100, Math.round((steps / goal) * 100));
  const weightProgress = Math.min(100, Math.max(0, Math.round(((weightHistory[0] - currentWeight) / (weightHistory[0] - targetWeight)) * 100)));

  const leaderboard = useMemo(
    () => [
      { user: users[2], score: 9850 },
      { user: users[0], score: 9300 },
      { user: users[1], score: 8800 },
      { user: users[3], score: 7500 },
    ],
    []
  );

  function addAutoNews(text: string, type: string = "system") {
    setFeed((f) => [
      {
        id: Math.random().toString(36).slice(2),
        user: users[0],
        text,
        likes: 0,
        type,
        reactions: { like: 0, heart: 0, fire: 0 },
      },
      ...f,
    ]);
  }

  function logActivity(kind: "steps1k" | "workout") {
    if (kind === "steps1k") {
      setSteps((s) => s + 1000);
      setCalories((c) => c + 40);
      setPoints((p) => p + 20);
      addAutoNews("Автоновость: +1 000 шагов синхронизировано", "walk");
    } else {
      setWorkouts((w) => w + 1);
      setCalories((c) => c + 220);
      setPoints((p) => p + 50);
      // 2) Автоматическая новость после тренировки
      addAutoNews("Автоновость: тренировка выполнена ✅", "workout");
    }
    if (Math.random() > 0.7) setLevel((l) => l + 1);
    setStreak((st) => st + 1);
  }

  function joinChallenge() {
    addAutoNews("Вступил(а) в челлендж 'Неделя без лифта'", "rank");
  }

  function toggleCart(id: string) {
    setCourseCart((c) => (c.includes(id) ? c.filter((x) => x !== id) : [...c, id]));
  }

  function onReact(postId: string, kind: "like" | "heart" | "fire") {
    setFeed((f) =>
      f.map((p) => (p.id === postId ? { ...p, reactions: { ...p.reactions, [kind]: p.reactions[kind] + 1 } } : p))
    );
  }

  function addWeightEntry() {
    const val = parseFloat(newWeight);
    if (!isNaN(val)) {
      setCurrentWeight(val);
      setWeightHistory((h) => [...h.slice(-7), val]);
      setNewWeight("");
      addAutoNews(`Обновлён вес: ${val.toFixed(1)} кг`, "weight");
    }
  }

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-gradient-to-b from-white to-slate-50 text-slate-900">
        {/* Top bar */}
        <div className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
          <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-2xl bg-slate-900 text-white grid place-items-center font-bold">SP</div>
              <div>
                <div className="font-semibold leading-4">StayPlay</div>
                <div className="text-xs text-slate-500">Соцсеть активностей</div>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-2 w-80">
              <Input placeholder="Поиск" className="rounded-xl" />
              <Button variant="secondary" className="rounded-xl"><Search className="h-4 w-4"/></Button>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage src={users[0].avatar} />
                  <AvatarFallback>AN</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="rounded-2xl">
                <DropdownMenuLabel>Профиль</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Настройки</DropdownMenuItem>
                <DropdownMenuItem>Помощь</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-600">Выйти</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Content */}
        <div className="mx-auto max-w-6xl px-4 py-6">
          <div className="grid gap-6 md:grid-cols-3">
            {/* Left column: profile + stats */}
            <div className="md:col-span-1 space-y-6">
              <Card className="rounded-2xl">
                <CardHeader className="flex-row items-center gap-4">
                  <Avatar className="h-14 w-14">
                    <AvatarImage src={users[0].avatar} />
                    <AvatarFallback>AN</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle>Анна Н.</CardTitle>
                    <CardDescription>Уровень {level} • {points} очков</CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <div className="text-sm mb-1">Прогресс цели по шагам ({goal.toLocaleString()}): {progress}%</div>
                    <Progress value={progress} className="h-2" />
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Flame className="h-4 w-4"/> Серия дней: <b className="ml-1">{streak}</b>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="flex items-center gap-2"><TrendingUp className="h-4 w-4"/> {steps.toLocaleString()} шагов</div>
                    <div className="flex items-center gap-2"><PartyPopper className="h-4 w-4"/> {calories} ккал</div>
                  </div>
                  <div className="flex items-center justify-between">
                    <Button onClick={() => logActivity("steps1k")} className="rounded-xl" variant="secondary"><TrendingUp className="h-4 w-4 mr-2"/> +1000 шагов</Button>
                    <Button onClick={() => logActivity("workout")} className="rounded-xl"><Dumbbell className="h-4 w-4 mr-2"/> Тренировка</Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="rounded-2xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-xl"><Trophy className="h-5 w-5"/> Рейтинг недели</CardTitle>
                  <CardDescription>Соревнования с друзьями</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {leaderboard.map((row, idx) => (
                    <div key={row.user.id} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Badge className="rounded-full w-7 h-7 grid place-items-center" variant={idx === 0 ? "default" : "secondary"}>{idx + 1}</Badge>
                        <Avatar className="h-8 w-8"><AvatarImage src={row.user.avatar}/><AvatarFallback>U</AvatarFallback></Avatar>
                        <div className="text-sm">{row.user.name}</div>
                      </div>
                      <div className="text-sm font-semibold">{row.score.toLocaleString()} pts</div>
                    </div>
                  ))}
                  <Separator className="my-2"/>
                  <Button onClick={joinChallenge} className="w-full rounded-xl" variant="secondary"><Target className="mr-2 h-4 w-4"/> Присоединиться к челленджу</Button>
                </CardContent>
              </Card>

              {/* Connectors */}
              <Card className="rounded-2xl">
                <CardHeader>
                  <CardTitle className="text-xl flex items-center gap-2"><Apple className="h-5 w-5"/> Интеграции здоровья</CardTitle>
                  <CardDescription>Шаги, калории и вес из Apple Health / Google Fit / Samsung Health</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="text-sm">Apple Health (HealthKit)</div>
                    <Switch checked={appleConnected} onCheckedChange={setAppleConnected} />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-sm">Google Fit</div>
                    <Switch checked={googleConnected} onCheckedChange={setGoogleConnected} />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-sm">Samsung Health</div>
                    <Switch checked={samsungConnected} onCheckedChange={setSamsungConnected} />
                  </div>
                  <Separator />
                  <Button variant="secondary" className="w-full rounded-xl">Синхронизировать сейчас</Button>
                </CardContent>
              </Card>

              {/* Weight quick card */}
              <Card className="rounded-2xl">
                <CardHeader>
                  <CardTitle className="text-xl">Вес</CardTitle>
                  <CardDescription>Текущий: {currentWeight.toFixed(1)} кг • Цель: {targetWeight.toFixed(1)} кг</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-sm mb-1">Прогресс к цели: {weightProgress}%</div>
                  <Progress value={weightProgress} className="h-2"/>
                </CardContent>
              </Card>
            </div>

            {/* Main column: tabs */}
            <div className="md:col-span-2 space-y-6">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="rounded-2xl grid grid-cols-5 w-full">
                  <TabsTrigger value="feed" className="rounded-xl flex items-center gap-2"><Users className="h-4 w-4"/> Лента</TabsTrigger>
                  <TabsTrigger value="tracker" className="rounded-xl flex items-center gap-2"><TrendingUp className="h-4 w-4"/> Подсчёт</TabsTrigger>
                  <TabsTrigger value="weight" className="rounded-xl flex items-center gap-2"><Triangle className="h-4 w-4 rotate-180"/> Вес</TabsTrigger>
                  <TabsTrigger value="courses" className="rounded-xl flex items-center gap-2"><BookOpen className="h-4 w-4"/> Курсы</TabsTrigger>
                  <TabsTrigger value="food" className="rounded-xl flex items-center gap-2"><Lock className="h-4 w-4"/> Еда</TabsTrigger>
                </TabsList>

                {/* FEED */}
                <TabsContent value="feed" className="mt-4">
                  <div className="grid gap-4">
                    <Card className="rounded-2xl">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg">Новая активность</CardTitle>
                        <CardDescription>Поделись, чем занимался(ась) сегодня</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <Textarea placeholder="Например: пробежал 3 км, сделал растяжку..." className="rounded-xl" />
                        <div className="flex items-center gap-2">
                          <Button variant="secondary" className="rounded-xl"><Plus className="h-4 w-4 mr-2"/> Добавить фото</Button>
                          <Button className="rounded-xl">Опубликовать</Button>
                        </div>
                      </CardContent>
                    </Card>

                    <AnimatePresence>
                      {feed.map((post) => (
                        <motion.div key={post.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                          <Card className="rounded-2xl">
                            <CardHeader className="flex-row items-center gap-3">
                              <Avatar className="h-10 w-10"><AvatarImage src={post.user.avatar}/><AvatarFallback>U</AvatarFallback></Avatar>
                              <div>
                                <CardTitle className="text-base">{post.user.name}</CardTitle>
                                <CardDescription className="flex items-center gap-2 text-xs"><Clock className="h-3 w-3"/>только что</CardDescription>
                              </div>
                            </CardHeader>
                            <CardContent className="text-sm space-y-3">
                              <div>{post.text}</div>
                              {/* 3) Реакции к постам */}
                              <ReactionBar post={post} onReact={onReact} />
                            </CardContent>
                            <CardFooter className="justify-between text-sm">
                              <div className="flex items-center gap-2"><ShieldCheck className="h-4 w-4"/> Безопасно и проверено</div>
                              <div className="flex items-center gap-2"><Star className="h-4 w-4"/> {post.likes}</div>
                            </CardFooter>
                          </Card>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                </TabsContent>

                {/* TRACKER */}
                <TabsContent value="tracker" className="mt-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <Card className="rounded-2xl">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-xl"><TrendingUp className="h-5 w-5"/> Дневные цели</CardTitle>
                        <CardDescription>Автосинхронизация из HealthKit / Google Fit / Samsung Health</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <Label htmlFor="goal">Цель по шагам</Label>
                          <Input id="goal" type="number" className="rounded-xl mt-1" value={goal} onChange={(e) => setGoal(Number(e.target.value || 0))} />
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <Button onClick={() => setSteps(0)} variant="secondary" className="rounded-xl">Сбросить шаги</Button>
                          <Button onClick={() => setWorkouts(0)} variant="secondary" className="rounded-xl">Сбросить тренировки</Button>
                        </div>
                        <Separator />
                        <div className="grid gap-2 text-sm">
                          <div className="flex items-center justify-between"><span>Apple Health</span><Switch checked={appleConnected} onCheckedChange={setAppleConnected} /></div>
                          <div className="flex items-center justify-between"><span>Google Fit</span><Switch checked={googleConnected} onCheckedChange={setGoogleConnected} /></div>
                          <div className="flex items-center justify-between"><span>Samsung Health</span><Switch checked={samsungConnected} onCheckedChange={setSamsungConnected} /></div>
                        </div>
                        <Button variant="secondary" className="w-full rounded-xl">Синхронизировать сейчас</Button>
                      </CardContent>
                    </Card>

                    <Card className="rounded-2xl">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-xl"><Dumbbell className="h-5 w-5"/> Быстрый учёт</CardTitle>
                        <CardDescription>Добавляй активность в один тап (автоновость в ленте)</CardDescription>
                      </CardHeader>
                      <CardContent className="grid sm:grid-cols-2 gap-3">
                        <Button onClick={() => logActivity("steps1k")} className="rounded-xl"><TrendingUp className="h-4 w-4 mr-2"/> +1 000 шагов</Button>
                        <Button onClick={() => logActivity("workout")} variant="secondary" className="rounded-xl"><Dumbbell className="h-4 w-4 mr-2"/> Тренировка</Button>
                        <Button variant="secondary" className="rounded-xl"><Flame className="h-4 w-4 mr-2"/> Растяжка</Button>
                        <Button variant="secondary" className="rounded-xl"><Target className="h-4 w-4 mr-2"/> Интервалы</Button>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                {/* WEIGHT */}
                <TabsContent value="weight" className="mt-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <Card className="rounded-2xl">
                      <CardHeader>
                        <CardTitle className="text-xl">Контроль веса</CardTitle>
                        <CardDescription>Синхронизация с приложениями здоровья или ручной ввод</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="text-sm">Текущий вес: <b>{currentWeight.toFixed(1)} кг</b></div>
                        <div className="text-sm mb-1">Прогресс к цели ({targetWeight.toFixed(1)} кг): {weightProgress}%</div>
                        <Progress value={weightProgress} className="h-2"/>
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <Label htmlFor="weight">Новый вес (кг)</Label>
                            <Input id="weight" value={newWeight} onChange={(e) => setNewWeight(e.target.value)} placeholder="например, 77.6" className="rounded-xl mt-1"/>
                          </div>
                          <div>
                            <Label htmlFor="wgoal">Цель (кг)</Label>
                            <Input id="wgoal" type="number" value={targetWeight} onChange={(e) => setTargetWeight(parseFloat(e.target.value || "0"))} className="rounded-xl mt-1"/>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button onClick={addWeightEntry} className="rounded-xl">Сохранить</Button>
                          <Button variant="secondary" className="rounded-xl">Импорт из Health</Button>
                        </div>
                        <Separator />
                        <div className="text-xs text-slate-500">Последние записи: {weightHistory.slice(-5).map((w)=>w.toFixed(1)).join(" • ")}</div>
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
                </TabsContent>

                {/* COURSES */}
                <TabsContent value="courses" className="mt-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    {demoCourses.map((c) => (
                      <Card key={c.id} className="rounded-2xl">
                        <CardHeader>
                          <CardTitle className="text-lg flex items-center justify-between">
                            {c.title}
                            <Badge className="rounded-xl" variant="secondary">{c.rating}★</Badge>
                          </CardTitle>
                          <CardDescription>{c.author} • {c.price === 0 ? "бесплатно" : `${c.price} ₽`}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-slate-700">{c.desc}</p>
                        </CardContent>
                        <CardFooter className="justify-between">
                          <Button variant="secondary" className="rounded-xl" onClick={() => toggleCart(c.id)}>
                            <ShoppingCart className="h-4 w-4 mr-2"/>
                            {courseCart.includes(c.id) ? "В корзине" : "Добавить"}
                          </Button>
                          <Button className="rounded-xl">
                            <CheckCircle2 className="h-4 w-4 mr-2"/> Записаться
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}

                    {/* Форма добавления курса */}
                    <Card className="rounded-2xl border-dashed">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-xl"><Plus className="h-5 w-5"/> Добавить свой курс</CardTitle>
                        <CardDescription>Фрилансер загружает курс — получает процент с продаж</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <Input className="rounded-xl" placeholder="Название курса" />
                        <Textarea className="rounded-xl" placeholder="Краткое описание" />
                        <div className="grid grid-cols-2 gap-2">
                          <Input className="rounded-xl" type="number" placeholder="Цена, ₽ (0 — бесплатно)" />
                          <Input className="rounded-xl" placeholder="Ваш @ник" />
                        </div>
                        <Button className="rounded-xl" variant="secondary">Загрузить материалы</Button>
                      </CardContent>
                      <CardFooter>
                        <Button className="rounded-xl">Опубликовать</Button>
                      </CardFooter>
                    </Card>
                  </div>
                </TabsContent>

                {/* FOOD (secret) */}
                <TabsContent value="food" className="mt-4">
                  <Card className="rounded-2xl">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-xl"><Lock className="h-5 w-5"/> Еда — fast secret</CardTitle>
                      <CardDescription>Скрытая фича. Откроется после уровня 7.</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button disabled className="rounded-xl">Разблокировать</Button>
                        </TooltipTrigger>
                        <TooltipContent className="rounded-xl">Наберите ещё {Math.max(0, 7 - level)} уровней</TooltipContent>
                      </Tooltip>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>

        {/* Bottom bar (mobile) */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 border-t bg-white/90 backdrop-blur">
          <div className="mx-auto max-w-6xl grid grid-cols-5 gap-1 p-2">
            <Button onClick={() => setActiveTab("feed")} variant={activeTab === "feed" ? "default" : "ghost"} className="rounded-2xl"><Users className="h-4 w-4"/></Button>
            <Button onClick={() => setActiveTab("tracker")} variant={activeTab === "tracker" ? "default" : "ghost"} className="rounded-2xl"><TrendingUp className="h-4 w-4"/></Button>
            <Button onClick={() => setActiveTab("weight")} variant={activeTab === "weight" ? "default" : "ghost"} className="rounded-2xl"><Triangle className="h-4 w-4 rotate-180"/></Button>
            <Button onClick={() => setActiveTab("courses")} variant={activeTab === "courses" ? "default" : "ghost"} className="rounded-2xl"><BookOpen className="h-4 w-4"/></Button>
            <Button onClick={() => setActiveTab("food")} variant={activeTab === "food" ? "default" : "ghost"} className="rounded-2xl"><Lock className="h-4 w-4"/></Button>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}
