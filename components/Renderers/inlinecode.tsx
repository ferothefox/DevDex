import { ReactNode } from 'react'

export default (props: { children: Array<ReactNode> }) => (
  <code
    onClick={e => e.stopPropagation()}
    className='feed-post-inline-code-item text-jetbrains break-word my-4 inline-block w-full rounded bg-light-main p-4 dark:bg-[#06070b]'
  >
    <div onClick={e => e.stopPropagation()}>{props.children}</div>
  </code>
)
