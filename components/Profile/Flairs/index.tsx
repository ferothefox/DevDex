import clsx from 'clsx'

export default (props: { flair: string }) => (
  <div
    className={clsx(
      'name-flair mr-2 text-light-muted dark:text-dark-muted',
      !props.flair.match(/^[a-zA-Z0-9]+$/) && '!mr-0'
    )}
  >
    {props.flair}
  </div>
)
