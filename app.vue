<template>
  <Html>
    <Body
      class="antialiased duration-300 transition-colors text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-900"
    >
      <NuxtLayout>
        <NuxtLoadingIndicator :height="5" :duration="3000" :throttle="400" />
        <NuxtPage />
      </NuxtLayout>
    </Body>
  </Html>
</template>

<script lang="ts" setup>
import { AppSetup } from './utils/app'
AppSetup()

useHead({
  title: 'REenergise',
  titleTemplate: '%s - REenergise',
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    {
      hid: 'description',
      name: 'description',
      content: 'REenergise',
    },
  ],
  link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
})
</script>
