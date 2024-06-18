import { onMessage, sendMessage } from 'webext-bridge/content-script'

(() => {
  let currentTheme: Theme | null = null

  function updateTheme(theme: Theme) {
    if (currentTheme === theme)
      return

    currentTheme = theme

    if (theme === 'dark') {
      document.documentElement.classList.remove('light')
      document.documentElement.classList.add('dark')
      document.body.style.colorScheme = 'dark'
    }

    else {
      document.documentElement.classList.remove('dark')
      document.documentElement.classList.add('light')
      document.body.style.colorScheme = 'light'
    }
  }

  sendMessage<Theme>('get-theme', {}).then((theme) => {
    updateTheme(theme)
  })

  onMessage<Theme>('set-theme', (theme) => {
    updateTheme(theme.data)
  })
})()
