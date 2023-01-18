import { MenuStateOptions, useMenuState } from '@szhsin/react-menu'
import { useCallback, useRef, useState } from 'react'

type Point = {
  x: number
  y: number
}

export const useContextMenu = (options: MenuStateOptions) => {
  const [menuProps, toggleMenu] = useMenuState(options)

  const [anchorPoint, setAnchorPoint] = useState<Point>()
  const anchorRef = useRef<Element | null>(null)

  const setAnchor = useCallback((value: Element | Point | null) => {
    if (value === null) {
      anchorRef.current = null
      setAnchorPoint(undefined)
      return
    }

    if (value instanceof Element) {
      anchorRef.current = value
      setAnchorPoint(undefined)
      return
    }

    setAnchorPoint(value)
    anchorRef.current = null
  }, [])

  return [
    {
      ...menuProps,
      anchorPoint,
      anchorRef: anchorRef.current ? anchorRef : undefined,
    },
    toggleMenu,
    setAnchor,
  ] as const
}
