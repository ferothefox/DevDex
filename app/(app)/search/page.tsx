'use client'

import { useQuery } from '@tanstack/react-query'
import { UserContext } from 'app/UserProvider'
import Post, { PostProps } from 'components/Posts'
import { useSearchParams } from 'next/navigation'
import { MagnifyingGlass } from 'phosphor-react'
import {
  ChangeEvent,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import RenderIfVisible from 'react-render-if-visible'
import 'styles/Feed.module.scss'

export interface Posts {
  allPosts: Array<PostProps>
  success: boolean
}

interface Tag {
  id: number
  name: string
}

export default (/*props: { postsData: Posts; data: Posts }*/) => {
  const user = useContext(UserContext)
  const query = useSearchParams()
  const defaultInput = useRef<HTMLInputElement>(null)
  const scrollTopTopRef = useRef<HTMLInputElement>(null)
  const [, setSearch] = useState('')
  const [results, setResults] = useState<Posts>()
  const [searching, setSearching] = useState(false)
  const [filter, setFilter] = useState('')

  const { data } = useQuery(
    ['replies'],
    async () =>
      await (
        await fetch('/api/tags/get/all', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'public, s-maxage=5, stale-while-revalidate=10',
          },
        })
      ).json()
  )

  const searchEndpoint = (query: string) => `/api/posts/get/tags/${query}`

  const debounce = <F extends (...args: Parameters<F>) => ReturnType<F>>(
    callback: F,
    wait: number
  ) => {
    let timeoutId: string | number | NodeJS.Timeout | undefined
    return (...args: Parameters<F>) => {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => {
        callback(...args)
      }, wait)
    }
  }

  const onChange = useMemo(
    () =>
      debounce((e: ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value
        setSearch(query)
        setSearching(true)
        if (query.length) {
          document.title = `Search Results for "${query}" | DevDex`
          fetch(searchEndpoint(query))
            .then(res => res.json())
            .then(res => {
              setResults(res)
              setSearching(false)
            })
        } else {
          setSearching(false)
          setResults(undefined)
          document.title = 'Search | DevDex'
        }
      }, 250),
    []
  )

  const onClick = () => {
    scrollTopTopRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const onFocus = () => {
    scrollTopTopRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'f' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        defaultInput?.current?.focus()
      }

      if (
        e.key === 'Escape' &&
        document.activeElement === defaultInput.current
      ) {
        e.preventDefault()
        defaultInput?.current?.blur()
      }
    }

    document.addEventListener('keydown', down, true)
    return () => {
      document.removeEventListener('keydown', down, true)
    }
  }, [])

  return (
    <div className='search-mount flex h-fit w-full bg-light-main text-light-bright dark:bg-[#06070b] dark:text-dark-bright'>
      <main className='search-main flex h-full min-h-0 w-full min-w-0 flex-col overflow-hidden'>
        <div className='search-display flex h-fit w-full flex-col items-center gap-4 rounded-tl-xl duration-200 dark:bg-[#06070b]'>
          <div
            ref={scrollTopTopRef}
            className='scroll-to-top-listener h-[1px]'
          ></div>
          <div className='search-wrapper fixed top-16 z-10 w-full max-w-full small:max-w-2xl rounded-b-xl px-8 backdrop-blur-lg'>
            {!searching && (
              <MagnifyingGlass
                size={24}
                color='currentColor'
                weight='regular'
                style={{
                  transform: 'translateY(-50%)',
                }}
                className='do-not-fire-click-event pointer-events-none absolute top-1/2 z-10 ml-4'
              />
            )}
            {searching && (
              <div
                style={{
                  transform: 'translateY(-50%)',
                }} 
                className='search-loader do-not-fire-click-event pointer-events-none absolute top-1/2 z-10 ml-6 text-light-brights dark:text-dark-bright'>
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
            <input
              tabIndex={1}
              autoComplete='off'
              ref={defaultInput}
              defaultValue={query.toString()}
              onFocus={onFocus}
              onChange={onChange}
              onClick={onClick}
              placeholder='Search tagged posts'
              className='search-input !pl-16'
            ></input>
          </div>
          <div className='h-28 small:h-32'></div>
          {results?.allPosts.map((post: PostProps) => (
            <RenderIfVisible
              key={post.id}
              defaultHeight={450}
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
        </div>
        <div className='h-screen'></div>
        <div className='tags-sidebar fixed right-0 z-[9001] flex h-full w-60 flex-shrink-0 flex-col overflow-y-auto rounded-xl p-8 duration-200 focus-within:w-80 hover:w-80 dark:bg-[#10131e]'>
          <input
            className='mb-4 flex h-6 w-full flex-shrink appearance-none rounded border-none bg-light-card p-4 pl-2 text-base text-light-muted  dark:bg-[#06070b] dark:text-dark-bright'
            type='text'
            placeholder='Filter tags'
            value={filter}
            onChange={e => setFilter(e.target.value)}
          />
          <div className='tags-wrapper flex h-fit flex-row flex-wrap'>
            {data?.allTags
              ?.filter((tag: Tag) =>
                tag.name.toUpperCase().includes(filter.trim().toUpperCase())
              )
              .map((tag: Tag) => (
                <a
                  tabIndex={1}
                  onClick={() => navigator.clipboard.writeText(`${tag.name}`)}
                  // onKeyDown={e => handleTagsKeydown(tag.name, e)}
                  className='search-tag h-fit cursor-pointer select-none rounded-full py-[4px] px-[8px] font-jetbrains text-xs opacity-60 duration-100 hover:opacity-100 dark:hover:bg-dark-card'
                  key={tag.name}
                >
                  #{tag.name}
                </a>
              ))}
          </div>
        </div>
      </main>
    </div>
  )
}
