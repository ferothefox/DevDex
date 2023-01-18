'use client'

import { baseLink } from '@/lib/helpers'
import Post, { PostProps } from 'components/Posts'
import Head from 'next/head'
import 'styles/Feed.module.scss'

export interface Posts {
  allPosts: Array<PostProps>
  success: boolean
}

export const getServerSideProps = async (context: {
  params: { tag: string }
}) => {
  const propTags = context.params.tag

  const res = await fetch(`${baseLink}/api/posts/get/tags/${propTags}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, s-maxage=59, stale-while-revalidate=119',
    },
  })

  const postsData = await res.json()

  return {
    props: {
      postsData,
    },
  }
}

export default (props: { postsData: Posts; data: Posts }) => {
  // const { status } = useSession()
  // const { user } = useUserStore()

  // if (status === 'unauthenticated' && process.env.NODE_ENV === 'production') {
  //   router.replace('/login')
  // }

  console.table(props.postsData)

  return (
    <>
      <Head>
        <title>Feed - DevDex</title>
      </Head>

      <div className='feed-mount flex h-screen w-full bg-light-main text-light-bright dark:bg-[#06070b] dark:text-dark-bright'>
        <div className='flex flex-grow flex-col overflow-hidden'>
          <div className='feed-layout flex h-full min-h-0 w-full min-w-0 flex-col items-stretch justify-start'>
            <div className='feed-wrapper relative flex min-h-0 min-w-0 flex-grow flex-col overflow-hidden'>
              <div className='feed-display-wrapper flex h-full w-full flex-row overflow-y-auto bg-light-main dark:bg-[#06070b]'>
                <div className='feed-display flex w-full flex-col items-center gap-4 rounded-tl-lg py-24 duration-200'>
                  {props.postsData.allPosts.map((post: PostProps) => (
                    <Post
                      id={''}
                      key={post.id}
                      post={post}
                      standalone={false}
                    />
                  ))}
                  <div className='h-24'></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
