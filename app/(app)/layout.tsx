import AppTopBar from '@/components/Navigation/Navbar'
import AppSideBar from '@/components/Navigation/Sidebar'
import PostComposer from '@/components/Posts/Composer'
import { ReactNode } from 'react'

interface DevDexAppLayoutProps {
  children?: ReactNode
}

export default async ({ children }: DevDexAppLayoutProps) => {
  return (
    <div className='app h-full min-h-0 w-full min-w-0 overflow-hidden'>
      {/* <AppTopBar /> */}
      <AppSideBar />
      <PostComposer />
      <div className='app'>{children}</div>
    </div>
  )
}
