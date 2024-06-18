<script setup lang="ts">
import { theme } from '~/logic/storage'
</script>

<template>
  <main class="w-[200px] px-4 py-5 text-center text-gray-700">
    <Logo />
    <div>点击切换主题</div>

    <div flex="~ gap-2 justify-center">
      <button class="btn mt-2" @click="theme = theme === 'dark' ? 'light' : 'dark'">
        {{ theme === 'dark' ? '深色' : '浅色' }}
      </button>
    </div>
  </main>
</template>
