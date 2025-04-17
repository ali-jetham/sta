import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import log from 'electron-log/renderer'

log.info('preload executed')

// Custom APIs for renderer
const api = {
  askWorkSpaceDialog: function (callback) {
    log.debug('askWorkSpaceDialog listener added')
    ipcRenderer.on('askWorkSpace', () => callback())
  },

  onUpdateCounter: (callback) =>
    ipcRenderer.on('update-counter', (_event, value) => callback(value))
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  window.electron = electronAPI
  window.api = api
}
