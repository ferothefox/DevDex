'use client'

import { BadgeProps } from '@/components/Profile/Badge'
import Flair from '@/components/Profile/Flairs'
import { Renderers } from '@/components/Renderers'
import { User } from '@prisma/client'
import * as ContextMenu from '@radix-ui/react-context-menu'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import * as HoverCard from '@radix-ui/react-hover-card'
import * as Portal from '@radix-ui/react-portal'
import * as Toast from '@radix-ui/react-toast'
import * as Tooltip from '@radix-ui/react-tooltip'
import { UserContext } from 'app/UserProvider'
import clsx from 'clsx'
import moment from 'moment'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  BookmarkSimple,
  ChatCircle,
  DotsThreeVertical,
  HeartStraight,
  Link as CopyLink,
  TrashSimple,
  User as Profile,
  UserPlus,
  XCircle,
} from 'phosphor-react'
import { useContext, useEffect, useState } from 'react'
import { FocusRing } from 'react-focus-rings'
import 'react-focus-rings/src/styles.css'
import ReactMarkdown from 'react-markdown'
import { CodeProps } from 'react-markdown/lib/ast-to-react'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { dark } from 'react-syntax-highlighter/dist/cjs/styles/hljs'
import remarkGfm from 'remark-gfm'
import 'styles/Feed.module.scss'

export interface PostProps {
  id: number
  parentId: number
  authorId: string
  title?: string
  content: string
  tags: Array<{ name: string }>
  likedBy: Array<User>
  favoritesCount: Array<User>
  // replies: Array<ReplyProps>
  published: boolean
  createdAt: string
  updatedAt: string
  staff: number
  author: {
    username: string
    email: string
    flair: string
    image: string
    premium: string
    staff: string
    bio: string
    banner: string
    color: string
    badges: Array<BadgeProps>
  }

  _count: {
    children: number
  }
}

export default (props: {
  key: number
  id: string
  post: PostProps
  standalone: boolean
}) => {
  const router = useRouter()
  const [toastOpen, setToastOpen] = useState(false)

  const [liked, setLiked] = useState(
    props.post.likedBy?.some(user => user?.id === props.id) || false
  )
  const [faved, setFaved] = useState(
    props.post.favoritesCount?.some(user => user?.id === props.id) || false
  )
  const [likeCount, setLikeCount] = useState(props.post.likedBy?.length || 0)
  const user = useContext(UserContext)

  useEffect(() => {
    setLikeCount(props.post.likedBy?.length || 0)
  }, [props.post.likedBy])

  const handleLike = async (id: string) => {
    setLiked(!liked)

    liked ? setLikeCount(likeCount - 1) : setLikeCount(likeCount + 1)

    const res = liked
      ? await fetch(`/api/likes/remove/${props.post.id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id,
        }),
      })
      : await fetch(`/api/likes/add/${props.post.id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id,
        }),
      })

    if (res.status < 300) {
      router.refresh()
    } else {
      console.error(res)
    }
  }

  const handleFavorite = async (id: string) => {
    setFaved(!faved)

    const res = faved
      ? await fetch(`/api/favorites/remove/${props.post.id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id,
        }),
      })
      : await fetch(`/api/favorites/add/${props.post.id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id,
        }),
      })

    if (res.status < 300) {
      router.refresh()
    } else {
      console.error(res)
    }
  }

  const handleCopy = async (id: number) => {
    navigator.clipboard.writeText(`https://devdex.me/post/${id}`)
    setToastOpen(true)

    setTimeout(() => {
      setToastOpen(false)
    }, 2500)
  }

  // const deletePost = async (id: number, id: number) => {
  //   const res = await fetch(`/api/posts/delete/${id}`, {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({
  //       id,
  //     }),
  //   })

  //   if (res.status < 300) {
  //     refreshData()
  //   } else {
  //     console.error(res)
  //   }
  // }

  return (
    <Toast.Provider duration={1000}>
      <ContextMenu.Root>
        <ContextMenu.Trigger
          asChild
          className='ContextMenuTrigger'
        >
          <div className='app__focus-ring-wrapper relative contents'>
            <FocusRing offset={-2}>
              <div
                tabIndex={0}
                // onClick={() => {
                //   if (!props.standalone)
                //     router.push({
                //       pathname: '/post/[id]',
                //       query: { id: props.post.id },
                //     })
                // }}
                className={clsx(
                  'feed-post break-word flex h-fit w-full max-w-xl flex-col rounded-2xl border-light-border bg-light-card  text-light-bright dark:border-dark-border dark:bg-[#10131E] dark:text-dark-bright dark:hover:bg-[#22242e]',
                  !props.standalone && '[&>*]:rounded-none',
                  props.standalone && '!cursor-default'
                )}
              >
                <div className='feed-post-header !rounded-t-2xl px-4 pt-4'>
                  {/* Post Author */}
                  <div
                    onClick={e => e.stopPropagation()}
                    className='feed-post-child feed-post-author flex flex-row items-center gap-4 text-sm font-bold text-light-muted dark:text-dark-muted'
                  >
                    <HoverCard.Root openDelay={75}>
                      <HoverCard.Trigger>
                        <div className='app__hovercard-focus-ring-wrapper relative contents'>
                          <FocusRing offset={-2}>
                            <Link
                              tabIndex={0}
                              href={`/${encodeURIComponent(
                                props.post.author.username
                              )}`}
                              className='feed-post-author-avatar flex-shrink-0 cursor-pointer overflow-hidden rounded-lg'
                            >
                              <Image
                                width={36}
                                height={36}
                                src={
                                  props.post.author.image ||
                                  '/placeholder-avatar.png'
                                }
                                alt='User Avatar'
                                className='max-w-full min-w-[36px] min-h-[36px] duration-200 hover:opacity-70 rounded-lg'
                              />
                            </Link>
                          </FocusRing>
                        </div>
                      </HoverCard.Trigger>

                      <HoverCard.Portal>
                        <HoverCard.Content
                          collisionPadding={24}
                          className='HoverCardContent'
                          sideOffset={5}
                        >
                          <div
                            style={{
                              display: 'flex',
                              flexDirection: 'column',
                              gap: 7,
                            }}
                          >
                            <div className='profile-banner relative flex aspect-[3/1] w-full'>
                              {props.post?.author?.banner ? (
                                <Image
                                  src={props.post.author.banner}
                                  alt='Profile Banner'
                                  priority
                                  fill
                                  sizes='(max-width: 640px) 640px, (max-width: 768px) 768px, (max-width: 1024px) 1024px, (max-width: 1280px) 1280px, (max-width: 1536px) 1536px, 1920px'
                                  className='profile-banner-image !relative aspect-auto min-h-full min-w-full rounded-t-lg object-cover'
                                />
                              ) : (
                                <div
                                  className='profile-banner-color flex flex-grow rounded-t-lg'
                                  style={{
                                    backgroundColor:
                                      '#' + props?.post?.author.color ||
                                      '#000000',
                                  }}
                                />
                              )}
                            </div>
                            <Image
                              width={48}
                              height={48}
                              src={
                                props.post.author.image ||
                                '/placeholder-avatar.png'
                              }
                              alt='User Avatar'
                              className='z-10 ml-4 -mt-[24px] max-w-full rounded-xl border-4 duration-200 hover:opacity-70 dark:border-dark-floating'
                            />
                            <div
                              style={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 15,
                              }}
                              className='px-5 pt-0 pb-5'
                            >
                              <div>
                                <div className=''>
                                  <Link
                                    href={`/${encodeURIComponent(
                                      props.post.author.username
                                    )}`}
                                    className='feed-post-author-name flex cursor-pointer flex-row items-center hover:underline'
                                  >
                                    <div className='flex items-center'>
                                      <Flair flair={props.post.author.flair} />

                                      <span
                                        className={clsx(
                                          'feed-post-author-username text-light-bright dark:text-dark-bright'
                                          // props.standalone ? '-mt-1' : '-mt-0.5'
                                        )}
                                      >
                                        {props.post.author.username}
                                      </span>
                                      {props.post.author.badges?.map(badge => (
                                        <Tooltip.Provider
                                          skipDelayDuration={0}
                                          delayDuration={0}
                                        >
                                          <Tooltip.Root>
                                            <Tooltip.Trigger asChild>
                                              <div className='profile-info-badge ml-1 flex flex-row'>
                                                <Image
                                                  src={`/badges/${badge.name}.svg`}
                                                  alt={badge.displayName}
                                                  width={18}
                                                  height={18}
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
                                  </Link>
                                </div>
                              </div>

                              <div className='font-normal'>
                                {props.post.author.bio}
                              </div>
                            </div>
                          </div>
                        </HoverCard.Content>
                      </HoverCard.Portal>
                    </HoverCard.Root>

                    <div
                      onClick={e => e.stopPropagation()}
                      className='feed-post-author-content flex w-full flex-row gap-2'
                    >
                      <FocusRing offset={-2}>
                        <Link
                          tabIndex={0}
                          href={`/${encodeURIComponent(
                            props.post.author.username
                          )}`}
                          className='feed-post-author-name flex cursor-pointer flex-row items-center hover:underline'
                        >
                          <div className='flex items-center'>
                            <Flair flair={props.post.author.flair} />

                            <span
                              className={clsx(
                                'feed-post-author-username text-light-bright dark:text-dark-bright'
                                // props.standalone ? '-mt-1' : '-mt-0.5'
                              )}
                            >
                              {props.post.author.username}
                            </span>
                          </div>
                        </Link>
                      </FocusRing>
                      <div className='feed-post-timestamp ml-auto flex cursor-default flex-row gap-4 text-sm font-normal'>
                        <div>{moment(props.post.createdAt).fromNow()}</div>
                        {props.post.updatedAt !== props.post.createdAt && (
                          <div>
                            (Edited&nbsp;
                            {moment(props.post.updatedAt).fromNow()})
                          </div>
                        )}
                      </div>
                    </div>
                    <Tooltip.Provider
                      skipDelayDuration={0}
                      delayDuration={0}
                    >
                      <Tooltip.Root>
                        <Tooltip.Trigger asChild>
                          <DropdownMenu.Root>
                            <DropdownMenu.Trigger asChild>
                              <a
                                tabIndex={0}
                                className='rounded-md p-1  duration-75 dark:hover:bg-[#22242e] dark:hover:text-dark-bright dark:focus-visible:bg-[#22242e]'
                              >
                                <DotsThreeVertical
                                  size={25}
                                ></DotsThreeVertical>
                              </a>
                            </DropdownMenu.Trigger>

                            <DropdownMenu.Portal>
                              <DropdownMenu.Content
                                loop
                                className='ContextMenuContent'
                                collisionPadding={8}
                              >
                                <DropdownMenu.Item
                                  onSelect={() =>
                                    navigator.clipboard.writeText(
                                      `https://devdex.me/post/${props.post.id}`
                                    )
                                  }
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
                                </DropdownMenu.Item>

                                {props.post.authorId !== user?.id && (
                                  <>
                                    <DropdownMenu.Separator className='ContextMenuSeparator' />

                                    <DropdownMenu.Item className='ContextMenuItem'>
                                      Go to @
                                      {props.post.author.username || 'Unknown'}
                                      <div className='RightSlot'>
                                        <Profile
                                          size={16}
                                          color='currentColor'
                                          weight='regular'
                                        />
                                      </div>
                                    </DropdownMenu.Item>
                                    <DropdownMenu.Item className='ContextMenuItem'>
                                      Follow @
                                      {props.post.author.username || 'Unknown'}
                                      <div className='RightSlot'>
                                        <UserPlus
                                          size={16}
                                          color='currentColor'
                                          weight='regular'
                                        />
                                      </div>
                                    </DropdownMenu.Item>
                                    <DropdownMenu.Item className='ContextMenuItem'>
                                      Follow Post
                                    </DropdownMenu.Item>
                                  </>
                                )}

                                <DropdownMenu.Separator className='ContextMenuSeparator' />

                                <DropdownMenu.Item className='ContextMenuItem'>
                                  Hide Post
                                  <div className='RightSlot'>
                                    <UserPlus
                                      size={16}
                                      color='currentColor'
                                      weight='regular'
                                    />
                                  </div>
                                </DropdownMenu.Item>
                                {props.post.authorId !== user?.id && (
                                  <DropdownMenu.Item className='ContextMenuItem DangerItem'>
                                    Block @
                                    {props.post.author.username || 'Unknown'}
                                    <div className='RightSlot'>
                                      <XCircle
                                        size={16}
                                        color='currentColor'
                                        weight='regular'
                                      />
                                    </div>
                                  </DropdownMenu.Item>
                                )}

                                {props.post.authorId === user?.id && (
                                  <DropdownMenu.Item
                                    onSelect={() => {
                                      // deletePost(props.post.id, user?.id)
                                    }}
                                    className='ContextMenuItem DangerItem'
                                  >
                                    Delete Post
                                    <div className='RightSlot'>
                                      <TrashSimple
                                        size={16}
                                        color='currentColor'
                                        weight='regular'
                                      />
                                    </div>
                                  </DropdownMenu.Item>
                                )}
                              </DropdownMenu.Content>
                            </DropdownMenu.Portal>
                          </DropdownMenu.Root>
                        </Tooltip.Trigger>

                        <Tooltip.Portal>
                          <Tooltip.Content
                            side='top'
                            className='TooltipContent'
                            sideOffset={5}
                          >
                            More
                            <Tooltip.Arrow className='TooltipArrow' />
                          </Tooltip.Content>
                        </Tooltip.Portal>
                      </Tooltip.Root>
                    </Tooltip.Provider>
                  </div>

                  {/* Post Title */}
                  <FocusRing offset={-2}>
                    <Link
                      href={`/${encodeURIComponent(
                        props.post.author.username
                      )}/post/${encodeURIComponent(props.post.id)}`}
                      tabIndex={0}
                      className='feed-post-child feed-post-title focus focus: cursor-pointer border-none text-lg font-bold  text-light-bright duration-200 hover:underline focus:underline dark:text-dark-bright'
                    >
                      {props.post.title}
                    </Link>
                  </FocusRing>
                </div>

                <div className='feed-post-child feed-post-content-wrapper !mb-0 px-4 py-4'>
                  {/* Post Content */}
                  <div className='feed-post-child feed-post-content relative'>
                    <ReactMarkdown
                      components={{
                        p: ({ ...props }) => <Renderers.text {...props} />,
                        h1: ({ ...props }) => (
                          <Renderers.largestheader {...props} />
                        ),
                        a: ({ ...props }) => <Renderers.link {...props} />,
                        blockquote: ({ ...props }) => (
                          <Renderers.blockquote {...props} />
                        ),
                        img: ({ ...props }) => <Renderers.image {...props} />,
                        code({
                          inline,
                          className,
                          children,
                          // eslint-disable-next-line @typescript-eslint/no-unused-vars
                          style,
                          ...props
                        }: CodeProps) {
                          const match = /language-(\w+)/.exec(className || '')
                          return !inline && match ? (
                            <SyntaxHighlighter
                              className={''}
                              children={String(children).replace(/\n$/, '')}
                              style={dark}
                              language={match[1]}
                              useInlineStyles={false}
                              PreTag='div'
                              {...props}
                            />
                          ) : (
                            <code
                              className={className}
                              {...props}
                            >
                              {children}
                            </code>
                          )
                        },
                        ul: ({ ...props }) => <Renderers.ul {...props} />,
                        ol: ({ ...props }) => <Renderers.ol {...props} />,
                      }}
                      remarkPlugins={[remarkGfm]}
                      className='markdown-body'
                    >
                      {props.post.content}
                    </ReactMarkdown>
                  </div>

                  {/* Post Tags */}
                  {props.post.tags.length > 0 && (
                    <div
                      onClick={e => e.stopPropagation()}
                      className='feed-post-child feed-post-tags flex cursor-default flex-row flex-wrap gap-2'
                    >
                      {props.post.tags.map(tag => (
                        <FocusRing>
                          <Link
                            href={`/post/tags/${encodeURIComponent(tag.name)}`}
                            tabIndex={0}
                            className='feed-post-tag-item cursor-pointer select-none rounded-full py-[4px] px-[8px] font-jetbrains text-xs opacity-60 hover:opacity-100'
                            key={tag.name}
                          >
                            #{tag.name}
                          </Link>
                        </FocusRing>
                      ))}
                    </div>
                  )}
                </div>
                {/* end content */}

                <div
                  onClick={e => e.stopPropagation()}
                  className={clsx('feed-post-footer cursor-default px-2 py-2')}
                >
                  <div className='feed-post-footer-actions flex w-full flex-row items-center justify-end gap-4'>
                    <Tooltip.Provider
                      skipDelayDuration={0}
                      delayDuration={0}
                    >
                      <Tooltip.Root>
                        <Tooltip.Trigger asChild>
                          <div className='post-button-item flex items-center justify-center'>
                            {liked ? (
                              <a
                                tabIndex={0}
                                className='flex cursor-pointer flex-row items-center gap-2 rounded-full p-2  dark:hover:bg-[#22242e] dark:focus-visible:bg-[#22242e]'
                                onClick={() => handleLike(props.id)}
                              >
                                <HeartStraight
                                  size={24}
                                  color='#f91880'
                                  weight='fill'
                                />
                                {likeCount > 0 ? (
                                  <div className='likes-counter text-sm'>
                                    {likeCount}
                                  </div>
                                ) : (
                                  <div className='likes-counter hidden text-sm opacity-0'>
                                    0
                                  </div>
                                )}
                              </a>
                            ) : (
                              <a
                                tabIndex={0}
                                className='flex cursor-pointer flex-row items-center gap-2 rounded-full p-2  dark:hover:bg-[#22242e] dark:focus-visible:bg-[#22242e]'
                                onClick={() => handleLike(props.id)}
                              >
                                <HeartStraight
                                  size={24}
                                  color='#f7f8ff'
                                  weight='regular'
                                />
                                {likeCount > 0 ? (
                                  <div className='likes-counter text-sm'>
                                    {likeCount}
                                  </div>
                                ) : (
                                  <div className='likes-counter hidden text-sm opacity-0'>
                                    0
                                  </div>
                                )}
                              </a>
                            )}
                          </div>
                        </Tooltip.Trigger>
                        <Tooltip.Portal>
                          <Tooltip.Content
                            side='top'
                            className='TooltipContent'
                            sideOffset={5}
                          >
                            Like
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
                          <div className='post-button-item mr-auto flex items-center justify-center'>
                            {!props.standalone &&
                              (props?.post?._count?.children > 0 ? (
                                <Link
                                  href={`/${props.post.author.username}/post/${props.post.id}`}
                                  tabIndex={0}
                                  className='cursor-pointer rounded-full p-2  dark:hover:bg-[#22242e] dark:focus-visible:bg-[#22242e]'
                                >
                                  <ChatCircle
                                    size={24}
                                    color='#f7f8ff'
                                    weight='regular'
                                  />
                                </Link>
                              ) : (
                                <Link
                                  tabIndex={0}
                                  href={`/${props.post.author.username}/post/${props.post.id}`}
                                  className='cursor-pointer rounded-full p-2  dark:hover:bg-[#22242e] dark:focus-visible:bg-[#22242e]'
                                >
                                  <ChatCircle
                                    size={24}
                                    color='#f7f8ff'
                                    weight='regular'
                                  />
                                </Link>
                              ))}

                            {!props.standalone &&
                              (props?.post?._count?.children > 0 ? (
                                <div className='replies-counter text-sm'>
                                  {props?.post?._count?.children}
                                </div>
                              ) : (
                                <div className='w-[4px]'></div>
                              ))}
                          </div>
                        </Tooltip.Trigger>
                        <Tooltip.Portal>
                          <Tooltip.Content
                            side='top'
                            className='TooltipContent'
                            sideOffset={5}
                          >
                            Reply
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
                          <div className='post-button-item flex items-center justify-center'>
                            {faved ? (
                              <a
                                tabIndex={0}
                                className='post-button-item cursor-pointer rounded-full p-2  dark:hover:bg-[#22242e] dark:focus-visible:bg-[#22242e]'
                                onClick={() => handleFavorite(props.id)}
                              >
                                <BookmarkSimple
                                  size={24}
                                  color='#f9b718'
                                  weight='fill'
                                />
                              </a>
                            ) : (
                              <a
                                tabIndex={0}
                                className='post-button-item cursor-pointer rounded-full p-2  dark:hover:bg-[#22242e] dark:focus-visible:bg-[#22242e]'
                                onClick={() => handleFavorite(props.id)}
                              >
                                <BookmarkSimple
                                  size={24}
                                  color='#f7f8ff'
                                  weight='regular'
                                />
                              </a>
                            )}
                          </div>
                        </Tooltip.Trigger>
                        <Tooltip.Portal>
                          <Tooltip.Content
                            side='top'
                            className='TooltipContent'
                            sideOffset={5}
                          >
                            Save
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
                          <div className='post-button-item flex items-center justify-center'>
                            <a
                              tabIndex={0}
                              className='post-button-item cursor-pointer rounded-full p-2  dark:hover:bg-[#22242e] dark:focus-visible:bg-[#22242e]'
                              onClick={() => handleCopy(props.post.id)}
                            >
                              <CopyLink
                                size={24}
                                color='#f7f8ff'
                                weight='regular'
                              />
                            </a>
                          </div>
                        </Tooltip.Trigger>
                        <Tooltip.Portal>
                          <Tooltip.Content
                            side='top'
                            className='TooltipContent'
                            sideOffset={5}
                          >
                            Copy Link
                            <Tooltip.Arrow className='TooltipArrow' />
                          </Tooltip.Content>
                        </Tooltip.Portal>
                      </Tooltip.Root>
                    </Tooltip.Provider>
                  </div>
                </div>
              </div>
            </FocusRing>
          </div>
        </ContextMenu.Trigger>

        <ContextMenu.Portal>
          <ContextMenu.Content
            loop
            className='ContextMenuContent'
            collisionPadding={8}
          >
            <ContextMenu.Item
              onSelect={() =>
                navigator.clipboard.writeText(
                  `https://devdex.me/post/${props.post.id}`
                )
              }
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

            {props.post.authorId !== user?.id && (
              <>
                <ContextMenu.Separator className='ContextMenuSeparator' />

                <ContextMenu.Item className='ContextMenuItem'>
                  Go to @{props.post.author.username || 'Unknown'}
                  <div className='RightSlot'>
                    <Profile
                      size={16}
                      color='currentColor'
                      weight='regular'
                    />
                  </div>
                </ContextMenu.Item>
                <ContextMenu.Item className='ContextMenuItem'>
                  Follow @{props.post.author.username || 'Unknown'}
                  <div className='RightSlot'>
                    <UserPlus
                      size={16}
                      color='currentColor'
                      weight='regular'
                    />
                  </div>
                </ContextMenu.Item>
                <ContextMenu.Item className='ContextMenuItem'>
                  Follow Post
                </ContextMenu.Item>
              </>
            )}

            <ContextMenu.Separator className='ContextMenuSeparator' />

            <ContextMenu.Item className='ContextMenuItem'>
              Hide Post
              <div className='RightSlot'>
                <UserPlus
                  size={16}
                  color='currentColor'
                  weight='regular'
                />
              </div>
            </ContextMenu.Item>
            {props.post.authorId !== user?.id && (
              <ContextMenu.Item className='ContextMenuItem DangerItem'>
                Block @{props.post.author.username || 'Unknown'}
                <div className='RightSlot'>
                  <XCircle
                    size={16}
                    color='currentColor'
                    weight='regular'
                  />
                </div>
              </ContextMenu.Item>
            )}

            {props.post.authorId === user?.id && (
              <ContextMenu.Item
                onSelect={() => {
                  // deletePost(props.post.id, user?.id)
                }}
                className='ContextMenuItem DangerItem'
              >
                Delete Post
                <div className='RightSlot'>
                  <TrashSimple
                    size={16}
                    color='currentColor'
                    weight='regular'
                  />
                </div>
              </ContextMenu.Item>
            )}
          </ContextMenu.Content>
        </ContextMenu.Portal>
      </ContextMenu.Root>
      <Portal.Root>
        <Toast.Root
          className='ToastRoot InfoToast'
          open={toastOpen}
          onOpenChange={setToastOpen}
        >
          <Toast.Title className='ToastTitle !mb-0'>Copied Link!</Toast.Title>
          <Toast.Close />
        </Toast.Root>
        <Toast.Viewport className='ToastViewport CopyLinkViewport' />
      </Portal.Root>
    </Toast.Provider>
  )
}
