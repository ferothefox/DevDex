'use client'

import Post from '@/components/Posts'
import Profile from '@/components/Profile'
import { BadgeProps } from '@/components/Profile/Badge'
import { baseLink } from '@/lib/helpers'
import { PostProps } from 'components/Posts'
import { use } from 'react'
import RenderIfVisible from 'react-render-if-visible'
export interface Profile {
  success: boolean
  posts: Array<PostProps>
}

export interface UserProps {
  user: {
    id: string
    createdAt: Date
    email: string
    flair: string
    username: string
    image: string
    banner: string | null
    color: string
    bio: string | null
    premium: boolean
    staff: boolean
    posts: Array<PostProps>
    badges: Array<BadgeProps>
  }
}

const getPostsData = async (username: string) => {
  const res = await fetch(`${baseLink}/api/posts/get/username/${username}`)
  return await res.json()
}

const getUserId = async (username: string) => {
  const res = await fetch(
    `${baseLink}/api/users/get/idFromUsername/${username}`
  )
  return await res.json()
}

export default ({ params }: { params: { username: string } }) => {
  const posts = use(getPostsData(params.username))
  const userId = use(getUserId(params.username))

  return (
    <div className='profile-mount flex w-full bg-light-main text-light-bright dark:bg-[#06070b] dark:text-dark-bright'>
      <div className='flex w-full flex-col items-center overflow-y-auto'>
        <div className='profile-display w-full border-b-dark-border pt-16'>
          <Profile whoToGet={params.username} />
        </div>
        <div className='profile-display flex w-full flex-col items-center justify-center gap-4 rounded-tl-lg duration-200'>
          {posts.posts.map((post: PostProps) => (
            <RenderIfVisible
              key={post.id}
              defaultHeight={450}
              visibleOffset={1000}
            >
              <Post
                id={userId.userId.id}
                key={post.id}
                post={post}
                standalone={false}
              />
            </RenderIfVisible>
          ))}
          <div className='h-36 w-full'></div>
        </div>
      </div>
    </div>
  )
}
