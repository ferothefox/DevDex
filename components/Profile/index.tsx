'use client'

import Flair from '@/components/Profile/Flairs'
import { baseLink } from '@/lib/helpers'
import { Badge } from '@prisma/client'
import * as Tooltip from '@radix-ui/react-tooltip'
import clsx from 'clsx'
import Image from 'next/image'
import { use } from 'react'
import 'styles/Profile.module.scss'

const getProfileData = async (username: string) => {
  const res = await fetch(`${baseLink}/api/users/get/username/${username}`)
  return await res.json()
}

export default (props: { whoToGet: string }) => {
  const profileData = use(getProfileData(props.whoToGet))

  return (
    <div className='profile-wrapper flex w-full flex-shrink-0 flex-grow flex-col overflow-y-auto bg-light-main dark:bg-[#06070b]'>
      <div className='profile-info-wrapper flex w-full max-w-[36rem] flex-grow flex-col pb-4 duration-200 small:mx-auto'>
        <div className='profile-banner relative flex aspect-[3/1] w-full'>
          {profileData.user.banner ? (
            <Image
              src={profileData.user.banner}
              alt='Profile Banner'
              priority
              fill
              sizes='(max-width: 640px) 640px, (max-width: 768px) 768px, (max-width: 1024px) 1024px, (max-width: 1280px) 1280px, (max-width: 1536px) 1536px, 1920px'
              className='profile-banner-image !relative aspect-auto min-h-full min-w-full rounded-t-xl object-cover'
            />
          ) : (
            <div
              className='profile-banner-color flex flex-grow rounded-t-xl'
              style={{
                backgroundColor: '#' + profileData.user.color || '#000000',
              }}
            />
          )}
        </div>

        <div>
          <div className='profile-info-header flex w-full flex-col gap-4 rounded-b-xl bg-light-card p-4 dark:bg-[#10131E]'>
            <div className='profile-info-header-content-wrapper flex flex-row justify-between'>
              <div className='flex shrink-0 flex-col'>
                <Image
                  alt='Profile Avatar'
                  className={clsx(
                    'bg-muted z-10 m-2 mt-[-64px] aspect-square h-32 w-32 rounded-full border-8 border-light-card object-cover dark:border-dark-card',
                    profileData.user.premium && '!border-[#FF3C5F] shadow-2xl'
                  )}
                  src={profileData.user.image || '/placeholder-avatar.png'}
                  width={128}
                  height={128}
                />
                <div className='profile-info-name mx-auto  font-bold'>
                  <div className='profile-info-name-layout flex flex-row items-center'>
                    <Flair flair={profileData.user.flair} />
                    <div className='profile-info-name-username  text-light-bright dark:text-dark-bright'>
                      {profileData.user.username}
                    </div>
                    <div className='profile-info-badges ml-2 flex select-none flex-row gap-2'>
                      {profileData.user.badges.map((badge: Badge) => (
                        <Tooltip.Provider
                          skipDelayDuration={0}
                          delayDuration={0}
                        >
                          <Tooltip.Root>
                            <Tooltip.Trigger asChild>
                              <div className='profile-info-badge flex flex-row items-center justify-center'>
                                <Image
                                  src={`/badges/${badge.name}.svg`}
                                  alt={badge.displayName}
                                  width={24}
                                  height={24}
                                />
                              </div>
                            </Tooltip.Trigger>

                            <Tooltip.Portal>
                              <Tooltip.Content
                                className='TooltipContent'
                                sideOffset={5}
                              >
                                {badge.displayName}
                                <Tooltip.Arrow className='TooltipArrow' />
                              </Tooltip.Content>
                            </Tooltip.Portal>
                          </Tooltip.Root>
                        </Tooltip.Provider>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className='profile-description ml-8 w-full rounded-md bg-light-main p-4 text-light-bright dark:bg-[#06070b] dark:text-dark-bright'>
                {profileData.user.bio}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
