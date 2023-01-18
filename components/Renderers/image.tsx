import '@szhsin/react-menu/dist/index.css'
import '@szhsin/react-menu/dist/transitions/slide.css'
import Image from 'next/image'
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'

export default (props: { src?: string; alt?: string }) => {
  const imageSrc = props.src
  const altText = props.alt || 'Image'

  return (
    <figure
      onContextMenu={e => e.stopPropagation()}
      onClick={e => e.stopPropagation()}
      className='feed-post-image-item relative my-4 h-full w-full rounded object-contain'
    >
      <a
        title='image'
        onClick={e => e.preventDefault()}
        href={imageSrc}
        target='_blank'
        rel='noopener noreferrer nofollow'
        className='relative'
        tabIndex={1}
      >
        <Zoom
          {...props}
          zoomMargin={128}
        >
          <Image
            className='feed-post-image-main !relative aspect-auto min-h-full min-w-full rounded-t object-cover duration-200 hover:opacity-70'
            src={imageSrc || ''}
            alt={altText}
            fill
          />
        </Zoom>
      </a>
      <figcaption className='feed-post-imagealt-item relative h-full max-w-full rounded-b bg-light-main p-2 text-center italic text-light-muted dark:bg-[#06070b] dark:text-dark-muted'>
        {altText}
      </figcaption>
    </figure>
  )
}
