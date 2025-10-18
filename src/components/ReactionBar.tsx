import { ThumbsUp, Heart, Flame } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAppStore } from '@/store/appStore'
import type { Activity } from '@/types'

interface ReactionBarProps {
  post: Activity
}

export function ReactionBar({ post }: ReactionBarProps) {
  const { updateActivity } = useAppStore()

  const handleReact = (kind: 'like' | 'heart' | 'fire') => {
    updateActivity(post.id, {
      reactions: {
        ...post.reactions,
        [kind]: post.reactions[kind] + 1,
      },
    })
  }

  return (
    <div className="flex items-center gap-3 text-sm">
      <Button
        variant="ghost"
        className="h-8 rounded-xl"
        onClick={() => handleReact('like')}
      >
        <ThumbsUp className="h-4 w-4 mr-1" />
        {post.reactions.like}
      </Button>
      <Button
        variant="ghost"
        className="h-8 rounded-xl"
        onClick={() => handleReact('heart')}
      >
        <Heart className="h-4 w-4 mr-1" />
        {post.reactions.heart}
      </Button>
      <Button
        variant="ghost"
        className="h-8 rounded-xl"
        onClick={() => handleReact('fire')}
      >
        <Flame className="h-4 w-4 mr-1" />
        {post.reactions.fire}
      </Button>
    </div>
  )
}



