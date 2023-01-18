import { Renderers } from '@/components/Renderers'
import { useQueryClient } from '@tanstack/react-query'
import clsx from 'clsx'
import { FormEvent, useRef, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import { CodeProps } from 'react-markdown/lib/ast-to-react'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { dark } from 'react-syntax-highlighter/dist/cjs/styles/hljs'
import remarkGfm from 'remark-gfm'
import 'styles/ReplyComposer.module.scss'

// const replyInfo = (postId: number) =>
//   useQuery(
//     ['replies', postId],
//     async () =>
//       await (
//         await fetch(`/api/replies/get/${postId}`, {
//           method: 'GET',
//           headers: {
//             'Content-Type': 'application/json',
//             'Cache-Control': 'public, s-maxage=5, stale-while-revalidate=10',
//           },
//         })
//       ).json()
//   )

export default (props: { postId: number }) => {
  const queryClient = useQueryClient()
  const [content, setContent] = useState('')
  // const [replyOrder, setReplyOrder] = useState('asc')
  const [activeTab, setActiveTab] = useState('write')
  const [replyComposerActive, setReplyComposerActive] = useState(false)
  const [isReplying, setIsReplying] = useState(false)
  const focusWriteTabInput = useRef<HTMLTextAreaElement>(null)
  // const { user } = useUserStore()

  // const { isLoading, data: allReplies } = replyInfo(props.postId)

  const handleWrite = () => {
    setActiveTab('write')
    focusWriteTabInput?.current?.focus()
  }

  const handlePreview = () => {
    setActiveTab('preview')
  }

  // const handleAsc = () => {
  // setReplyOrder('asc')
  // }

  // const handleDesc = () => {
  // setReplyOrder('desc')
  // }

  const handleComposerSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsReplying(true)

    const res = await fetch(`/api/replies/create/${props.postId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        content,
      }),
    })

    if (res.status < 300) {
      setIsReplying(false)
      setContent('')
      queryClient.invalidateQueries({ queryKey: ['replies'] })
    }
  }

  return (
    <div className='comments-display mx-auto flex w-full max-w-xl flex-col gap-4'>
      {/* <ReplyComposer postId={props.postData.post.id} /> */}

      <form
        onSubmit={handleComposerSubmit}
        className='comment-composer flex w-full flex-col items-center justify-center'
      >
        <label
          htmlFor='content'
          className='h-0 w-0 overflow-hidden opacity-0'
        >
          Reply to this post
        </label>
        <div className='comment-composer-wrapper focus-lock flex w-full max-w-xl flex-col rounded-xl border-light-border p-4 dark:border-dark-border dark:bg-[#10131E]'>
          <div
            onBlur={() => setReplyComposerActive(false)}
            className={clsx(
              'tabbed-view-header flex w-full text-light-bright duration-75 ease-in dark:text-dark-bright',
              replyComposerActive
                ? 'opacity-1 max-h-[64px]'
                : 'pointer-events-none max-h-0 opacity-0'
            )}
          >
            <div className='reply-composer-tabbed-view flex flex-row gap-2 rounded-t-xl bg-light-main py-[4px] px-[4px] dark:bg-[#06070b]'>
              <div
                className={clsx(
                  'tabbed-view-tabitem z-10 flex cursor-pointer select-none rounded-lg px-3 py-2 text-center duration-75',
                  activeTab === 'write'
                    ? 'tabbed-view-tabitem-active dark:bg-[#10131E]'
                    : ''
                )}
                onClick={handleWrite}
              >
                Write
              </div>
              <div
                className={clsx(
                  'tabbed-view-tabitem z-10 flex cursor-pointer select-none rounded-lg px-3 py-2 text-center duration-75',
                  activeTab === 'preview'
                    ? 'tabbed-view-tabitem-active dark:bg-[#10131E]'
                    : ''
                )}
                onClick={handlePreview}
              >
                Preview
              </div>
            </div>
          </div>
          <div
            className={clsx(
              'comment-composer-slate flex min-h-[120px] rounded-lg rounded-tl-none bg-light-main duration-75 dark:bg-[#06070b]',
              replyComposerActive
                ? '!min-h-[120px] !rounded-tl-none'
                : '!min-h-[24px] !rounded-tl-lg'
            )}
          >
            <div className='flex flex-grow px-2 py-2'>
              <div className='tabbed-view-outlet h-full w-full'>
                {activeTab === 'write' ? (
                  <textarea
                    ref={focusWriteTabInput}
                    onClick={() => setReplyComposerActive(true)}
                    onFocus={() => setReplyComposerActive(true)}
                    // onBlur={() => setReplyComposerActive(false)}
                    onChange={e => setContent(e.target.value)}
                    placeholder={
                      'Write a reply. Markdown is supported. Remember to be respecful!'
                    }
                    value={content}
                    id='content'
                    name='content'
                    tabIndex={1}
                    className={clsx(
                      'flex max-h-full min-h-[120px] w-full flex-grow resize-none appearance-none items-start border-0 bg-light-main p-1 text-light-muted  duration-75 focus:text-light-bright dark:bg-[#06070b] dark:text-dark-muted dark:focus:text-dark-bright',
                      replyComposerActive ? '!min-h-[120px]' : '!min-h-[24px]'
                    )}
                  ></textarea>
                ) : (
                  <div
                    onClick={handleWrite}
                    className='markdown-renderer-mount break-word h-full min-h-[120px] w-full max-w-[704px] overflow-y-auto p-1'
                    style={{ wordBreak: 'break-word' }}
                  >
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
                      {content}
                    </ReactMarkdown>
                  </div>
                )}
              </div>
            </div>
          </div>
          <button
            tabIndex={1}
            disabled={!content || isReplying === true}
            className='ml-auto mt-4 h-fit w-fit cursor-pointer whitespace-nowrap rounded-lg border-[1px] border-brand bg-brand-muted py-1 px-4 text-center font-normal text-dark-bright  transition-opacity duration-200 focus-within:opacity-40 hover:opacity-40 active:!scale-[0.95] disabled:cursor-default disabled:grayscale disabled:focus-within:opacity-100 disabled:hover:opacity-100 disabled:active:!scale-100'
            type='submit'
          >
            Reply
          </button>
        </div>
      </form>
      <div className='h-24'></div>
      {/* {!isLoading && allReplies.replies.length > 0 && (
          <>
            <div
              id='replies'
              className='comments-dispay-header -mt-16 flex flex-row items-center text-2xl font-bold '
            >
              Replies - {allReplies.replies.length}
              <div className='tabbed-view text-md ml-auto flex flex-row gap-2 rounded-t-xl bg-light-main py-[4px] px-[4px] dark:bg-[#06070b]'>
                <div
                  className={clsx(
                    'tabbed-view-tabitem flex cursor-pointer select-none rounded-lg px-3 py-2 text-center duration-75',
                    replyOrder === 'asc'
                      ? 'tabbed-view-tabitem-active dark:bg-[#10131E]'
                      : ''
                  )}
                  onClick={handleAsc}
                >
                  <SortDescending
                    size={24}
                    color='#f7f8ff'
                    weight='regular'
                  />
                </div>
                <div
                  className={clsx(
                    'tabbed-view-tabitem flex cursor-pointer select-none rounded-lg px-3 py-2 text-center duration-75',
                    replyOrder === 'desc'
                      ? 'tabbed-view-tabitem-active dark:bg-[#10131E]'
                      : ''
                  )}
                  onClick={handleDesc}
                >
                  <SortAscending
                    size={24}
                    color='#f7f8ff'
                    weight='regular'
                  />
                </div>
              </div>
            </div>

            {replyOrder === 'asc' ? (
              <div className='mx-4 text-sm dark:text-dark-muted small:mx-0'>
                Newest replies are shown first.
              </div>
            ) : (
              <div className='mx-4 text-sm dark:text-dark-muted small:mx-0'>
                Oldest replies are shown first.
              </div>
            )}
            <div
              className={clsx(
                'flex w-full gap-4',
                replyOrder === 'asc' ? 'flex-col-reverse' : 'flex-col'
              )}
            >
              {allReplies.replies.map((reply: ReplyProps) => (
                <Replies
                  key={reply.id}
                  id={user?.id ?? ''}
                  reply={reply}
                />
              ))}
            </div>
            <div className='h-24'></div>
          </>
        )} */}
    </div>
  )
}
