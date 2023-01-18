import LandingNavbar from '@/components/Navigation/LandingNavbar'
import 'styles/NewLanding.module.scss'

import { ReactNode } from 'react'

interface DevDexAppLayoutProps {
  children?: ReactNode
}

export default async ({ children }: DevDexAppLayoutProps) => (
  <>
    <LandingNavbar />
    <div className='landing-app'>{children}</div>
  </>
)
