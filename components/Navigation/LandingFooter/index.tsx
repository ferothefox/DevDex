'use client'

import Link from 'next/link'

export default () => (
  <footer className='newlanding-footer relative z-10 mx-auto w-full bg-[#06070B] pt-6  text-[#fff]'>
    <div className='flex w-full justify-center'>
      <div className='flex w-full max-w-5xl justify-center px-4 py-8'>
        <div className='mb-8 w-[33.33333332%]'>
          <Link
            tabIndex={1}
            className='whitespace-nowrap text-center  transition-opacity duration-200 focus-within:opacity-40 hover:opacity-40 active:!scale-[0.95]'
            href='/landing'
          >
            <div className='flex h-8 w-8 cursor-pointer items-center gap-2'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='64'
                height='64'
                viewBox='0 0 64 64'
                fill='none'
              >
                <path
                  d='M10 35.7377L26.25 20L36 29.4426L23.1354 41.9016L36 54.6229L26.9929 64L10 47.541V35.7377Z'
                  fill='currentColor' />
                <path
                  d='M36.7308 9.46926L46.2628 0L55 8.68349L49.0685 15.2993V48.6898L54.1359 53.7249L44.8012 63L36 54.2549L36.7308 9.46926Z'
                  fill='currentColor' />
              </svg>
            </div>
          </Link>
        </div>

        <div className='mb-8 w-[33.33333332%]'>
          <div className='flex flex-col gap-4'>
            <Link
              tabIndex={1}
              className='w-full whitespace-nowrap py-2 text-center  transition-opacity duration-200 focus-within:opacity-40 hover:opacity-40 active:!scale-[0.95]'
              href='/about'
            >
              <div className='flex cursor-pointer items-center gap-2'>
                About
              </div>
            </Link>
            <Link
              tabIndex={1}
              className='w-full whitespace-nowrap py-2 text-center  transition-opacity duration-200 focus-within:opacity-40 hover:opacity-40 active:!scale-[0.95]'
              href='/blog'
            >
              <div className='flex cursor-pointer items-center gap-2'>
                Blog
              </div>
            </Link>
            <Link
              tabIndex={1}
              className='w-full whitespace-nowrap py-2 text-center  transition-opacity duration-200 focus-within:opacity-40 hover:opacity-40 active:!scale-[0.95]'
              href='/donate'
            >
              <div className='flex cursor-pointer items-center gap-2'>
                Donate
              </div>
            </Link>
          </div>
        </div>

        <div className='mb-8 w-[33.33333332%]'></div>
      </div>
    </div>
    <div className='flex w-full justify-center bg-[#0F121C]'>
      <div className='space-between flex w-full max-w-5xl px-4 py-8'>
        <div className='flex w-full flex-row gap-4'>
          <div className='mr-4 py-2 text-center text-[#b1b4be]'>
            © 2022 DevDex
          </div>
          <Link
            tabIndex={1}
            className='whitespace-nowrap py-2 text-center text-[#b1b4be]  transition-opacity duration-200 focus-within:opacity-40 hover:opacity-40 active:!scale-[0.95]'
            href='/'
          >
            <div className='flex cursor-pointer items-center gap-2'>
              Terms
            </div>
          </Link>
          <Link
            tabIndex={1}
            className='whitespace-nowrap py-2 text-center text-[#b1b4be]  transition-opacity duration-200 focus-within:opacity-40 hover:opacity-40 active:!scale-[0.95]'
            href='/'
          >
            <div className='flex cursor-pointer items-center gap-2'>
              Privacy
            </div>
          </Link>
        </div>
        <div></div>
      </div>
    </div>
  </footer>
)
