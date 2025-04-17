import fs from 'node:fs'

function getWorkSpacePath() {
  const configFile = '/home/retr0/.config/sta/config.json'

  fs.readFile(configFile, 'utf-8', (err, data) => {
    if (err) {
      console.error(`[getWorkSpacePath]`, err)
      return
    }

    console.log('[getWorkSpacePath]', data)
  })
}

getWorkSpacePath()
