// import { initDevTools } from 'vue-devtools/src/devtools'
// import Bridge from 'vue-devtools/src/bridge'

// const target = document.getElementById('target')
// const targetWindow = target.contentWindow

// // 1. load user app
// target.src = 'target.html'
// target.onload = () => {
//   // 2. init devtools
//   initDevTools({
//     connect (cb) {
//       // 3. called by devtools: inject backend
//       inject('./build/backend.js', () => {
//         // 4. send back bridge
//         cb(new Bridge({
//           listen (fn) {
//             targetWindow.parent.addEventListener('message', evt => fn(evt.data))
//           },
//           send (data) {
//             console.log('devtools -> backend', data)
//             targetWindow.postMessage(data, '*')
//           }
//         }))
//       })
//     },
//     onReload (reloadFn) {
//       target.onload = reloadFn
//     }
//   })
// }

// function inject (src, done) {
//   if (!src || src === 'false') {
//     return done()
//   }
//   const script = target.contentDocument.createElement('script')
//   script.src = src
//   script.onload = done
//   target.contentDocument.body.appendChild(script)
// }

import io from 'socket.io-client'
import { initDevTools } from 'vue-devtools/src/devtools'
import Bridge from 'vue-devtools/src/bridge'

const port = 8098
const socket = io('http://localhost:' + port)

let reload = null

socket.on('vue-devtools-disconnect-devtools', () => {
  console.log('disconnect')
})

socket.on('vue-devtools-init', () => {
  console.log('init')

  // Reset attached listeners
  socket.off('vue-message')

  // If new page is opened reload devtools
  if (reload) return reload()

  initDevTools({
    connect (callback) {
      const wall = {
        listen (fn) {
          socket.on('vue-message', data => fn(data))
        },
        send (data) {
          console.log('devtools -> backend', data)
          socket.emit('vue-message', data)
        }
      }
      const bridge = new Bridge(wall)

      callback(bridge)
    },
    onReload (fn) {
      reload = fn
    }
  })
})
