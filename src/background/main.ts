import { onMessage, sendMessage } from 'webext-bridge/background'
import { watch } from 'vue-demi'
import { theme } from '~/logic/storage'

// only on dev mode
if (import.meta.hot) {
  // @ts-expect-error for background HMR
  import('/@vite/client')
  // load latest content script
  import('./contentScriptHMR')
}

browser.runtime.onInstalled.addListener((): void => {
  // eslint-disable-next-line no-console
  console.log('Extension installed')
})

let currentTabId = 0

browser.tabs.onActivated.addListener(({ tabId }) => {
  currentTabId = tabId
  sendMessage<Theme>('set-theme', theme.value, { context: 'content-script', tabId })
})

onMessage('get-theme', () => {
  return theme.value
})

watch(theme, (newTheme) => {
  sendMessage<Theme>('set-theme', newTheme, { context: 'content-script', tabId: currentTabId })
})
