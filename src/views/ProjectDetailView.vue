<script setup lang="ts">
import { ArrowLeft } from 'lucide-vue-next'
import { RouterLink } from 'vue-router'
</script>

<template>
  <main
    class="relative z-10 min-h-screen bg-main px-6 pb-10 pt-28 md:px-12 md:pt-32"
  >
    <div class="mx-auto max-w-7xl">
      <RouterLink
        :to="{ name: 'home', hash: '#work' }"
        class="relative z-20 inline-flex cursor-pointer items-center gap-2 text-text-secondary transition-colors duration-300 hover:text-accent"
      >
        <ArrowLeft :size="18" />
        <span>Back to projects</span>
      </RouterLink>

      <div class="mt-24">
        <p class="text-sm uppercase tracking-[0.3em] text-accent">
          Project detail
        </p>

        <h1
          class="mt-5 font-display text-5xl font-semibold text-text-primary md:text-8xl"
        >
          Project title
        </h1>

        <p class="mt-8 max-w-2xl leading-7 text-text-secondary">
          Detail project sementara akan ditampilkan di halaman ini.
        </p>
      </div>
    </div>
  </main>
</template>