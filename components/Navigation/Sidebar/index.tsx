'use client'

import * as Tooltip from '@radix-ui/react-tooltip'
import { UserContext } from 'app/UserProvider'
import { clsx } from 'clsx'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  BookmarksSimple,
  GearSix,
  House,
  MagnifyingGlass,
  User
} from 'phosphor-react'
import { useContext } from 'react'

export default (props: { onProfile?: boolean }) => {
  const pathname = usePathname()
  const user = useContext(UserContext)

  return (
    <div className='app-sidebar fixed top-0 z-[8999] flex h-full w-[72px] shrink-0 flex-col border-r-light-border bg-light-main dark:border-r-dark-border dark:bg-[#06070b]'>
      <div className='app-sidebar-column flex flex-col items-center gap-4 pt-4 pb-4'>
        <Tooltip.Provider
          skipDelayDuration={0}
          delayDuration={0}
        >
          <Tooltip.Root>
            <Tooltip.Trigger asChild>
              <Link
                href={'/'}
                className={clsx(
                  'app-sidebar-item box-border flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border-0 border-brand text-center opacity-75 duration-200 hover:opacity-100 hover:dark:bg-[#22242e] hover:dark:text-[#ffffff]',
                  pathname === '/' &&
                    'opacity-100 dark:!bg-[#4e4afc] dark:text-[#ffffff]'
                )}
              >
                <House
                  size={24}
                  color='currentColor'
                  weight='regular'
                />
              </Link>
            </Tooltip.Trigger>
            <Tooltip.Portal>
              <Tooltip.Content
                side='right'
                className='TooltipContent'
                sideOffset={5}
              >
                Home
                <Tooltip.Arrow className='TooltipArrow' />
              </Tooltip.Content>
            </Tooltip.Portal>
          </Tooltip.Root>
        </Tooltip.Provider>
        <Tooltip.Provider
          skipDelayDuration={0}
          delayDuration={0}
        >
          <Tooltip.Root>
            <Tooltip.Trigger asChild>
              <Link
                href={'/saved'}
                className={clsx(
                  'app-sidebar-item box-border flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border-0 border-brand text-center opacity-75 duration-200 hover:opacity-100 hover:dark:bg-[#22242e] hover:dark:text-[#ffffff]',
                  pathname === '/saved' &&
                    'opacity-100 dark:!bg-[#4e4afc] dark:text-[#ffffff]'
                )}
              >
                <BookmarksSimple
                  size={24}
                  color='currentColor'
                  weight='regular'
                />
              </Link>
            </Tooltip.Trigger>
            <Tooltip.Portal>
              <Tooltip.Content
                side='right'
                className='TooltipContent'
                sideOffset={5}
              >
                Saved
                <Tooltip.Arrow className='TooltipArrow' />
              </Tooltip.Content>
            </Tooltip.Portal>
          </Tooltip.Root>
        </Tooltip.Provider>
        <Tooltip.Provider
          skipDelayDuration={0}
          delayDuration={0}
        >
          <Tooltip.Root>
            <Tooltip.Trigger asChild>
              <Link
                href={'/search'}
                className={clsx(
                  'app-sidebar-item box-border flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border-0 border-brand text-center opacity-75 duration-200 hover:opacity-100 hover:dark:bg-[#22242e] hover:dark:text-[#ffffff]',
                  pathname === '/search' &&
                    'opacity-100 dark:!bg-[#4e4afc] dark:text-[#ffffff]'
                )}
              >
                <MagnifyingGlass
                  size={24}
                  color='currentColor'
                  weight='regular'
                />
              </Link>
            </Tooltip.Trigger>
            <Tooltip.Portal>
              <Tooltip.Content
                side='right'
                className='TooltipContent'
                sideOffset={5}
              >
                Search
                <Tooltip.Arrow className='TooltipArrow' />
              </Tooltip.Content>
            </Tooltip.Portal>
          </Tooltip.Root>
        </Tooltip.Provider>
        <Tooltip.Provider
          skipDelayDuration={0}
          delayDuration={0}
        >
          <Tooltip.Root>
            <Tooltip.Trigger asChild>
              <Link
                href={'/settings'}
                className={clsx(
                  'app-sidebar-item box-border flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border-0 border-brand text-center opacity-75 duration-200 hover:opacity-100 hover:dark:bg-[#22242e] hover:dark:text-[#ffffff]',
                  pathname === '/settings' &&
                    'opacity-100 dark:!bg-[#4e4afc] dark:text-[#ffffff]'
                )}
              >
                <GearSix
                  size={24}
                  color='currentColor'
                  weight='regular'
                />
              </Link>
            </Tooltip.Trigger>
            <Tooltip.Portal>
              <Tooltip.Content
                side='right'
                className='TooltipContent'
                sideOffset={5}
              >
                Settings
                <Tooltip.Arrow className='TooltipArrow' />
              </Tooltip.Content>
            </Tooltip.Portal>
          </Tooltip.Root>
        </Tooltip.Provider>
        <Tooltip.Provider
          skipDelayDuration={0}
          delayDuration={0}
        >
          <Tooltip.Root>
            <Tooltip.Trigger asChild>
              <Link
                href={`/${encodeURIComponent(user?.username ?? 'null')}`}
                className={clsx(
                  'app-sidebar-item box-border flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border-0 border-brand text-center opacity-75 duration-200 hover:opacity-100 hover:dark:bg-[#22242e] hover:dark:text-[#ffffff]',
                  props.onProfile &&
                    'opacity-100 dark:!bg-[#4e4afc] dark:text-[#ffffff]'
                )}
              >
                <User
                  size={24}
                  color='currentColor'
                  weight='regular'
                />
              </Link>
            </Tooltip.Trigger>
            <Tooltip.Portal>
              <Tooltip.Content
                side='right'
                className='TooltipContent'
                sideOffset={5}
              >
                Profile
                <Tooltip.Arrow className='TooltipArrow' />
              </Tooltip.Content>
            </Tooltip.Portal>
          </Tooltip.Root>
        </Tooltip.Provider>
        {/* {status === 'loading' ? (
          <div></div>
        ) : status === 'unauthenticated' &&
          process.env.NODE_ENV !== 'development' ? (
            <Link
              tabIndex={1}
              className='cursor-pointer whitespace-nowrap rounded-lg border-[1px] border-brand bg-brand-muted py-1 px-3 text-center font-normal text-dark-bright  transition-opacity duration-200 focus-within:opacity-40 hover:opacity-40 active:!scale-[0.95] small:mx-[23px]'
              href='/login'
            >
            Log In
            </Link>
          ) : (
            <Menu
              className='app-topbartoolbar-profile-button hidden small:block'
              menuButton={
                <MenuButton className='app-sidebar-item box-border hidden h-12 w-12 cursor-pointer items-center justify-center rounded-full text-center duration-200 hover:opacity-75 small:flex'>
                  <Image
                    alt='User Avatar'
                    src={user?.image || '/placeholder-avatar.png'}
                    className='hidden min-w-[32px] rounded-full small:block'
                    width={32}
                    height={32}
                  />
                </MenuButton>
              }
              direction='right'
              arrow
              offsetY={0}
              offsetX={12}
              transition
              tabIndex={1}
            >
              <MenuItem
                className='username-menu-item text-dark-bright opacity-100'
                disabled
              >
                {user?.username || 'Dev/Unknown'}
              </MenuItem>
              <MenuDivider />
              <MenuItem
                className='danger-menu-item !text-[#d83c3e] hover:!bg-[#d83c3e] hover:!text-[#eff0f3] focus:!bg-[#d83c3e] focus:!text-[#eff0f3]'
                onClick={() => signOut()}
              >
              Sign Out
              </MenuItem>
            </Menu>
          )} */}
      </div>
    </div>
  )
}
