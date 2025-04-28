import { getWorkSpacePath } from './workspace'
import { createLogger } from './logger'
import { ipcMain } from 'electron'
import fs from 'node:fs'
import path, { resolve } from 'node:path'

const log = createLogger('file')

export function initFile() {
  ipcMain.handle('file:getTree', getFileTree)
  ipcMain.on('file:openFile', openFile)
  ipcMain.handle('file:saveFile', saveFile)
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
    log.verbose(data)
    event.sender.send('MainView:openFile', { data, path })
  })
}

function saveFile(event, content, path) {
  log.debug(`[saveFile] called`)

  return new Promise((resolve, reject) => {
    if (content && path) {
      log.debug(`[saveFile] path: ${path} ${content}`)
      fs.writeFile(path, content, (error) => {
        if (error) {
          log.error(error)
          return reject(err)
        } else {
          log.debug(`[saveFile] saveFile success`)
          return resolve(true)
        }
      })
    } else {
      return reject(`[saveFile] content or path is null`)
    }
  })
}
