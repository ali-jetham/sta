import { error } from 'node:console'
import fs from 'node:fs'

const data = fs.readFileSync('/home/retr0/.config/sta/config.json.bak', 'utf-8')
console.log(data)
const config = JSON.parse(data)
config.workSpaces.push({ baka: true })
console.log(config)
fs.writeFile(
  '/home/retr0/.config/sta/config.json.bak',
  JSON.stringify(config),
  (error) => {
    if (error) {
      console.error(error)
    }
  }
)

// {
//     "workSpaces": [
//       {
//         "path": "/home/retr0/Documents/test",
//         "active": true
//       },
//       {
//         "path": "/home/retr0/Documents/bakaSus",
//         "active": false
//       },
//       {
//         "path": "/home/retr0/Documents/baka",
//         "active": false
//       }
//     ]
//   }
