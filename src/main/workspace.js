import path from 'node:path'
import fs, { readdir } from 'node:fs'
import os from 'node:os'
import { createLogger } from './logger'
import { app, dialog, ipcMain } from 'electron'

const log = createLogger('workspace')
let workspacePath = getWorkSpacePath()

export function initWorkspace(window) {
  log.info('[initWorkspace] initWorkSpace called')

  if (!configExists()) {
    createConfig()
    askWorkSpacePath(window)
  }

  if (!workspacePath) {
    askWorkSpacePath(window)
  }

  ipcMain.handle('openWorkSpace', openWorkSpace)
  ipcMain.handle('getFileTree', getFileTree)
}

function getConfigPath() {
  let basePath
  switch (process.platform) {
    case 'win32':
      basePath = process.env.APPDATA || path.join(os.homedir(), 'AppData', 'Roaming')
      break
    case 'darwin':
      basePath = path.join(os.homedir(), 'Library', 'Application Support')
      break
    case 'linux':
      basePath = process.env.XDG_CONFIG_HOME || path.join(os.homedir(), '.config')
      break
    default:
      basePath = os.homedir()
  }
  const fullPath = path.join(basePath, 'sta', 'config.json')
  basePath = path.join(basePath, 'sta')
  return { basePath, fullPath }
}

function askWorkSpacePath(window) {
  log.debug('[askWorkSpacePath] askWorkSpacePath called')
  if (window.webContents) {
    window.webContents.send('askWorkSpace')
  }
}

function configExists() {
  log.debug('[configExists] configExists called')

  const { fullPath } = getConfigPath()
  if (fs.existsSync(fullPath)) {
    log.debug(`[configExists] ${fullPath} exists`)
    return true
  } else {
    log.warn(`[configExists] ${fullPath} doesnt exist`)
    return false
  }
}

function createConfig() {
  const { basePath, fullPath } = getConfigPath()
  const configJson = '{"workSpaces": []}'
  fs.mkdirSync(path.dirname(basePath), { recursive: true })

  fs.writeFile(fullPath, configJson, { flag: 'w+' }, (err) => {
    if (err) {
      log.error(err)
    } else {
      log.debug('Config file made successfully')
    }
  })
}

function getWorkSpacePath() {
  log.debug('[getWorkSpacePath] getWorkSpacePath() called')
  const { fullPath } = getConfigPath()

  try {
    const data = fs.readFileSync(fullPath, 'utf-8')
    const config = JSON.parse(data)
    const activePath = config.workSpaces.find((ws) => ws.active)?.path
    if (activePath) {
      log.debug(`[getWorkSpacePath] activePath: ${activePath}`)
      return activePath
    } else {
      log.error(`[getWorkSpacePath] no active workspace found`)
    }
  } catch (err) {
    log.error('[getWorkSpacePath]', err)
    return undefined
  }
}

function addWorkspacePath(workspacePath) {
  log.debug('[addWorkspacePath] addWorkspacePath() called')
  const { fullPath } = getConfigPath()

  const data = fs.readFileSync(fullPath, 'utf-8')
  console.log(data)
  const config = JSON.parse(data)
  config.workSpaces.push({ path: workspacePath, active: true })
  console.log(config)

  fs.writeFile(fullPath, JSON.stringify(config), (error) => {
    if (error) {
      console.error(error)
    }
  })
}

function openWorkSpace() {
  log.debug('[openWorkSpace] openWorkSpace called')

  return new Promise((resolve, reject) => {
    try {
      const res = dialog.showOpenDialogSync({
        title: 'Open or Create WorkSpace',
        defaultPath: app.getPath('documents'),
        properties: ['openDirectory']
      })
      if (res) {
        log.info(`[openWorkSpace] res: ${res}`)
        addWorkspacePath(res[0])
        resolve(res)
      }
      reject(res)
    } catch (error) {
      log.error('[openWorkSpace]', error)
      reject(error)
    }
  })
}

function getFileTree(event, dir = getWorkSpacePath()) {
  log.info(`[getFileTree] getFileTree() called with dir: ${dir}`)

  return new Promise((resolve, reject) => {
    readdir(dir, { withFileTypes: true }, (error, files) => {
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
