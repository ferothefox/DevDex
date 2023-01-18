'use client'

import '@szhsin/react-menu/dist/index.css'
import '@szhsin/react-menu/dist/transitions/slide.css'
import { useInfiniteQuery } from '@tanstack/react-query'
import Post from 'components/Posts'
import { Bell, BookmarkSimple, Clock } from 'phosphor-react'
import { Fragment, useEffect, useRef } from 'react'
import { useInView } from 'react-intersection-observer'
import RenderIfVisible from 'react-render-if-visible'
import 'styles/Feed.module.scss'
import { PostProps } from '../Posts'
import ComposerFeedButton from '../Posts/ComposerFeedButton'
import { FocusRing, FocusRingManager, FocusRingScope } from 'react-focus-rings'
import 'react-focus-rings/src/styles.css'

export default () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const { ref, inView } = useInView()

  const { data, isFetchingNextPage, fetchNextPage, hasNextPage, isLoading } =
    useInfiniteQuery(
      ['posts'],
      async ({ pageParam = '' }) => {
        await new Promise(res => setTimeout(res, 1000))
        const res = await fetch(
          '/api/posts/get/paginated?cursor=' + pageParam,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Cache-Control':
                'public, s-maxage=59, stale-while-revalidate=119',
            },
          }
        )
        return res.json()
      },
      {
        getNextPageParam: lastPage => lastPage.nextId ?? false,
      }
    )

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage()
    }

    const down = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        FocusRingManager.setRingsEnabled(true)
      }

      if (e.key === 'Escape') {
        FocusRingManager.setRingsEnabled(false)
      }
    }

    document.addEventListener('keydown', down, true)

    return () => {
      document.removeEventListener('keydown', down, true)
    }
  }, [inView])

  return (
    <FocusRingScope containerRef={containerRef}>
      <div
        className='app__post-focus-rings feed-main relative flex h-full min-h-0 w-full min-w-0 flex-col overflow-hidden'
        ref={containerRef}
      >
        <main className='feed-main relative flex h-full min-h-0 w-full min-w-0 flex-col overflow-hidden'>
          <div className='feed-display flex h-fit w-full flex-col items-center gap-4 rounded-tl-xl duration-200 dark:bg-[#06070b]'>
            <ComposerFeedButton />
            <nav className='feed-post-filter mx-auto flex w-full max-w-xl flex-row gap-4 rounded-xl text-sm'>
              <div className='feed-post-filter__tabs flex w-fit flex-row gap-2 rounded-xl bg-light-card p-1 dark:bg-[#10131E]'>
                <div className='feed-post-filter__tab flex justify-center gap-2 rounded-lg p-2 dark:bg-[#22242e]'>
                  <Clock
                    size={20}
                    color='currentColor'
                    weight='regular'
                  />
                  Latest Posts
                </div>
                <div className='feed-post-filter__tab flex justify-center gap-2 rounded-lg p-2'>
                  <BookmarkSimple
                    size={20}
                    color='currentColor'
                    weight='regular'
                  />
                  Saved Tags
                </div>
                <div className='feed-post-filter__tab flex justify-center gap-2 rounded-lg p-2'>
                  <Bell
                    size={20}
                    color='currentColor'
                    weight='regular'
                  />
                  Notifications
                </div>
              </div>
            </nav>
            {isLoading && <div className='h-screen w-full'></div>}
            {/* <FocusRingScope containerRef={containerRef}>
              <div
                className='app__post-focus-rings relative contents'
                ref={containerRef}
              > */}
            <ol
              className='max-w-xl w-full'
              tabIndex={1}
            >
              {data &&
                data.pages.map(page => (
                  <Fragment key={page.nextId ?? 'lastPage'}>
                    {page.posts.map((post: PostProps) => (
                      <li
                        className='max-w-xl w-full list-none mb-4'
                        key={post.id}
                      >
                        <RenderIfVisible
                          key={post.id}
                          defaultHeight={450}
                          visibleOffset={1000}
                        >
                          <Post
                            id={post.authorId}
                            key={post.id}
                            post={post}
                            standalone={false}
                          />
                        </RenderIfVisible>
                      </li>
                    ))}
                  </Fragment>
                ))}
            </ol>
            {/* </div>
            </FocusRingScope> */}
            {isFetchingNextPage && (
              <div className='infinite-scroll-loader flex flex-row items-center justify-center p-8 text-light-muted dark:text-dark-muted'>
                <svg
                  className='text-white -ml-1 mr-3 h-5 w-5 animate-spin'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                >
                  <circle
                    className='opacity-25'
                    cx='12'
                    cy='12'
                    r='10'
                    stroke='currentColor'
                    strokeWidth='4'
                  ></circle>
                  <path
                    className='opacity-75'
                    fill='currentColor'
                    d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                  ></path>
                </svg>
              </div>
            )}
            <div
              className='infinite-scroll-listener h-8 w-full'
              ref={ref}
            ></div>
            <div className='h-screen'></div>
          </div>
        </main>
      </div>
    </FocusRingScope>
  )
}
