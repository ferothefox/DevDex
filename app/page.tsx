import Feed from '@/components/Feed'
import LandingNavbar from '@/components/Navigation/LandingNavbar'
import AppSideBar from '@/components/Navigation/Sidebar'
import PostComposer from '@/components/Posts/Composer'
import { getSession } from '@/lib/session'
import { headers } from 'next/headers'
import NewLanding from './(landing)/landing/page'

export default async () => {
  const session = await getSession(headers().get('cookie') ?? '')

  return session || process.env.NODE_ENV === 'development' ? (
    <>
      <div className='app h-full min-h-0 w-full min-w-0 overflow-hidden'>
        {/* <AppTopBar /> */}
        <AppSideBar />
        <PostComposer />
        <div className='feed-mount relative flex h-fit w-full bg-light-main text-light-bright dark:bg-[#06070b] dark:text-dark-bright'>
          <Feed />
        </div>
      </div>
      <div className='layers__bg do-not-fire-click-event pointer-events-none fixed top-0 left-0 right-0 bottom-0 z-[-1] bg-[#ffffff] dark:bg-[#06070b]'></div>
    </>
  ) : (
    <>
      <LandingNavbar />
      <NewLanding />
    </>
  )
}
