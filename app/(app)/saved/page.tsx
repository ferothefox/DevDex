'use client'

import Post, { PostProps } from '@/components/Posts'
import { useQuery } from '@tanstack/react-query'
import { UserContext } from 'app/UserProvider'
import { useContext } from 'react'
import RenderIfVisible from 'react-render-if-visible'

const savedPosts = (email: string) =>
  useQuery(
    ['savedposts', email],
    async () =>
      await (
        await fetch(`/api/posts/get/fav/${email}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'public, s-maxage=59, stale-while-revalidate=119',
          },
        })
      ).json()
  )

export default () => {
  const user = useContext(UserContext)
  const { data: favoritesData, isLoading } = savedPosts(user?.email || '')

  return (
    <div className='feed-main flex h-full min-h-0 w-full min-w-0 flex-col overflow-hidden'>
      <div className='feed-display flex h-fit w-full flex-col items-center gap-4 rounded-tl-xl dark:bg-[#06070b]'>
        {!isLoading &&
          favoritesData?.favorites.favorites.map((post: PostProps) => (
            <RenderIfVisible
              key={post.id}
              defaultHeight={400}
              visibleOffset={1000}
            >
              <Post
                id={user?.id ?? ''}
                key={post.id}
                post={post}
                standalone={false}
              />
            </RenderIfVisible>
          ))}
        <div className='h-screen'></div>
      </div>
    </div>
  )
}
