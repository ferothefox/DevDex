import BlockquoteRenderer from './blockquote'
import ImageRenderer from './image'
import LargestHeaderRenderer from './largestheader'
import LinkRenderer from './link'
import OrderedListRenderer from './ol'
import TextRenderer from './text'
import UnorderedListRenderer from './ul'

export const Renderers = {
  blockquote: BlockquoteRenderer,
  image: ImageRenderer,
  largestheader: LargestHeaderRenderer,
  link: LinkRenderer,
  text: TextRenderer,
  ul: UnorderedListRenderer,
  ol: OrderedListRenderer,
}
