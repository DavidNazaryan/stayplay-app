// User types
export interface User {
  id: number
  name: string
  avatar: string
  level: number
  points: number
  streak: number
}

// Activity types
export interface Activity {
  id: string
  user: User
  text: string
  likes: number
  type: 'walk' | 'run' | 'workout' | 'rank' | 'weight' | 'system'
  reactions: {
    like: number
    heart: number
    fire: number
  }
  createdAt: Date
}

// Course types
export interface Course {
  id: string
  title: string
  author: string
  price: number
  rating: number
  description: string
  image?: string
}

// Stats types
export interface UserStats {
  steps: number
  calories: number
  workouts: number
  goal: number
  currentWeight: number
  targetWeight: number
  weightHistory: number[]
  points: number
  streak: number
}

// Health integration types
export interface HealthIntegration {
  apple: boolean
  google: boolean
  samsung: boolean
}

// Leaderboard types
export interface LeaderboardEntry {
  user: User
  score: number
  position: number
}

// App state types
export interface AppState {
  activeTab: string
  feed: Activity[]
  stats: UserStats
  integrations: HealthIntegration
  leaderboard: LeaderboardEntry[]
  courseCart: string[]
}

