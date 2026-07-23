<script setup lang="ts">
import { computed } from 'vue'
import { MapPin } from 'lucide-vue-next'

import type { Experience } from '../../data/experiences'

const props = defineProps<{
  experience: Experience
  tilt: 'left' | 'right'
}>()

const cardRotation = computed(() => {
  return props.tilt === 'left'
    ? 'rotate(-1.5deg)'
    : 'rotate(1.5deg)'
})

const badgeRotation = computed(() => {
  return props.tilt === 'left'
    ? 'rotate(1.5deg)'
    : 'rotate(-1.5deg)'
})
</script>

<template>
  <article
    class="relative w-[calc(100vw-2.5rem)] max-w-[430px] shrink-0 origin-center"
    :class="
      experience.datePosition === 'top'
        ? 'pt-12'
        : 'pb-12'
    "
    :style="{
      transform: cardRotation,
    }"
  >
    <!-- Tanggal atas -->
    <div
      v-if="experience.datePosition === 'top'"
      class="absolute left-1/2 top-0 z-20 -translate-x-1/2"
    >
      <div
        class="flex origin-center flex-col items-center"
        :style="{
          transform: badgeRotation,
        }"
      >
        <span
          class="relative whitespace-nowrap rounded-full bg-accent px-3 py-1.5 text-[10px] font-medium text-white sm:text-xs"
          :class="{
            'experience-current-badge': experience.isCurrent,
          }"
        >
          {{ experience.period }}
          
        </span>

        <span class="h-3 w-px bg-accent/60" />

        <span class="relative flex h-3 w-3 items-center justify-center">
          <span
            v-if="experience.isCurrent"
            class="absolute h-full w-full animate-ping rounded-full bg-accent/60"
          />

          <span
            class="relative h-2 w-2 rounded-full bg-accent"
            :class="{
              'shadow-[0_0_16px_rgba(193,32,58,0.9)]':
                experience.isCurrent,
            }"
          />
        </span>
      </div>
    </div>

    <!-- Card dan seluruh isinya ikut miring -->
<div
  class="min-h-[410px] rounded-md border border-white/[0.03] bg-[#151515] p-5 shadow-[0_20px_60px_rgba(0,0,0,0.2)] sm:p-6"
>
  <!-- Header card -->
  <div
    class="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between"
  >
    <!-- Logo, role, dan company -->
    <div class="flex items-center gap-3">
      <div
        class="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden"
        :style="{
          backgroundColor: experience.logoColor,
        }"
      >
        <img
          v-if="experience.logo"
          :src="experience.logo"
          :alt="experience.logoAlt"
          class="h-full w-full object-contain"
        />
      </div>

      <div>
        <h3
          class="text-sm font-medium uppercase leading-tight text-accent"
        >
          {{ experience.role }}
        </h3>

        <p class="mt-1 text-[10px] text-accent/85">
          {{ experience.company }}
        </p>
      </div>
    </div>

    <!-- Lokasi -->
    <div
      class="flex shrink-0 items-center gap-2 text-[11px] text-text-primary sm:pt-1"
    >
      <MapPin
        :size="15"
        :stroke-width="2"
        fill="currentColor"
        class="text-accent"
      />

      <span>
        {{ experience.location }}
      </span>
    </div>
  </div>

  <!-- Responsibilities -->
  <ul class="mt-8 space-y-6">
    <li
      v-for="responsibility in experience.responsibilities"
      :key="responsibility"
      class="flex gap-3 text-[13px] leading-6 text-text-primary/90 sm:text-sm"
    >
      <span
        class="mt-[10px] h-1.5 w-1.5 shrink-0 rounded-full bg-white"
      />

      <span>
        {{ responsibility }}
      </span>
    </li>
  </ul>
</div>

    <!-- Tanggal bawah -->
    <div
      v-if="experience.datePosition === 'bottom'"
      class="absolute bottom-0 left-1/2 z-20 -translate-x-1/2"
    >
      <div
        class="flex origin-center flex-col items-center"
        :style="{
          transform: badgeRotation,
        }"
      >
        <span class="relative flex h-3 w-3 items-center justify-center">
          <span
            v-if="experience.isCurrent"
            class="absolute h-full w-full animate-ping rounded-full bg-accent/60"
          />

          <span
            class="relative h-2 w-2 rounded-full bg-accent"
            :class="{
              'shadow-[0_0_16px_rgba(193,32,58,0.9)]':
                experience.isCurrent,
            }"
          />
        </span>

        <span class="h-3 w-px bg-accent/60" />

        <span
          class="relative whitespace-nowrap rounded-full bg-accent px-3 py-1.5 text-[10px] font-medium text-white sm:text-xs"
          :class="{
            'experience-current-badge': experience.isCurrent,
          }"
        >
          {{ experience.period }}

        </span>
      </div>
    </div>
  </article>
</template>

<style scoped>
.experience-current-badge {
  animation: current-glow 1.8s ease-in-out infinite;
}

@keyframes current-glow {
  0%,
  100% {
    box-shadow:
      0 0 0 0 rgba(193, 32, 58, 0),
      0 0 12px rgba(193, 32, 58, 0.25);
  }

  50% {
    box-shadow:
      0 0 0 5px rgba(193, 32, 58, 0.12),
      0 0 24px rgba(193, 32, 58, 0.55);
  }
}

@media (prefers-reduced-motion: reduce) {
  .experience-current-badge {
    animation: none;
  }
}
</style>