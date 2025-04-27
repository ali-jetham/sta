import { getWorkSpacePath } from './workspace'
import { createLogger } from './logger'
import { ipcMain } from 'electron'
import fs from 'node:fs'
import path from 'node:path'
import { marked } from 'marked'

const log = createLogger('file')
marked.use({
  gfm: true,
  pedantic: false,
  breaks: true
})

export function initFile() {
  ipcMain.handle('file:getTree', getFileTree)
  ipcMain.on('file:openFile', openFile)
}

// Return a file tree object.
function getFileTree(event, dir = getWorkSpacePath()) {
  log.info(`[getFileTree] called with dir: ${dir}`)

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

// Return HTML of a markdown file.
function openFile(event, path) {
  log.debug(`[openFile] with ${path}`)
  fs.readFile(path, 'utf-8', (err, data) => {
    if (err) {
      log.error(`[openFile] ${err}`)
      return
    }
    const htmlData = marked.parse(data)
    log.verbose(htmlData)
    event.sender.send('MainView:openFile', { htmlData, path })
  })
}
