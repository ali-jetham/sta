import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import log from 'electron-log'

const api = {
  askWorkSpaceDialog: function (callback) {
    log.debug('askWorkSpaceDialog listener added')
    ipcRenderer.on('askWorkSpace', () => callback())
  },

  onUpdateCounter: (callback) =>
    ipcRenderer.on('update-counter', (_event, value) => callback(value))
}

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
