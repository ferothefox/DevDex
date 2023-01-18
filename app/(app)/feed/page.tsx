'use client'

import { PostProps } from '@/components/Posts'
import Feed from 'components/Feed'
import 'styles/Feed.module.scss'

export interface Posts {
  allPosts: Array<PostProps>
  success: boolean
}

export default () => (
  <div className='feed-mount flex h-fit w-full bg-light-main  text-light-bright dark:bg-[#06070b] dark:text-dark-bright relative'>
    <Feed />
  </div>
)
