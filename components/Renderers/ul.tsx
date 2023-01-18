import { ReactNode } from 'react'

export default (props: { children: Array<ReactNode> }) => (
  <ul
    onClick={e => e.stopPropagation()}
    className='feed-post-unorderedlist-item do-not-fire-click-event break-word m-0 cursor-text list-disc pl-6'
  >
    {props.children}
  </ul>
)
