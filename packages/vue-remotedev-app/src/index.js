import io from 'socket.io-client'
import { initDevTools } from 'vue-devtools/src/devtools'
import Bridge from 'vue-devtools/src/bridge'

export function renderDevtools(options = {}) {
  const {
    host = 'http://localhost',
    port = 8098
  } = options
  const socket = io(`${host}:${port}`)

  let reload = null

  socket.on('vue-devtools-disconnect-devtools', () => {})

  socket.on('vue-devtools-init', () => {
    // Reset attached listeners
    socket.off('vue-message')

    // If new page is opened reload devtools
    if (reload) return reload()
  })

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
      reload()
    }
  })
}

export default renderDevtools


