import { ReactNode } from 'react'

export default (props: { children: Array<ReactNode> }) => (
  <div
    onClick={e => e.stopPropagation()}
    className='feed-post-largestheader-item do-not-fire-click-event break-word m-0 cursor-text'
  >
    <div
      onClick={e => e.stopPropagation()}
      className='feed-post-largestheader-item-actual mb-4 text-2xl font-bold'
    >
      {props.children}
    </div>
  </div>
)
