import { useEffect } from 'react'

export function useClickOutside(elementRef, callback) {
  console.log(elementRef)
  function handleClickOutside(event) {
    if (!elementRef?.current?.contains(event.target) && callback) {
      console.log('click outside event')
      callback()
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside, true)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside, true)
    }
  }, [])
}
