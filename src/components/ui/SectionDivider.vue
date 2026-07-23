<script setup lang="ts">
import logoMark from '../../assets/logoBoy.png'
</script>

<template>
  <div
    class="mx-auto flex w-full max-w-[1600px] items-center gap-4 px-5 sm:gap-5 sm:px-8 lg:gap-6 lg:px-14"
    aria-hidden="true"
  >
    <!-- Garis kiri -->
    <span class="h-px flex-1 bg-white/20" />

    <!-- Logo tengah -->
    <div class="flex h-5 w-5 shrink-0 items-center justify-center">
      <img
        :src="logoMark"
        alt=""
        class="h-3.5 w-3.5 object-contain opacity-80"
      />
    </div>

    <!-- Garis kanan -->
    <span class="h-px flex-1 bg-white/20" />
  </div>
</template>