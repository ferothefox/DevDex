'use client'

import { useComposerStore } from '@/lib/composerState'
import * as Tooltip from '@radix-ui/react-tooltip'
import { Plus } from 'phosphor-react'
import { useEffect } from 'react'

export default () => {
  const { setComposerActive } = useComposerStore()

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'n' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setComposerActive(true)
      }
    }

    document.addEventListener('keydown', down, true)
    return () => {
      document.removeEventListener('keydown', down, true)
    }
  }, [])

  return (
    <Tooltip.Provider
      skipDelayDuration={0}
      delayDuration={500}
    >
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <a
            tabIndex={1}
            className='create-post-button ml-auto box-border flex h-9 w-fit cursor-pointer select-none items-center whitespace-nowrap rounded-full border-[0px] border-brand bg-brand py-1 px-4 text-center font-normal text-dark-bright  duration-200 focus-within:bg-brand-hover hover:bg-brand-hover active:!scale-[0.95]'
            onClick={() => {
              setComposerActive(true)
            }}
          >
            <Plus
              size={20}
              color='currentColor'
              weight='regular'
              className='create-post-button-icon mr-4'
            />
            <span className='create-post-button-text'>Post</span>
          </a>
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
      </Tooltip.Root>
    </Tooltip.Provider>
  )
}
