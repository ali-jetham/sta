const path = require('node:path')
const fs = require('node:fs')
const { log } = require('node:console')
const os = require("node:os");

function getConfigLocation() {
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
  fs.mkdirSync(path.dirname(fullPath), { recursive: true })
  log(fullPath)
}

// function setWorkspace(workspace)
// {
// }

