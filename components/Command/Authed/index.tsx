'use client'

import { useComposerStore } from '@/lib/composerState'
import { UserContext } from 'app/UserProvider'
import { Command } from 'cmdk'
import Image from 'next/image'
import { useRouter } from 'next/router'
import {
  ArrowLeft,
  ArrowRight,
  ChatsTeardrop,
  Plus,
  UserCircle,
  X,
} from 'phosphor-react'
import { useContext, useEffect, useState } from 'react'

export default () => {
  const [open, setOpen] = useState(false)
  const router = useRouter()
  const user = useContext(UserContext)
  const { setComposerActive } = useComposerStore()
  const [search, setSearch] = useState('')

  const handleCreatePostCmd = () => {
    setOpen(false)
    setComposerActive(true)
    setSearch('')
  }

  const handleRouteTo = (route: string) => {
    if (router.asPath === route) {
      return
    }
    setOpen(false)
    router.push(`/${route}`)
    setSearch('')
  }

  const handleRouteBack = () => {
    setOpen(false)
    router.back()
    setSearch('')
  }

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setComposerActive(false)
        setOpen(open => !open)
      }
    }

    const handleRouteChange = () => {
      setOpen(false)
    }

    router.events.on('routeChangeStart', handleRouteChange)

    document.addEventListener('keydown', down, true)
    return () => {
      document.removeEventListener('keydown', down, true)
      router.events.off('routeChangeStart', handleRouteChange)
    }
  }, [])

  return (
    <>
      {open && (
        <>
          <div className='layer-mount-backdrop fixed top-0 bottom-0 right-0 left-0 z-[9997] opacity-75 dark:bg-[#000000]'></div>
          <div className='landing-animation-delay-400 pointer-events-none fixed top-0 right-0 z-[9998] h-24 w-24 animate-fadeinbackdrop opacity-0 blur-lg dark:bg-[black]'></div>
          <a
            tabIndex={1}
            className='landing-animation-delay-400 fixed top-8 right-8 z-[9999] ml-auto flex animate-fadeinbackdrop cursor-pointer select-none flex-col items-center  font-bold text-light-bright opacity-0  dark:text-dark-bright'
            onClick={() => setComposerActive(false)}
          >
            <X
              size={16}
              color='currentColor'
              weight='regular'
            />
            <div className='pointer-events-none mt-2 select-none rounded-lg px-[8px] py-[4px] text-sm uppercase dark:bg-[#10131E]'>
              Esc
            </div>
          </a>
        </>
      )}
      <Command.Dialog
        className='layer-mount cmd-dialog z-[9998] '
        open={open}
        onOpenChange={setOpen}
        label='Global Command Menu'
      >
        <Command.Input
          autoComplete='off'
          placeholder='What do you need?'
          className='cmd-input'
          value={search}
          onValueChange={setSearch}
        />
        <Command.List className='cmd-list'>
          <Command.Empty>No results found.</Command.Empty>
          <Command.Group
            className='cmd-group'
            heading='Navigation'
          >
            <Command.Item
              data-devdex-route-to='home'
              onSelect={() => handleRouteTo('feed')}
              className='cmd-item'
            >
              <ArrowRight
                size={16}
                color='currentColor'
                weight='regular'
              />
              Home
            </Command.Item>
            <Command.Item
              onSelect={() => handleRouteTo('saved')}
              className='cmd-item'
            >
              <ArrowRight
                size={16}
                color='currentColor'
                weight='regular'
              />
              Saved
            </Command.Item>
            <Command.Item
              onSelect={() => handleRouteTo('search')}
              className='cmd-item'
            >
              <ArrowRight
                size={16}
                color='currentColor'
                weight='regular'
              />
              Search
            </Command.Item>
            <Command.Item
              onSelect={() => handleRouteTo('settings')}
              className='cmd-item'
            >
              <ArrowRight
                size={16}
                color='currentColor'
                weight='regular'
              />
              Settings
            </Command.Item>
            <Command.Item
              onSelect={() => handleRouteBack()}
              className='cmd-item'
            >
              <ArrowLeft
                size={16}
                color='currentColor'
                weight='regular'
              />
              Previous Page
            </Command.Item>
          </Command.Group>
          <Command.Group
            className='cmd-group'
            heading='Post'
          >
            <Command.Item
              onSelect={() => handleCreatePostCmd()}
              className='cmd-item'
            >
              <Plus
                size={16}
                color='currentColor'
                weight='regular'
              />
              New Post
            </Command.Item>
            {search && search.match(/^\d+$/) && (
              <Command.Item
                onSelect={() => handleRouteTo(`post/${search}`)}
                className='cmd-item'
              >
                <ChatsTeardrop
                  size={16}
                  color='currentColor'
                  weight='regular'
                />
                Go to Post #{search}
              </Command.Item>
            )}
          </Command.Group>
          {user && (
            <Command.Group
              className='cmd-group'
              heading='Profile'
            >
              <Command.Item
                onSelect={() => handleRouteTo(user?.username || '')}
                className='cmd-item'
              >
                <Image
                  alt='User Avatar'
                  src={user?.image || '/placeholder-avatar.png'}
                  className='hidden min-w-[16px] rounded-full small:block'
                  width={16}
                  height={16}
                />
                Go to {user?.flair}
                {user?.username}
              </Command.Item>
              {search && (
                <Command.Item
                  onSelect={() => handleRouteTo(search)}
                  className='cmd-item'
                >
                  <UserCircle
                    size={16}
                    color='currentColor'
                    weight='regular'
                  />
                  Go to {search || 'a profile'}
                </Command.Item>
              )}
            </Command.Group>
          )}
        </Command.List>
      </Command.Dialog>
    </>
  )
}
