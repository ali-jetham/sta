import fs from 'node:fs'
import path from 'node:path'
import { ipcMain } from 'electron'
import chokidar from 'chokidar'
import { getWorkSpacePath } from './workspace'
import { createLogger } from './logger'

const log = createLogger('file')

export function initFile() {
  ipcMain.handle('file:getTree', getFileTree)
  ipcMain.handle('file:saveFile', saveFile)
  ipcMain.on('file:openFile', openFile)
  ipcMain.on('FileContextMenu:create', createFile)
  ipcMain.on('FileContextMenu:delete', deleteFile)
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
      const workspaceName = path.basename(getWorkSpacePath())
      const workspacePath = getWorkSpacePath()
      // log.verbose(`[getFileTree] files: ${JSON.stringify(fileTree, null, 2)}`)
      resolve({ fileTree, workspaceName, workspacePath })
    })
  })
}

// Return RAW markdown file.
function openFile(event, filePath) {
  log.debug(`[openFile] with ${filePath}`)
  fs.readFile(filePath, 'utf-8', (err, data) => {
    if (err) {
      log.error(`[openFile] ${err}`)
      return null
    }
    // log.verbose(data)
    const fileName = path.basename(filePath, '.md')
    event.sender.send('MainView:openFile', { data, filePath, fileName })
    return { data, filePath, fileName }
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

async function deleteFile(event, path) {
  log.debug(`[deleteFile] path: ${path}`)
  fs.rm(path, { recursive: true }, (err) => {
    if (err) {
      log.error(`[deleteFile] error: ${err}`)
      return
    }
  })
}

function createFile(event, item) {
  const { type, name } = item
  let { path: filePath } = item
  filePath = path.join(filePath, name)
  log.info(`[createFile] type: ${type} name: ${name} path: ${filePath}`)
  if (type === 'dir') {
    fs.mkdir(filePath, (err) => {
      if (err) {
        log.error(`[createFile] error: ${err}`)
        return
      }
    })
  } else if (type === 'file') {
    fs.writeFile(filePath, '', (err) => {
      if (err) {
        log.error(`[createFile] error: ${err}`)
        return
      }
    })
  }
}
