import { useEffect } from 'react'
import { createRendererLogger } from '../utils/logger'

const log = createRendererLogger('useClickOutside')

export function useClickOutside(elementRef, callback) {
  function handleClickOutside(event) {
    // log.info(`[handleClickOutside] click detected: ${event.target}`)
    // log.debug(`[handleClickOutside] elementRef: ${elementRef}`)

    console.log(`[handleClickOutside] click detected: ${event.target}`)
    console.log(`[handleClickOutside] elementRef: ${elementRef}`)

    if (!elementRef?.current?.contains(event.target) && callback) {
      log.debug('[handleClickOutside] click outside event')
      callback()
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside, true)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside, true)
    }
  }, [elementRef, callback])
}
