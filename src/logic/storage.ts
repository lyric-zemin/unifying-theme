import { useWebExtensionStorage } from '~/composables/useWebExtensionStorage'

export const theme = useWebExtensionStorage<Theme>('webext-theme', 'light')
