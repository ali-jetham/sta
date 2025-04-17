import log from 'electron-log/main.js'

export default function createLogger(name) {
  return {
    debug: (message) => log.debug(`[${name}] ${message}`),
    info: (message) => log.info(`[${name}] ${message}`),
    warn: (message) => log.warn(`[${name}] ${message}`),
    error: (message) => log.error(`[${name}] ${message}`),
    verbose: (message) => log.verbose(`[${name}] ${message}`),
    silly: (message) => log.silly(`[${name}] ${message}`)
  }
}
