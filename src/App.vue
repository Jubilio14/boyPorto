<script setup lang="ts">
import { ref } from 'vue'
import { RouterView } from 'vue-router'

import AppNavbar from './components/AppNavbar.vue'
import AppSplash from './components/ui/AppSplash.vue'

const showSplash = ref(true)
const showWebsite = ref(false)

const handleSplashReveal = () => {
  showWebsite.value = true
}

const handleSplashComplete = () => {
  showSplash.value = false
}
</script>

<template>
  <AppSplash
    v-if="showSplash"
    @reveal="handleSplashReveal"
    @complete="handleSplashComplete"
  />

  <div v-if="showWebsite">
    <AppNavbar />
    <RouterView />
  </div>
</template>