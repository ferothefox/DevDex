import { ReactNode } from 'react'

export default (props: { children: Array<ReactNode> }) => (
  <div
    onClick={e => e.stopPropagation()}
    className='feed-post-text-item do-not-fire-click-event break-word text-jetbrains m-0 cursor-text'
  >
    {props.children}
  </div>
)
