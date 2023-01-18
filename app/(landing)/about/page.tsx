'use client'

import LandingFooter from '@/components/Navigation/LandingFooter'
import 'styles/NewLanding.module.scss'

export default () => (
  <>
    <LandingFooter />
    <div className='layers__bg do-not-fire-click-event pointer-events-none fixed top-0 left-0 right-0 bottom-0 bg-[#ffffff] dark:bg-[#06070b]'></div>
  </>
)
