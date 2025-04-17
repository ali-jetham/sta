import path from 'node:path'
import fs from 'node:fs'
import os from 'node:os'
import createLogger from './logger'
import { app, dialog, ipcMain } from 'electron'
import { debuglog } from 'node:util'

const log = createLogger('workspace')
let workspacePath = null

export function initWorkspace(window) {
  log.info('[initWorkspace] initWorkSpace called')

  if (!configExists()) {
    createConfig()
    askWorkSpacePath(window)
  } else {
    getWorkSpacePath()
  }

  ipcMain.handle('openWorkSpace', openWorkSpace)
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

function getWorkSpacePath() {
  log.debug('[getWorkSpacePath] getWorkSpacePath() called')
  const { fullPath } = getConfigPath()

  fs.readFile(fullPath, 'utf-8', (err, data) => {
    if (err) {
      log.error(`[getWorkSpacePath]`, err)
      return
    }

    log.verbose(`[getWorkSpacePath] data: ${data}`)
    const config = JSON.parse(data)
    const activePath = config.workSpaces.find((ws) => ws.active)?.path
    log.debug(`[getWorkSpacePath] activePath: ${activePath}`)
    if (activePath) {
      workspacePath = activePath
    }
  })
}

function createConfig() {
  const { basePath, fullPath } = getConfigPath()
  const configJson = '{"workSpaces": [{}]}'
  fs.mkdirSync(path.dirname(basePath), { recursive: true })

  fs.writeFile(fullPath, configJson, { flag: 'w+' }, (err) => {
    if (err) {
      log.error(err)
    } else {
      log.debug('Config file made successfully')
    }
  })
}

function setWorkspacePath(workspace) {}

function openWorkSpace() {
  log.debug('[openWorkSpace] openWorkSpace called')
  try {
    const res = dialog.showOpenDialogSync({
      title: 'Open WorkSpace',
      defaultPath: app.getPath('documents'),
      properties: ['openDirectory']
    })
  } catch (error) {
    log.error('[openWorkSpace]', error)
  }
}
