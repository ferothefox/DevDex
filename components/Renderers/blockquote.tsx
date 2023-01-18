import { ReactNode } from 'react'

export default (props: { children: number | Array<ReactNode> }) => (
  <blockquote
    onClick={e => e.stopPropagation()}
    className='feed-post-blockquote-item break-word my-4 pl-4'
    tabIndex={1}
  >
    <div className='inline-block'>{props.children}</div>
  </blockquote>
)
