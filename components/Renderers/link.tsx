import { ReactNode } from 'react'

import * as ContextMenu from '@radix-ui/react-context-menu'
import {
  ArrowUpRight,
  Copy,
  Link as CopyLink,
  Link,
  User as Profile,
} from 'phosphor-react'

export default (props: {
  href?: string
  children?: number | Array<ReactNode>
}) => {
  const mentionRegex = new RegExp(
    '(?<=^|(?<=[^a-zA-Z0-9-_.]))@([A-Za-z]+[A-Za-z0-9_]+)'
  )

  return mentionRegex.test(props.children?.toString() as string) ? (
    <ContextMenu.Root>
      <ContextMenu.Trigger
        asChild
        className='ContextMenuTrigger'
      >
        <Link
          href={`/${encodeURIComponent(
            props.children?.toString().substring(1) ?? ''
          )}`}
          className='feed-post-mention-item inline-block cursor-pointer rounded-[5px] bg-brand-muted px-[3px] duration-150 hover:bg-brand hover:underline focus:bg-brand focus:underline'
          tabIndex={1}
        >
          {props.children}
        </Link>
      </ContextMenu.Trigger>

      <ContextMenu.Portal>
        <ContextMenu.Content className='ContextMenuContent'>
          <ContextMenu.Item
            // link inside menu?
            // onSelect={() =>
            //   router.push({
            //     pathname: '/[username]',
            //     query: { username: props.children?.toString().substring(1) },
            //   })
            // }
            className='ContextMenuItem'
          >
            Profile
            <div className='RightSlot'>
              <Profile
                size={16}
                color='currentColor'
                weight='regular'
              />
            </div>
          </ContextMenu.Item>
          <ContextMenu.Item
            onSelect={() =>
              navigator.clipboard.writeText(
                `${props.children?.toString().substring(1)}`
              )
            }
            className='ContextMenuItem'
          >
            Copy Username
            <div className='RightSlot'>
              <Copy
                size={16}
                color='currentColor'
                weight='regular'
              />
            </div>
          </ContextMenu.Item>
        </ContextMenu.Content>
      </ContextMenu.Portal>
    </ContextMenu.Root>
  ) : (
    <ContextMenu.Root>
      <ContextMenu.Trigger
        asChild
        className='ContextMenuTrigger'
      >
        <a
          href={props.href}
          className='feed-post-link-item inline-block text-link hover:underline'
          target='_blank'
          rel='noopener noreferrer nofollow'
          tabIndex={1}
        >
          {props.children}
        </a>
      </ContextMenu.Trigger>

      <ContextMenu.Portal>
        <ContextMenu.Content className='ContextMenuContent'>
          <ContextMenu.Item
            onSelect={() => navigator.clipboard.writeText(`${props.href}`)}
            className='ContextMenuItem'
          >
            Copy Link
            <div className='RightSlot'>
              <CopyLink
                size={16}
                color='currentColor'
                weight='regular'
              />
            </div>
          </ContextMenu.Item>
          <ContextMenu.Item
            onSelect={() => window.open(`${props.href}`, '_blank')}
            className='ContextMenuItem'
          >
            Open Link
            <div className='RightSlot'>
              <ArrowUpRight
                size={16}
                color='currentColor'
                weight='regular'
              />
            </div>
          </ContextMenu.Item>
        </ContextMenu.Content>
      </ContextMenu.Portal>
    </ContextMenu.Root>
  )
}
