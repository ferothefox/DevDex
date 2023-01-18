export const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

export const isProd = () => {
  return process.env.NODE_ENV === 'production'
}

export const baseLink = isProd() ? 'https://devdex.me' : 'http://localhost:3000'

// const [isMac, setIsMac] = useState(false)

// useEffect(() => {
//   setIsMac(navigator.userAgent.toLowerCase().indexOf('mac') !== -1)
// }, [])

// const actionKey = isMac ? 'metaKey' : 'ctrlKey'

// export interface hotkeyDict {
//   [key: string]: {
//     action: (e: KeyboardEvent, arg: { tag: string | string[] }) => void
//     tag: string | string[]
//   }
// }

// export const useHotkeys =
//   (hotKeyRegistry: hotkeyDict) => (e: KeyboardEvent) => {
//     if (!e[actionKey]) return

//     if (!(e.key in hotKeyRegistry)) return
//     const v = hotKeyRegistry[e.key]

//     v.action(e, v)
//   }
