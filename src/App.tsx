import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AppLayout } from '@/components/layout/AppLayout'
import { FeedPage } from '@/pages/FeedPage'
import { TrackerPage } from '@/pages/TrackerPage'
import { WeightPage } from '@/pages/WeightPage'
import { CoursesPage } from '@/pages/CoursesPage'
import { FoodPage } from '@/pages/FoodPage'

function App() {
  return (
    <Router>
      <AppLayout>
        <Routes>
          <Route path="/" element={<FeedPage />} />
          <Route path="/tracker" element={<TrackerPage />} />
          <Route path="/weight" element={<WeightPage />} />
          <Route path="/courses" element={<CoursesPage />} />
          <Route path="/food" element={<FoodPage />} />
        </Routes>
      </AppLayout>
    </Router>
  )
}

export default App



