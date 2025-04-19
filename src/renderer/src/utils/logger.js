import rendererLog from 'electron-log/renderer.js'

export function createRendererLogger(name) {
  return {
    debug: (message) => rendererLog.debug(`[${name}] ${message}`),
    info: (message) => rendererLog.info(`[${name}] ${message}`),
    warn: (message) => rendererLog.warn(`[${name}] ${message}`),
    error: (message) => rendererLog.error(`[${name}] ${message}`),
    verbose: (message) => rendererLog.verbose(`[${name}] ${message}`),
    silly: (message) => rendererLog.silly(`[${name}] ${message}`)
  }
}
