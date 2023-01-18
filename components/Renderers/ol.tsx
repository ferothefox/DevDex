import { ReactNode } from 'react'

export default (props: { children: Array<ReactNode> }) => (
  <ol
    onClick={e => e.stopPropagation()}
    className='feed-post-orderedlist-item do-not-fire-click-event break-word m-0 cursor-text list-decimal pl-6'
  >
    {props.children}
  </ol>
)
