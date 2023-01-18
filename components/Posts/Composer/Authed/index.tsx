import { Renderers } from '@/components/Renderers'
import { useComposerStore } from '@/lib/composerState'
import '@szhsin/react-menu/dist/index.css'
import '@szhsin/react-menu/dist/transitions/slide.css'
import { UserContext } from 'app/UserProvider'
import clsx from 'clsx'
import FocusTrap from 'focus-trap-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { ChatsTeardrop, Pencil, Sparkle, X } from 'phosphor-react'
import {
  ChangeEvent,
  FormEvent,
  KeyboardEvent as ReactKeyboardEvent,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'
import ReactMarkdown from 'react-markdown'
import { CodeProps } from 'react-markdown/lib/ast-to-react'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { dark } from 'react-syntax-highlighter/dist/cjs/styles/hljs'
import remarkGfm from 'remark-gfm'
import ProgressIndicator from '../ProgressIndicator'

export default () => {
  const router = useRouter()
  const defaultInput = useRef<HTMLInputElement>(null)
  const focusWriteTabInput = useRef<HTMLTextAreaElement>(null)
  const composerForm = useRef<HTMLFormElement>(null)
  const user = useContext(UserContext)
  const { composerActive, setComposerActive, composerData } = useComposerStore()
  const [title, setTitle] = useState(composerData.title ?? '')
  const [content, setContent] = useState(composerData.content ?? '')
  const [tags, setTags] = useState<Array<{ name: string }>>(
    composerData.tags ?? []
  )
  const [activeTab, setActiveTab] = useState('write')
  const [postInProgress, setPostInProgress] = useState(false)
  const [tagInputError, setTagInputError] = useState(false)
  const [tagLengthInputError, setTagLengthInputError] = useState(false)

  const handleWrite = () => {
    setActiveTab('write')
    focusWriteTabInput?.current?.focus()
  }

  const handlePreview = () => {
    setActiveTab('preview')
  }

  type fn = (e: ReactKeyboardEvent, arg: { tag: string | string[] }) => void

  const selectionReplacement: fn = (
    e,
    { tag: v }: { tag: string | string[] }
  ) => {
    const el = e.target
    if (!(el instanceof HTMLTextAreaElement)) return

    const [openTag, closeTag] = typeof v === 'string' ? [v, v] : v
    const selection = window.getSelection()

    const [start, end] = [el.selectionStart, el.selectionEnd]
    el.value =
      el.value.slice(0, start) +
      openTag +
      selection?.toString() +
      closeTag +
      el.value.slice(end)

    el.setSelectionRange(start + openTag.length, end + openTag.length)
  }

  interface textareaDict extends hotkeyDict {
    [key: string]: { action: fn; tag: string | Array<string> }
  }

  const hotKeyRegistry_textarea: textareaDict = {
    b: {
      action: selectionReplacement,
      tag: '**',
    },
    i: {
      action: selectionReplacement,
      tag: ['<div>', '</div>'],
    },
  }

  const refreshData = () => {
    router.refresh()
  }

  const [isMac, setIsMac] = useState(false)
  const actionKey = isMac ? 'metaKey' : 'ctrlKey'

  useEffect(() => {
    setIsMac(navigator.userAgent.toLowerCase().indexOf('mac') !== -1)
  }, [])

  useEffect(() => {
    defaultInput?.current?.focus()
  }, [])

  interface hotkeyDict {
    [key: string]: {
      action: (e: ReactKeyboardEvent, arg: { tag: string | string[] }) => void
      tag: string | string[]
    }
  }

  const useHotkeys =
    (hotKeyRegistry: hotkeyDict) => (e: ReactKeyboardEvent) => {
      if (!e[actionKey]) return

      if (!(e.key in hotKeyRegistry)) return
      const v = hotKeyRegistry[e.key]

      v.action(e, v)
    }

  // This function listens for esc and closes the composer. self explanatory :^)
  const escFunction = useCallback((event: KeyboardEvent) => {
    if (event.key === 'Escape') return setComposerActive(false)
  }, [])

  const handleKeyDown = (e: ReactKeyboardEvent<HTMLInputElement>) => {
    setTagInputError(false)
    setTagLengthInputError(false)

    if (e.key !== 'Enter' && e.key !== ' ') return

    const value = e.currentTarget.value

    if (!value.trim()) return setTagInputError(true)
    if (tags.map(tag => tag['name']).includes(value || value.trim()))
      return setTagInputError(true)
    if (value.includes(' ')) return setTagInputError(true)

    if (tags.length === 10) return setTagLengthInputError(true)

    setTags([...tags, { name: value }])
    e.currentTarget.value = ''
  }

  const removeTag = (index: number) => {
    setTags(tags.filter((_, i) => i !== index))
  }

  const handleTagsChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.value.includes(' '))
      e.currentTarget.value = e.currentTarget.value.replace(/\s/g, '')
  }

  const handleComposerSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setPostInProgress(true)

    const res = await fetch('/api/posts/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        content,
        tags,
      }),
    })

    if (res.status < 300) {
      refreshData()
    }

    setPostInProgress(false)
    setComposerActive(false)
  }

  useEffect(() => {
    defaultInput?.current?.focus()

    document.addEventListener('keydown', escFunction, true)

    return () => {
      document.removeEventListener('keydown', escFunction, true)
    }
  }, [])

  if (composerActive) {
    return (
      <div className='layer-mount absolute top-0 bottom-0 right-0 left-0'>
        <div className='layer-mount-backdrop fixed top-0 bottom-0 right-0 left-0 z-[9997] animate-fadeinbackdrop opacity-75 dark:bg-[#000000]'></div>
        <dialog
          onClick={() => setComposerActive(false)}
          className='post-composer animate-fade-in fixed inset-0 z-[9998] flex h-full w-full animate-fadeincmd flex-col items-center overflow-x-hidden bg-transparent pt-12 text-light-bright dark:text-dark-bright'
        >
          {postInProgress && <ProgressIndicator />}
          <div className='pointer-events-none fixed top-0 right-0 h-24 w-24 blur-lg dark:bg-[black]'></div>
          <a
            tabIndex={1}
            className='landing-animation-delay-400 fixed top-8 right-8 z-[9999] ml-auto flex animate-fadeinbackdrop cursor-pointer select-none flex-col items-center  font-bold opacity-0 '
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
          <FocusTrap
            focusTrapOptions={{
              allowOutsideClick: true,
              setReturnFocus: false,
            }}
          >
            <form
              ref={composerForm}
              onSubmit={handleComposerSubmit}
              className='post-composer-wrapper focus-lock z-30 flex w-full max-w-4xl animate-fadeincmd flex-row gap-4'
            >
              <div
                aria-modal='true'
                onClick={e => e.stopPropagation()}
                className='post-composer-wrapper focus-lock z-30 flex w-full max-w-4xl'
              >
                <div className='post-composer-inputs flex w-full flex-col rounded-xl bg-light-card p-4 dark:bg-dark-floating'>
                  <div className='profile-info-name  font-bold'>
                    <div className='profile-info-name-layout flex flex-row items-center'>
                      <Image
                        alt='Profile Avatar'
                        className='post-composer-avatar bg-muted z-10 mr-4 aspect-square h-16 w-16 rounded-full border-2 border-light-card object-cover dark:border-dark-card'
                        src={user?.image || '/placeholder-avatar.png'}
                        width={64}
                        height={64}
                      />
                      <div className='flex flex-col'>
                        <div className='profile-info-name-username mr-2 text-xl text-light-bright dark:text-dark-bright'>
                          Create a post
                        </div>
                        <div className='flex flex-row font-normal'>
                          <div className='profile-info-name-flair text-light-muted dark:text-dark-muted'>
                            {user?.flair || '@'}
                          </div>
                          <div className='profile-info-name-username text-light-muted dark:text-dark-muted'>
                            {user?.username || 'Dev/Unknown'}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <label
                    htmlFor='title'
                    className='mt-6 mb-2 font-bold text-light-bright dark:text-dark-bright'
                  >
                    Title
                  </label>
                  <div className='flex rounded-lg border-2 border-transparent bg-light-main duration-200 dark:bg-[#22242e] dark:focus-within:border-brand'>
                    <div className='flex flex-grow px-2 py-2 '>
                      <input
                        autoComplete='off'
                        ref={defaultInput}
                        onChange={e => setTitle(e.target.value)}
                        onContextMenu={e => {
                          e.preventDefault()
                          // setAnchorPoint({ x: e.clientX, y: e.clientY })
                          // toggleMenu(true)
                        }}
                        id='title'
                        name='title'
                        defaultValue={title}
                        tabIndex={1}
                        placeholder='What do you want to write about?'
                        className='flex w-full flex-grow appearance-none border-0 bg-light-main px-2 py-2 text-base text-light-muted  duration-200 focus:text-light-bright dark:bg-[#22242e] dark:text-dark-muted dark:focus:text-dark-bright'
                      ></input>
                    </div>
                  </div>

                  <label
                    htmlFor='tags'
                    className='mt-6 mb-2 font-bold text-light-bright dark:text-dark-bright'
                  >
                    Tags
                    {tagInputError && (
                      <div className='ml-2 inline-block text-sm text-danger'>
                        - You already used that tag!
                      </div>
                    )}
                    {tagLengthInputError && (
                      <div className='ml-2 inline-block text-sm text-danger'>
                        - Maximum of 10 tags per post!
                      </div>
                    )}
                  </label>
                  <div
                    className={clsx(
                      'flex rounded-lg border-2 border-transparent bg-light-main duration-200 dark:bg-[#22242e] dark:focus-within:border-brand',
                      (tagInputError || tagLengthInputError) && '!border-danger'
                    )}
                  >
                    <div className='flex flex-grow flex-wrap items-center gap-2 px-2 py-2 '>
                      <input
                        autoComplete='off'
                        id='tags'
                        name='tags'
                        tabIndex={1}
                        placeholder='Tags'
                        onKeyDown={handleKeyDown}
                        onChange={handleTagsChange}
                        className='leading flex w-full flex-grow appearance-none border-0 bg-light-main px-2 py-2 text-base text-light-muted  duration-200 focus:text-light-bright dark:bg-[#22242e] dark:text-dark-muted dark:focus:text-dark-bright'
                      ></input>

                      {tags.length > 0 && (
                        <div className='flex w-full flex-row flex-wrap text-light-muted dark:text-dark-muted'>
                          {tags.map((tag, i) => (
                            <div
                              onClick={() => removeTag(i)}
                              className='mx-1 mt-1 select-none rounded-full bg-dark-card px-3 text-sm text-light-bright duration-75 hover:border-danger hover:bg-danger dark:text-dark-bright'
                              key={i}
                            >
                              {tag.name}
                            </div>
                          ))}

                          <div
                            onClick={() => setTags([])}
                            className='mx-1 select-none rounded-full border-[1px] border-danger bg-danger px-2 text-sm text-light-bright duration-75 hover:border-danger hover:bg-danger dark:text-dark-bright'
                          >
                            Reset
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <label
                    htmlFor='content'
                    className='mt-6 mb-2 font-bold text-light-bright dark:text-dark-bright'
                  >
                    Post
                  </label>
                  <div className='post-composer-wrapper'>
                    <div className='tabbed-view-header -mb-[1px] flex w-full text-light-bright dark:text-dark-bright'>
                      <div className='post-composer-tabbed-view flex flex-row gap-2 rounded-t-xl bg-light-main py-[4px] px-[4px] duration-200 dark:bg-[#22242e]'>
                        <div
                          className={clsx(
                            'tabbed-view-tabitem z-10 flex cursor-pointer select-none items-center gap-4 rounded-lg px-3 py-2 text-center text-light-muted duration-75 dark:text-dark-muted',
                            activeTab === 'write'
                              ? 'tabbed-view-tabitem-active !text-light-bright dark:bg-[#10131E] dark:!text-dark-bright'
                              : ''
                          )}
                          onClick={handleWrite}
                        >
                          <Pencil
                            size={20}
                            color='currentColor'
                            weight='regular'
                          />
                          Write
                        </div>
                        <div
                          className={clsx(
                            'tabbed-view-tabitem z-10 flex cursor-pointer select-none items-center gap-4 rounded-lg px-3 py-2 text-center text-light-muted duration-75 dark:text-dark-muted',
                            activeTab === 'preview'
                              ? 'tabbed-view-tabitem-active !text-light-bright dark:bg-[#10131E] dark:!text-dark-bright'
                              : ''
                          )}
                          onClick={handlePreview}
                        >
                          <Sparkle
                            size={20}
                            color='currentColor'
                            weight='regular'
                          />
                          Preview
                        </div>
                      </div>
                    </div>
                    <div className='post-composer-slate -mt-[3px] flex min-h-[320px] rounded-lg rounded-tl-none bg-light-main duration-200 dark:bg-[#22242e]'>
                      <div className='flex flex-grow px-2 py-2'>
                        <div className='tabbed-view-outlet h-full w-full'>
                          {activeTab === 'write' ? (
                            <textarea
                              autoComplete='off'
                              ref={focusWriteTabInput}
                              onChange={e => setContent(e.target.value)}
                              value={content}
                              id='content'
                              name='content'
                              tabIndex={1}
                              onKeyDown={useHotkeys(hotKeyRegistry_textarea)}
                              className='flex max-h-full min-h-[320px] w-full flex-grow resize-none appearance-none items-start border-0 bg-light-main p-1 text-light-muted  duration-200 focus:text-light-bright dark:bg-[#22242e] dark:text-dark-muted dark:focus:text-dark-bright'
                            ></textarea>
                          ) : (
                            <div className='markdown-renderer-mount h-full min-h-[320px] w-full max-w-[840px] overflow-y-auto rounded-lg p-1'>
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
                                  ul: ({ ...props }) => (
                                    <Renderers.ul {...props} />
                                  ),
                                  ol: ({ ...props }) => (
                                    <Renderers.ol {...props} />
                                  ),
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
                  </div>
                  <div className='mt-6 flex flex-row items-center'>
                    <button
                      tabIndex={1}
                      disabled={!content || !title || !tags}
                      className='ml-auto flex h-fit w-fit cursor-pointer flex-row items-center gap-4 whitespace-nowrap rounded-lg bg-brand py-1 px-4 text-center font-normal text-dark-bright  transition-opacity duration-200 focus-within:opacity-40 hover:opacity-40 active:!scale-[0.95] disabled:cursor-default disabled:grayscale disabled:focus-within:opacity-100 disabled:hover:opacity-100 disabled:active:!scale-100'
                      type='submit'
                    >
                      <ChatsTeardrop
                        size={16}
                        color='currentColor'
                        weight='regular'
                      />
                      Post
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </FocusTrap>
        </dialog>
      </div>
    )
  } else {
    return <></>
  }
}
