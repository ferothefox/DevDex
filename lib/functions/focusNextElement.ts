export const focusNextElement = () => {
  const focusableElements = 'feed-post'
  if (document.activeElement) {
    const focusable = Array.prototype.filter.call(
      document.activeElement.querySelectorAll(focusableElements),
      function (element) {
        return (
          element.offsetWidth > 0 ||
          element.offsetHeight > 0 ||
          element === document.activeElement
        )
      }
    )
    const index = focusable.indexOf(document.activeElement)
    if (index > -1) {
      const nextElement = focusable[index + 1] || focusable[0]
      nextElement.focus()
    }
  }
}
