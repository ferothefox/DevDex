import Head from 'next/head'
import Link from 'next/link'

export default () => (
  <>
    <Head>
      <title>Not Found - DevDex</title>
    </Head>
    <div
      className='flex h-screen w-full flex-1 flex-row overflow-y-auto overflow-x-hidden bg-light-main  dark:bg-[#06070b]'
      tabIndex={-1}
    >
      <div
        tabIndex={-1}
        className='flex h-full w-full flex-grow flex-col items-center gap-4 bg-light-main py-32 pl-8 pr-8  dark:bg-[#06070b]'
      >
        <div className='flex min-w-0 max-w-2xl flex-shrink flex-col gap-4 pb-32'>
          <div className='not-found-title whitespace-wrap  text-6xl text-[clamp(26px,3vw,42px)] font-bold tracking-wide text-light-bright dark:text-dark-bright'>
            Not Found
          </div>
          <div className='landing-animation-delay-200 mt-6 animate-fadeinup font-medium leading-7 text-light-muted opacity-0 dark:text-dark-muted'>
            The page you're trying to access does not exist.
          </div>
          <div className='landing-animation-delay-200 animate-fadeinup font-medium leading-7 text-light-muted opacity-0 dark:text-dark-muted'>
            <Link
              tabIndex={1}
              className={
                'cursor-pointer whitespace-nowrap text-center text-link  transition-opacity duration-200 focus-within:opacity-40 hover:opacity-40 active:!scale-[0.95]'
              }
              href='/'
            >
              Go home
            </Link>
          </div>
          <div className='landing-animation-delay-200 animate-fadeinup font-medium leading-7 text-light-muted opacity-0 dark:text-dark-muted'>
            <a
              tabIndex={1}
              className={
                'cursor-pointer whitespace-nowrap text-center text-link  transition-opacity duration-200 focus-within:opacity-40 hover:opacity-40 active:!scale-[0.95]'
              }
              href='https://twitter.com/DevDexApp'
            >
              @DexDevApp
            </a>
          </div>
        </div>
      </div>
    </div>
  </>
)
