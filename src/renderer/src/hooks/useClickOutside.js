import { useEffect } from 'react'

export function useClickOutside(elementRef, callback) {
  function handleClickOutside(event) {
    if (!elementRef?.current?.contains(elementRef.target) && callback) {
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
