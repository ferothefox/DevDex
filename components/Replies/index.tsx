import Flair from '@/components/Profile/Flairs'
import { Renderers } from '@/components/Renderers'
import { User } from '@prisma/client'
import '@szhsin/react-menu/dist/index.css'
import '@szhsin/react-menu/dist/transitions/slide.css'
import moment from 'moment'
import Image from 'next/image'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'
import { CodeProps } from 'react-markdown/lib/ast-to-react'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { dark } from 'react-syntax-highlighter/dist/cjs/styles/hljs'
import remarkGfm from 'remark-gfm'
import 'styles/Feed.module.scss'

export interface ReplyProps {
  id: string
  authorId: string
  author: {
    username: string
    email: string
    flair: string
    image: string
    premium: string
    staff: string
  }
  content: string
  createdAt: string
  updatedAt: string
  favoritesCount: Array<User>
  children: Array<ReplyProps>
}

export default (props: { reply: ReplyProps; id: string }) => {
  // const [menuProps, toggleMenu] = useMenuState()
  // const [anchorPoint, setAnchorPoint] = useState({ x: 0, y: 0 })
  // const { user } = useUserStore()
  // const queryClient = useQueryClient()

  // const deleteReply = async (id: string, id: number) => {
  //   const res = await fetch(`/api/replies/delete/${id}`, {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({
  //       id,
  //     }),
  //   })

  //   res.status < 300
  //     ? queryClient.invalidateQueries({ queryKey: ['replies'] })
  //     : console.error(res)
  // }

  return (
    <div className='reply-main rounded-xl px-6 py-6  text-sm font-bold dark:bg-[#10131E]'>
      <div className='flex'>
        <Link
          href={`/${encodeURIComponent(props.reply.author.username)}`}
          className='feed-post-author-avatar flex-shrink-0 cursor-pointer'
        >
          <Image
            width={36}
            height={36}
            src={props.reply.author.image || '/placeholder-avatar.png'}
            alt='User Avatar'
            className='feed-post-author-avatar flex-shrink-0 rounded-lg duration-200 hover:opacity-70'
          />
        </Link>
        <div
          style={{ wordBreak: 'break-word' }}
          className='reply-content flex h-full w-full flex-col gap-2'
        >
          <div className='reply-header flex w-full flex-row items-center'>
            <div className='reply-author ml-4 flex items-center'>
              <Flair flair={props.reply.author.flair} />

              <span className='feed-post-author-username text-light-bright dark:text-dark-bright'>
                {props.reply.author.username}
              </span>
            </div>

            <div className='reply-timestamp ml-auto text-xs font-normal dark:text-dark-muted'>
              {moment(props.reply.createdAt).fromNow()}
            </div>
          </div>

          <div className='reply-body ml-4 h-full w-full text-base font-normal'>
            <div className='feed-post-child feed-post-content relative'>
              <ReactMarkdown
                components={{
                  p: ({ ...props }) => <Renderers.text {...props} />,
                  h1: ({ ...props }) => <Renderers.largestheader {...props} />,
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
                {props.reply.content}
              </ReactMarkdown>
            </div>
          </div>
        </div>
      </div>
      {props.reply.children.map((child: ReplyProps) => (
        <div className='reply-main reply-child border-l-2 pt-6 pl-4  text-sm font-bold duration-150 dark:border-dark-border dark:bg-[#10131E] dark:hover:border-[#85859B]'>
          <div className='flex'>
            <Link
              href={`/${encodeURIComponent(child.author.username)}`}
              className='feed-post-author-avatar flex-shrink-0 cursor-pointer'
            >
              <Image
                width={36}
                height={36}
                src={child.author.image || '/placeholder-avatar.png'}
                alt='User Avatar'
                className='feed-post-author-avatar flex-shrink-0 rounded-lg duration-200 hover:opacity-70'
              />
            </Link>
            <div
              style={{ wordBreak: 'break-word' }}
              className='reply-content flex h-full w-full flex-col gap-2'
            >
              <div className='reply-header flex w-full flex-row items-center'>
                <div className='reply-author ml-4 flex items-center'>
                  <Flair flair={child.author.flair} />

                  <span className='feed-post-author-username text-light-bright dark:text-dark-bright'>
                    {child.author.username}
                  </span>
                </div>

                <div className='reply-timestamp ml-auto text-xs font-normal dark:text-dark-muted'>
                  {moment(child.createdAt).fromNow()}
                </div>
              </div>

              <div className='reply-body ml-4 h-full w-full text-base font-normal'>
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
                    {child.content}
                  </ReactMarkdown>
                </div>
              </div>
            </div>
          </div>
          {child.children.map((childChild: ReplyProps) => (
            <div className='reply-main reply-child border-l-2 pt-6 pl-4  text-sm font-bold duration-150 dark:border-dark-border dark:bg-[#10131E] dark:hover:border-[#85859B]'>
              <div className='flex'>
                <Link
                  href={`/${encodeURIComponent(childChild.author.username)}`}
                  className='feed-post-author-avatar flex-shrink-0 cursor-pointer'
                >
                  <Image
                    width={36}
                    height={36}
                    src={childChild.author.image || '/placeholder-avatar.png'}
                    alt='User Avatar'
                    className='feed-post-author-avatar flex-shrink-0 rounded-lg duration-200 hover:opacity-70'
                  />
                </Link>
                <div
                  style={{ wordBreak: 'break-word' }}
                  className='reply-content flex h-full w-full flex-col gap-2'
                >
                  <div className='reply-header flex w-full flex-row items-center'>
                    <div className='reply-author ml-4 flex items-center'>
                      <Flair flair={childChild.author.flair} />

                      <span className='feed-post-author-username text-light-bright dark:text-dark-bright'>
                        {childChild.author.username}
                      </span>
                    </div>

                    <div className='reply-timestamp ml-auto text-xs font-normal dark:text-dark-muted'>
                      {moment(childChild.createdAt).fromNow()}
                    </div>
                  </div>

                  <div className='reply-body ml-4 h-full w-full text-base font-normal'>
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
                        {childChild.content}
                      </ReactMarkdown>
                    </div>
                  </div>
                </div>
              </div>
              {childChild.children.map((childChildChild: ReplyProps) => (
                <div className='reply-main reply-child border-l-2 pt-6 pl-4  text-sm font-bold duration-150 dark:border-dark-border dark:bg-[#10131E] dark:hover:border-[#85859B]'>
                  <div className='flex'>
                    <Link
                      href={`/${encodeURIComponent(
                        childChildChild.author.username
                      )}`}
                      className='feed-post-author-avatar flex-shrink-0 cursor-pointer'
                    >
                      <Image
                        width={36}
                        height={36}
                        src={
                          childChildChild.author.image ||
                          '/placeholder-avatar.png'
                        }
                        alt='User Avatar'
                        className='feed-post-author-avatar flex-shrink-0 rounded-lg duration-200 hover:opacity-70'
                      />
                    </Link>
                    <div className='reply-content flex h-full w-full flex-col gap-2'>
                      <div className='reply-header flex w-full flex-row items-center'>
                        <div className='reply-author ml-4 flex items-center'>
                          <Flair flair={childChildChild.author.flair} />

                          <span className='feed-post-author-username text-light-bright dark:text-dark-bright'>
                            {childChildChild.author.username}
                          </span>
                        </div>

                        <div className='reply-timestamp ml-auto text-xs font-normal dark:text-dark-muted'>
                          {moment(childChildChild.createdAt).fromNow()}
                        </div>
                      </div>

                      <div className='reply-body ml-4 h-full w-full text-base font-normal'>
                        <div className='feed-post-child feed-post-content relative'>
                          <ReactMarkdown
                            components={{
                              p: ({ ...props }) => (
                                <Renderers.text {...props} />
                              ),
                              h1: ({ ...props }) => (
                                <Renderers.largestheader {...props} />
                              ),
                              a: ({ ...props }) => (
                                <Renderers.link {...props} />
                              ),
                              blockquote: ({ ...props }) => (
                                <Renderers.blockquote {...props} />
                              ),
                              img: ({ ...props }) => (
                                <Renderers.image {...props} />
                              ),
                              code({
                                inline,
                                className,
                                children,
                                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                                style,
                                ...props
                              }: CodeProps) {
                                const match = /language-(\w+)/.exec(
                                  className || ''
                                )
                                return !inline && match ? (
                                  <SyntaxHighlighter
                                    className={''}
                                    children={String(children).replace(
                                      /\n$/,
                                      ''
                                    )}
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
                            {childChildChild.content}
                          </ReactMarkdown>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      ))}
    </div>
    // what if i said i was planning something
  )
}
