'use client'

import { useComposerStore } from '@/lib/composerState'
import * as Tooltip from '@radix-ui/react-tooltip'
import { UserContext } from 'app/UserProvider'
import Image from 'next/image'
import { NotePencil } from 'phosphor-react'
import { FocusRing } from 'react-focus-rings'
import 'react-focus-rings/src/styles.css'

export default () => {
  const { setComposerActive } = useComposerStore()

  return (
    <UserContext.Consumer>
      {user => (
        <Tooltip.Provider
          skipDelayDuration={0}
          delayDuration={500}
        >
          <Tooltip.Root>
            <div className='mx-auto flex w-full max-w-xl flex-col rounded-xl bg-light-card dark:bg-[#10131E] mt-4'>
              <div className='px-4 pt-4 font-bold'>Home</div>
              <div className='feed-post-create-button mx-auto flex w-full max-w-xl flex-row gap-4 p-4'>
                <Tooltip.Trigger asChild>
                  <FocusRing>
                    <button
                      onClick={() => setComposerActive(true)}
                      className='flex w-full items-center gap-4 rounded-lg px-4 py-2 duration-200 dark:bg-[#22242E] dark:hover:bg-[#363947]'
                    >
                      <NotePencil
                        size={20}
                        color='currentColor'
                        weight='regular'
                      />
                      Create a Post
                    </button>
                  </FocusRing>
                </Tooltip.Trigger>
                <Tooltip.Portal>
                  <Tooltip.Content
                    side='top'
                    className='TooltipContent'
                    sideOffset={5}
                  >
                    <span className=''>CTRL + N</span>
                    <Tooltip.Arrow className='TooltipArrow' />
                  </Tooltip.Content>
                </Tooltip.Portal>

                <div className='flex min-h-[40px] min-w-[40px] flex-shrink-0'>
                  <Image
                    alt='User Avatar'
                    src={user?.image || '/placeholder-avatar.png'}
                    className='h-full w-full rounded-lg'
                    width={40}
                    height={40}
                  />
                </div>
              </div>
            </div>
          </Tooltip.Root>
        </Tooltip.Provider>
      )}
    </UserContext.Consumer>
  )
}
