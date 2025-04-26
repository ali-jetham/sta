import { getWorkSpacePath } from './workspace'
import { createLogger } from './logger'
import { ipcMain } from 'electron'
import fs from 'node:fs'
import path from 'node:path'

const log = createLogger('fileManager')

export function initFileManager() {
  ipcMain.handle('getFileTree', getFileTree)
  ipcMain.on('openFile', openFile)
}

function getFileTree(event, dir = getWorkSpacePath()) {
  log.info(`[getFileTree] getFileTree() called with dir: ${dir}`)

  return new Promise((resolve, reject) => {
    fs.readdir(dir, { withFileTypes: true }, (error, files) => {
      if (error) {
        log.error(`[getFileTree] error: ${error}`)
        reject(error)
        return
      }

      const fileTree = files.map((file) => {
        return {
          name: file.name,
          path: path.join(dir, file.name),
          type: file.isDirectory() ? 'directory' : 'file',
          children: []
        }
      })
      log.verbose(`[getFileTree] files: ${JSON.stringify(fileTree, null, 2)}`)
      resolve(fileTree)
    })
  })
}

function openFile(event, path) {
  log.debug(`[openFile] with ${path}`)
  fs.readFile(path, 'utf-8', (err, data) => {
    if (err) {
      log.error(`[openFile] ${err}`)
      return
    }
    log.verbose(data)
    event.sender.send('openFileView', data)
  })
}
