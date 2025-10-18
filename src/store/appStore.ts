import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import type { AppState, User, Activity, UserStats, HealthIntegration, LeaderboardEntry } from '@/types'

interface AppStore extends AppState {
  // Actions
  setActiveTab: (tab: string) => void
  addActivity: (activity: Omit<Activity, 'id' | 'createdAt'>) => void
  updateActivity: (id: string, updates: Partial<Activity>) => void
  updateStats: (updates: Partial<UserStats>) => void
  updateIntegrations: (updates: Partial<HealthIntegration>) => void
  toggleCourseCart: (courseId: string) => void
  logActivity: (type: 'steps1k' | 'workout') => void
  addWeightEntry: (weight: number) => void
}

const initialUsers: User[] = [
  { id: 1, name: 'Анна', avatar: 'https://i.pravatar.cc/150?img=1', level: 5, points: 1250, streak: 4 },
  { id: 2, name: 'Илья', avatar: 'https://i.pravatar.cc/150?img=2', level: 4, points: 8800, streak: 2 },
  { id: 3, name: 'Мария', avatar: 'https://i.pravatar.cc/150?img=3', level: 6, points: 9850, streak: 7 },
  { id: 4, name: 'Дмитрий', avatar: 'https://i.pravatar.cc/150?img=4', level: 3, points: 7500, streak: 1 },
]

const initialFeed: Activity[] = [
  {
    id: 'p1',
    user: initialUsers[0],
    text: 'Закрыла 8 000 шагов и тренировку на кор!',
    likes: 12,
    type: 'walk',
    reactions: { like: 3, heart: 5, fire: 4 },
    createdAt: new Date(),
  },
  {
    id: 'p2',
    user: initialUsers[2],
    text: 'Пробежала 3 км за 18:45. Иду на личный рекорд!',
    likes: 21,
    type: 'run',
    reactions: { like: 7, heart: 8, fire: 6 },
    createdAt: new Date(),
  },
  {
    id: 'p3',
    user: initialUsers[1],
    text: 'Взял серебро в еженедельном рейтинге🔥',
    likes: 7,
    type: 'rank',
    reactions: { like: 2, heart: 1, fire: 3 },
    createdAt: new Date(),
  },
]

const initialStats: UserStats = {
  steps: 3200,
  calories: 450,
  workouts: 2,
  goal: 8000,
  currentWeight: 78.0,
  targetWeight: 72.0,
  weightHistory: [79.2, 78.8, 78.2, 78.0],
  points: 1250,
  streak: 4,
}

const initialIntegrations: HealthIntegration = {
  apple: true,
  google: false,
  samsung: false,
}

const initialLeaderboard: LeaderboardEntry[] = [
  { user: initialUsers[2], score: 9850, position: 1 },
  { user: initialUsers[0], score: 9300, position: 2 },
  { user: initialUsers[1], score: 8800, position: 3 },
  { user: initialUsers[3], score: 7500, position: 4 },
]

export const useAppStore = create<AppStore>()(
  devtools(
    (set, get) => ({
      // Initial state
      activeTab: 'feed',
      feed: initialFeed,
      stats: initialStats,
      integrations: initialIntegrations,
      leaderboard: initialLeaderboard,
      courseCart: [],

      // Actions
      setActiveTab: (tab) => set({ activeTab: tab }),

      addActivity: (activity) => {
        const newActivity: Activity = {
          ...activity,
          id: Math.random().toString(36).slice(2),
          createdAt: new Date(),
        }
        set((state) => ({
          feed: [newActivity, ...state.feed],
        }))
      },

      updateActivity: (id, updates) => {
        set((state) => ({
          feed: state.feed.map((activity) =>
            activity.id === id ? { ...activity, ...updates } : activity
          ),
        }))
      },

      updateStats: (updates) => {
        set((state) => ({
          stats: { ...state.stats, ...updates },
        }))
      },

      updateIntegrations: (updates) => {
        set((state) => ({
          integrations: { ...state.integrations, ...updates },
        }))
      },

      toggleCourseCart: (courseId) => {
        set((state) => ({
          courseCart: state.courseCart.includes(courseId)
            ? state.courseCart.filter((id) => id !== courseId)
            : [...state.courseCart, courseId],
        }))
      },

      logActivity: (type) => {
        const { stats } = get()
        const updates: Partial<UserStats> = {}

        if (type === 'steps1k') {
          updates.steps = stats.steps + 1000
          updates.calories = stats.calories + 40
        } else if (type === 'workout') {
          updates.workouts = stats.workouts + 1
          updates.calories = stats.calories + 220
        }

        // Add points and potentially level up
        const newPoints = stats.points + (type === 'steps1k' ? 20 : 50)

        set((state) => ({
          stats: {
            ...state.stats,
            ...updates,
            points: newPoints,
          },
          feed: [
            {
              id: Math.random().toString(36).slice(2),
              user: initialUsers[0],
              text: `Автоновость: ${type === 'steps1k' ? '+1 000 шагов синхронизировано' : 'тренировка выполнена ✅'}`,
              likes: 0,
              type: type === 'steps1k' ? 'walk' : 'workout',
              reactions: { like: 0, heart: 0, fire: 0 },
              createdAt: new Date(),
            },
            ...state.feed,
          ],
        }))
      },

      addWeightEntry: (weight) => {
        set((state) => {
          const newWeightHistory = [...state.stats.weightHistory.slice(-7), weight]
          return {
            stats: {
              ...state.stats,
              currentWeight: weight,
              weightHistory: newWeightHistory,
            },
            feed: [
              {
                id: Math.random().toString(36).slice(2),
                user: initialUsers[0],
                text: `Обновлён вес: ${weight.toFixed(1)} кг`,
                likes: 0,
                type: 'weight',
                reactions: { like: 0, heart: 0, fire: 0 },
                createdAt: new Date(),
              },
              ...state.feed,
            ],
          }
        })
      },
    }),
    {
      name: 'stayplay-store',
    }
  )
)

