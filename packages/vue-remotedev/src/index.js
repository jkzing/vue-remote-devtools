import { installHook } from 'vue-devtools/src/backend/hook'
import { target } from 'vue-devtools/src/devtools/env'
import { installBackend } from './backend'

const INJECTED_HOST = target.__VUE_DEVTOOLS_HOST__ || 'http://localhost'
const INJECTED_PORT = target.__VUE_DEVTOOLS_PORT__ !== undefined ? target.__VUE_DEVTOOLS_PORT__ : 8098

export function installDevtools(options = {}) {
  const {
    host = INJECTED_HOST,
    port = INJECTED_PORT
  } = options

  installHook(target)
  installBackend(host, port)
}

export default installDevtools
