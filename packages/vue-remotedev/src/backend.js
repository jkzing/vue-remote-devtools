import io from 'socket.io-client'
import { initBackend } from 'vue-devtools/src/backend'
import Bridge from 'vue-devtools/src/bridge'
import { installToast } from 'vue-devtools/src/backend/toast'
import { target } from 'vue-devtools/src/devtools/env'

const connectedMessage = () => {
  if (target.__VUE_DEVTOOLS_TOAST__) {
    target.__VUE_DEVTOOLS_TOAST__('Remote Devtools Connected', 'normal')
  }
}

const disconnectedMessage = () => {
  if (target.__VUE_DEVTOOLS_TOAST__) {
    target.__VUE_DEVTOOLS_TOAST__('Remote Devtools Disconnected', 'error')
  }
}

export function installBackend(host, port) {
  const fullHost = port ? host + ':' + port : host
  const createSocket = target.__VUE_DEVTOOLS_SOCKET__ || io
  const socket = createSocket(fullHost)

  socket.on('connect', () => {
    connectedMessage()
    initBackend(bridge)
    socket.emit('vue-devtools-init')
  })

  // Global disconnect handler. Fires in two cases:
  // - after calling above socket.disconnect()
  // - once devtools is closed (that's why we need socket.disconnect() here too, to prevent further polling)
  socket.on('disconnect', (reason) => {
    socket.disconnect()
    disconnectedMessage()
  })

  // Disconnect socket once other client is connected
  socket.on('vue-devtools-disconnect-backend', () => {
    socket.disconnect()
  })

  const bridge = new Bridge({
    listen (fn) {
      socket.on('vue-message', data => fn(data))
    },
    send (data) {
      socket.emit('vue-message', data)
    }
  })

  bridge.on('shutdown', () => {
    socket.disconnect()
    disconnectedMessage()
  })

  installToast(target)
}
