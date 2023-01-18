'use client'

import { usePathname, useRouter } from 'next/navigation'
import { ArrowLeft } from 'phosphor-react'
import 'styles/Feed.module.scss'

export default () => {
  const router = useRouter()
  const pathname = usePathname()

  return (
    <div className='app-topbar fixed z-[9000] flex h-16 w-full shrink-0 flex-row items-center border-b-light-border pl-4 pr-4  transition dark:border-b-dark-border'>
      <div className='app-topbaritems flex select-none flex-row items-center gap-4 text-center  font-bold text-light-bright transition dark:text-dark-bright [&>*]:transition'>
        <div className='ml-0 flex-shrink-0 cursor-pointer duration-200 hover:opacity-70 small:ml-1'>
          {pathname !== '/' ? (
            <a
              className='box-border flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border-0 text-center duration-75'
              onClick={router.back}
            >
              <ArrowLeft
                size={24}
                color='currentColor'
                weight='regular'
              />
            </a>
          ) : (
            <div className='new-logo-wrapper flex h-8 w-8 cursor-pointer items-center gap-2'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='64'
                height='64'
                viewBox='0 0 64 64'
                fill='none'
              >
                <path
                  d='M10 35.7377L26.25 20L36 29.4426L23.1354 41.9016L36 54.6229L26.9929 64L10 47.541V35.7377Z'
                  fill='currentColor'
                />
                <path
                  d='M36.7308 9.46926L46.2628 0L55 8.68349L49.0685 15.2993V48.6898L54.1359 53.7249L44.8012 63L36 54.2549L36.7308 9.46926Z'
                  fill='currentColor'
                />
              </svg>
            </div>
          )}
        </div>
        <div className='feed-page-name text-root font-bold'>
          {(() => {
            switch (pathname) {
            case '/':
              return <span>Home</span>
            case '/saved':
              return <span>Saved</span>
            case '/search':
              return <span>Search</span>
            case '/settings':
              return <span>Settings</span>
            default:
              return <span>Unknown Page</span>
            }
          })()}
        </div>
      </div>
    </div>
  )
}
