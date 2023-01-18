'use client'

import Lines from 'components/SVG/newlanding_lines'
import Link from 'next/link'
import 'styles/NewLanding.module.scss'

export default (props: { isAuthed?: boolean }) => (
  <>
    <div className='nav-lines-wrapper pointer-events-none absolute top-0 z-30 h-full w-full select-none overflow-hidden text-[#777981] dark:text-[#2c303f]'>
      <Lines />
    </div>
    <div className='relative'>
      <div className='nav-grad-left pointer-events-none absolute z-30 -mt-24 hidden dark:block'></div>
      <div className='nav-grad-right pointer-events-none absolute z-30 -mt-24 hidden dark:block'></div>
    </div>
    <div className='fixed top-0 z-20 w-full bg-[#ffffffaa] text-[#777981] backdrop-blur-2xl  dark:bg-[#06070b44] dark:text-[#bcbfca]'>
      <nav className='z-40 flex justify-center'>
        <header className='navlink-wrapper flex w-full max-w-5xl flex-nowrap items-center gap-12 py-6 px-4 text-lg leading-6'>
          <Link
            tabIndex={1}
            className='new-navlink-logo whitespace-nowrap text-center  transition-opacity duration-200'
            href='/landing'
          >
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
          </Link>

          <Link
            tabIndex={1}
            className='new-navlink whitespace-nowrap py-4 text-center  transition-opacity duration-200'
            href='/about'
          >
            <div className='flex cursor-pointer items-center gap-2'>About</div>
          </Link>

          <Link
            tabIndex={1}
            className='new-navlink whitespace-nowrap py-4 text-center  transition-opacity duration-200'
            href='/blog'
          >
            <div className='flex cursor-pointer items-center gap-2'>Blog</div>
          </Link>

          <Link
            tabIndex={1}
            className='new-navlink whitespace-nowrap py-4 text-center  transition-opacity duration-200'
            href='/donate'
          >
            <div className='flex cursor-pointer items-center gap-2'>Donate</div>
          </Link>

          {props.isAuthed ? (
            <Link
              tabIndex={1}
              className='ml-auto whitespace-nowrap rounded-full bg-[#f1f4f7] px-6 py-4 text-center  duration-200 focus:bg-[#4E4AFCff] dark:bg-[#2c303f44] dark:hover:bg-[#2c303fff]'
              href='/'
            >
              <div className='flex cursor-pointer items-center gap-2'>
                Open DevDex
              </div>
            </Link>
          ) : (
            <Link
              tabIndex={1}
              className='ml-auto whitespace-nowrap rounded-full bg-[#f1f4f7] px-6 py-4 text-center  duration-200 focus:bg-[#4E4AFCff] dark:bg-[#2c303f44] dark:hover:bg-[#2c303fff]'
              href='/login'
            >
              <div className='flex cursor-pointer items-center gap-2'>
                Log In
              </div>
            </Link>
          )}
        </header>
      </nav>
    </div>
  </>
)
