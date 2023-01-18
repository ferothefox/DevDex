'use client'

import LandingFooter from '@/components/Navigation/LandingFooter'
import Link from 'next/link'
import 'styles/NewLanding.module.scss'

export default () => (
  <>
    <div className='newlanding-content__main relative z-10 mx-auto mt-[128px] flex h-[90dvh] w-full px-4 '>
      <div className='mx-auto w-full max-w-5xl'>
        <main className='mt-[128px] pt-[196px] pb-[162px]'>
          <div className='hero-wrapper flex w-full max-w-2xl flex-col border-l-2 border-[#4E4AFC] pl-12'>
            <h1 className='hero-text text-6xl font-bold leading-[60px] text-[#06070B] dark:text-[#fff]'>
              The social home for developers
            </h1>
            <p className='mt-12 text-xl dark:text-[#bcbfca]'>
              DevDex is a new social media built from scratch. We make it easy
              to post, share, and connect with developers.
            </p>

            <form className='mt-12 flex flex-row items-center'>
              <Link
                href='/login'
                className='new-button flex cursor-default items-center whitespace-nowrap rounded-lg border-none bg-[#4E4AFC] px-6 py-4 font-medium leading-5 text-[#fff]'
              >
                Sign Up
              </Link>
            </form>
          </div>
        </main>
      </div>
    </div>

    <div className='newlanding-content__features relative z-10 mx-auto flex bg-[#fafafa] px-4 dark:bg-[#0f121c]'>
      <div
        // style={{
        //   backgroundImage:
        //     'linear-gradient(90deg,rgba(0,0,0,.04) 1px,transparent 0),linear-gradient(180deg,rgba(0,0,0,.04) 1px,transparent 0)',
        //   backgroundSize: '48px 48px',
        // }}
        className='newlanding-content__gridlines pointer-events-none absolute top-0 left-0 bottom-0  right-0 select-none'
      ></div>
      <span className='content-grad__border absolute left-0 right-0 top-0 h-[2px] w-full opacity-25'></span>
      <span className='content-grad__border-other absolute left-0 right-0 bottom-0 h-[2px] w-full opacity-25'></span>
      {/* <span className='content-grad-left pointer-events-none absolute top-0 z-30 hidden dark:block'></span>
                  <span className='content-grad-right pointer-events-none absolute top-0 z-30 hidden dark:block'></span> */}
      <div className='mx-auto w-full max-w-5xl py-32'>
        <div className='newlanding-content__section-inner flex flex-row'>
          <div className='flex flex-col'>
            <h2 className='text-4xl font-bold leading-[42px] text-[#06070B] dark:text-[#fff]'>
              Powerful post experience
            </h2>
            <p className='mt-12 max-w-xl text-xl dark:text-[#bcbfca]'>
              Write blogs, draw diagrams, embed code, and{' '}
              <strong>emphasize</strong> with a GitHub-compatible markdown
              editor. Threaded replies means organized and thoughtful
              conversation.
            </p>
          </div>

          <div className='illustration-wrapper relative ml-32 -mt-36'>
            <div className='absolute top-0 left-0 z-10 flex h-[450px] w-80 flex-col rounded-xl border-2 border-[#4E4AFC] p-4'>
              <div className='mb-6 flex flex-row'>
                <div className='illustration-item mr-4 h-8 w-8 rounded-xl bg-[#4E4AFC]'></div>
                <div className='flex flex-col'>
                  <div className='illustration-item mb-2 h-3 w-48 rounded-xl bg-[#4E4AFC]'></div>
                  <div className='illustration-item h-3 w-12 rounded-xl bg-[#4E4AFC]'></div>
                </div>
              </div>

              <div className='illustration-item flex flex-col'>
                <div className='illustration-item mb-2 h-36 w-full rounded-xl bg-[#4E4AFC]'></div>
                <div className='illustration-item mb-2 h-3 w-24 rounded-xl bg-[#4E4AFC]'></div>
                <div className='illustration-item mb-6 h-3 w-32 rounded-xl bg-[#4E4AFC]'></div>
              </div>

              <div className='illustration-item-height flex flex-col border-[#FE4090] pl-4'>
                <div className='mb-4 flex flex-row'>
                  <div className='illustration-item-height mr-4 h-8 w-8 rounded-xl bg-[#FE4090]'></div>
                  <div className='flex flex-col'>
                    <div className='illustration-item-height mb-2 h-3 w-36 rounded-xl bg-[#FE4090]'></div>
                    <div className='illustration-item-height h-3 w-12 rounded-xl bg-[#FE4090]'></div>
                  </div>
                </div>

                <div className='flex flex-col gap-2'>
                  <div className='illustration-item-height mb-2 h-12 w-full rounded-xl bg-[#FE4090]'></div>
                  <div className='illustration-item-height h-4 w-36 rounded-xl bg-[#FE4090]'></div>
                </div>
              </div>
            </div>

            <div
              style={{
                boxShadow:
                  '0 1.1px 2.2px rgba(0, 0, 0, 0.028), 0 2.7px 5.3px rgba(0, 0, 0, 0.04), 0 5px 10px rgba(0, 0, 0, 0.05), 0 8.9px 17.9px rgba(0, 0, 0, 0.06), 0 16.7px 33.4px rgba(0, 0, 0, 0.072), 0 40px 80px rgba(0, 0, 0, 0.1)',
              }}
              className='absolute top-0 left-0 flex h-[450px] w-80 flex-col rounded-xl border-2 border-[#06070b] bg-[#06070b] p-4'
            ></div>
          </div>
        </div>
      </div>
    </div>

    <div className='newlanding-content__other relative z-10 mx-auto flex px-4 '>
      <div className='mx-auto w-full max-w-5xl py-32'>
        <div className='newlanding-content__section-inner flex flex-row-reverse'>
          <div className='flex w-full flex-col items-end'>
            <h2 className='text-4xl font-bold leading-[42px] text-[#06070B] dark:text-[#fff]'>
              Tags, bookmarks, organization
            </h2>
            <p className='mt-12 max-w-xl text-xl dark:text-[#bcbfca]'>
              Posts are categorized via a powerful tagging system. Create an
              archive of knowledge, bookmark posts for later, and more.
            </p>
          </div>

          <div className='illustration-wrapper__search relative mr-32 w-full'>
            <div className='illustration-item pointer-events-none flex h-16 w-full select-none items-center rounded-xl border-2 border-[#4E4AFC] bg-[] p-4 font-bold text-[#4E4AFC]'>
              Search
            </div>

            <div className='z-10 mt-8 flex h-72 w-full flex-col rounded-xl border-2 border-[#4E4AFC] p-4'>
              <div className='mb-6 flex flex-row'>
                <div className='illustration-item mr-4 h-8 w-8 rounded-xl bg-[#4E4AFC]'></div>
                <div className='flex flex-col'>
                  <div className='illustration-item mb-2 h-3 w-48 rounded-xl bg-[#4E4AFC]'></div>
                  <div className='illustration-item h-3 w-12 rounded-xl bg-[#4E4AFC]'></div>
                </div>
              </div>

              <div className='flex flex-col gap-2'>
                <div className='illustration-item mb-2 h-36 w-full rounded-xl bg-[#4E4AFC]'></div>
                <div className='illustration-item mb-2 h-3 w-24 rounded-xl bg-[#4E4AFC]'></div>
                <div className='illustration-item h-3 w-32 rounded-xl bg-[#4E4AFC]'></div>
              </div>

              <div
                style={{
                  userSelect: 'none',
                  boxShadow:
                    '0 1.1px 2.2px rgba(0, 0, 0, 0.028), 0 2.7px 5.3px rgba(0, 0, 0, 0.04), 0 5px 10px rgba(0, 0, 0, 0.05), 0 8.9px 17.9px rgba(0, 0, 0, 0.06), 0 16.7px 33.4px rgba(0, 0, 0, 0.072), 0 40px 80px rgba(0, 0, 0, 0.1)',
                }}
                className='-mt-48 -ml-12 flex w-fit rounded-full bg-[#090B10] py-3 px-4 text-[#fff] duration-200 hover:scale-110'
              >
                #rust
              </div>

              <div
                style={{
                  userSelect: 'none',
                  boxShadow:
                    '0 1.1px 2.2px rgba(0, 0, 0, 0.028), 0 2.7px 5.3px rgba(0, 0, 0, 0.04), 0 5px 10px rgba(0, 0, 0, 0.05), 0 8.9px 17.9px rgba(0, 0, 0, 0.06), 0 16.7px 33.4px rgba(0, 0, 0, 0.072), 0 40px 80px rgba(0, 0, 0, 0.1)',
                }}
                className='-mt-24 ml-48 flex w-fit rounded-full bg-[#090B10] py-3 px-4 text-[#fff] duration-200 hover:scale-110'
              >
                #javascript
              </div>

              <div
                style={{
                  // filter: 'blur(1px)',
                  userSelect: 'none',
                  boxShadow:
                    '0 1.1px 2.2px rgba(0, 0, 0, 0.028), 0 2.7px 5.3px rgba(0, 0, 0, 0.04), 0 5px 10px rgba(0, 0, 0, 0.05), 0 8.9px 17.9px rgba(0, 0, 0, 0.06), 0 16.7px 33.4px rgba(0, 0, 0, 0.072), 0 40px 80px rgba(0, 0, 0, 0.1)',
                }}
                className='mt-24 ml-32 flex w-fit rounded-full bg-[#090B10] py-3 px-4 text-[#fff] duration-200 hover:scale-110'
              >
                #python
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div className='newlanding-content__features relative z-10 mx-auto flex bg-[#fafafa] px-4 dark:bg-[#0f121c]'>
      <span className='content-grad__border absolute left-0 right-0 top-0 h-[2px] w-full opacity-25'></span>
      <span className='content-grad__border-other absolute left-0 right-0 bottom-0 h-[2px] w-full opacity-25'></span>

      <div className='mx-auto w-full max-w-5xl py-32'>
        <div className='newlanding-content__section-inner flex flex-row'>
          <div className='flex flex-col'>
            <h2 className='text-4xl font-bold leading-[42px] text-[#06070B] dark:text-[#fff]'>
              No algorithm, no bias
            </h2>
            <p className='mt-12 max-w-xl text-xl dark:text-[#bcbfca]'>
              A chronological feed and feed for the topics you love and the
              people you follow. DevDex is built for you, not for advertisers.
            </p>
          </div>

          <div className='illustration-wrapper relative ml-32 -mt-36'></div>
        </div>
      </div>
    </div>

    <LandingFooter />
    <div className='layers__bg do-not-fire-click-event pointer-events-none fixed top-0 left-0 right-0 bottom-0 bg-[#ffffff] dark:bg-[#06070b]'></div>
  </>
)
