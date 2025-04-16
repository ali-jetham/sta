import path from 'node:path'
import fs from 'node:fs'
import os from 'node:os'
import { webContents } from 'electron'

export function initWorkspace(window) {
  if (!configExists()) {
    createConfig()
    askWorkSpacePath(window)
  } else {
    // const configFile = getConfigPath()
    // getWorkSpacePath(configFile)
    // // TODO: send IPC message with workspace path
  }
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
  console.log('askWorkSpacePath called')
  if (window.webContents) {
    window.webContents.send('askWorkSpace')
  }
}

function configExists() {
  const { fullPath } = getConfigPath()
  if (fs.existsSync(fullPath)) {
    console.log(`${fullPath} exists`)
    return true
  } else {
    console.log(`${fullPath} doesnt exist`)
    return false
  }
}

function getWorkSpacePath() {
  const configFile = getConfigPath()
  fs.readFile(configFile, 'utf-8', (err, data) => {
    if (err) {
      console.error(err)
      return
    }
    console.log(data)
  })
}

function createConfig() {
  const { basePath, fullPath } = getConfigPath()
  const configJson = '{"workSpaces": [{}]}'
  fs.mkdirSync(path.dirname(basePath), { recursive: true })
  fs.writeFile(fullPath, configJson, { flag: 'w+' }, (err) => {
    if (err) {
      console.error(err)
    } else {
      console.log('Config file made successfully')
    }
  })
}

function setWorkspacePath(workspace) {}
