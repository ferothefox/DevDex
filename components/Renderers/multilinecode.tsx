export default (props: { children: string }) => (
  <code
    onClick={e => e.stopPropagation()}
    className='feed-post-inline-code-item break-word text-jetbrains w-full whitespace-pre bg-light-main dark:bg-[#06070b]'
  >
    <div onClick={e => e.stopPropagation()}>{props.children}</div>
  </code>
)
