import Head from 'next/head'
import Link from 'next/link'

export default () => (
  <>
    <Head>
      <title>Error - DevDex</title>
    </Head>
    <div
      className='flex h-screen w-full flex-1 flex-row overflow-y-auto overflow-x-hidden bg-light-main  dark:bg-[#06070b]'
      tabIndex={-1}
    >
      <div
        tabIndex={-1}
        className='flex h-full w-full flex-grow flex-col items-center gap-4 bg-light-main py-32 pl-8 pr-8  dark:bg-[#06070b]'
      >
        <div className='flex min-w-0 max-w-lg flex-shrink flex-col gap-4 pb-32'>
          <div className='app-error-title whitespace-wrap text-center  text-6xl text-[clamp(26px,3vw,42px)] font-bold tracking-wide text-light-bright dark:text-dark-bright'>
            Oops, something broke.
          </div>
          <div className='landing-animation-delay-200 mt-6 animate-fadeinup text-center font-medium leading-7 text-light-muted opacity-0 dark:text-dark-muted'>
            DevDex encountered an error and crashed unexpectedly. Check the
            browser console for more details.
          </div>
          <div className='landing-animation-delay-200 flex animate-fadeinup items-center justify-center font-medium leading-7 text-light-muted opacity-0 dark:text-dark-muted'>
            <Link
              tabIndex={1}
              className='mx-auto h-fit w-fit cursor-pointer whitespace-nowrap rounded-lg border-[1px] border-brand bg-brand py-1 px-4 text-center font-normal text-dark-bright  transition-opacity duration-200 focus-within:opacity-40 hover:opacity-40 active:!scale-[0.95] disabled:cursor-default disabled:grayscale disabled:focus-within:opacity-100 disabled:hover:opacity-100 disabled:active:!scale-100'
              href='/'
            >
              Reload DevDex
            </Link>
          </div>
          <div className='landing-animation-delay-200 animate-fadeinup text-center font-medium leading-7 text-light-muted opacity-0 dark:text-dark-muted'>
            <a
              tabIndex={1}
              className={
                'cursor-pointer whitespace-nowrap text-center text-link  transition-opacity duration-200 focus-within:opacity-40 hover:opacity-40 active:!scale-[0.95]'
              }
              href='https://twitter.com/DevDexApp'
            >
              Tweet us @DevDexApp
            </a>
          </div>
        </div>
      </div>
    </div>
  </>
)
