<script setup lang="ts">
import { ArrowLeft } from 'lucide-vue-next'
</script>

<template>
  <main class="min-h-screen px-6 py-10 md:px-12">
    <div class="mx-auto max-w-7xl">
      <RouterLink
        to="/"
        class="inline-flex items-center gap-2 text-text-secondary transition hover:text-accent"
      >
        <ArrowLeft :size="18" />
        Back to home
      </RouterLink>

      <div class="mt-24">
        <p class="text-sm uppercase tracking-[0.3em] text-accent">
          Project detail
        </p>

        <h1 class="mt-5 text-5xl font-semibold text-text-primary md:text-8xl">
          Project title
        </h1>

        <p class="mt-8 max-w-2xl leading-7 text-text-secondary">
          Detail project sementara akan ditampilkan di halaman ini.
        </p>
      </div>
    </div>
  </main>
</template>