<script setup lang="ts">
import { ArrowRight } from 'lucide-vue-next'

import type { Project } from '../../data/projects'

defineProps<{
  project: Project
  index: number
}>()
</script>

<template>
  <article
    data-project-panel
    class="project-card__panel relative grid min-h-[760px] h-full w-full overflow-hidden rounded-[20px] border border-white/70 shadow-[0_30px_90px_rgba(0,0,0,0.3)] md:min-h-0 lg:grid-cols-[46%_54%]"
    :style="{
      background: project.background,
    }"
  >
    <!-- Konten kiri -->
    <div
      class="relative z-20 flex flex-col justify-center px-6 py-12 sm:px-10 lg:px-14 lg:py-16 xl:px-16"
    >
      <span
        v-if="project.isDummy"
        class="mb-5 w-fit rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[10px] uppercase tracking-[0.12em] text-text-secondary"
      >
        Placeholder
      </span>

      <h3
        class="max-w-[620px] font-display text-[34px] font-semibold uppercase leading-[0.95] tracking-[-0.04em] text-text-primary sm:text-[44px] lg:text-[52px]"
      >
        {{ project.title }}
      </h3>

      <!-- Tags -->
      <div class="mt-8 flex flex-wrap gap-2">
        <span
          v-for="tag in project.tags"
          :key="tag"
          class="rounded-full bg-accent px-4 py-2 text-xs font-medium text-white sm:text-sm"
        >
          {{ tag }}
        </span>
      </div>

      <!-- Deskripsi -->
      <p
        class="mt-7 max-w-[580px] text-sm leading-7 text-text-primary/90 sm:text-base sm:leading-8"
      >
        {{ project.description }}
      </p>

      <!-- Tombol detail -->
      <RouterLink
        :to="`/projects/${project.slug}`"
        class="group mt-8 inline-flex w-fit items-center gap-3 rounded-full bg-accent py-2 pl-2 pr-5 text-sm font-semibold text-white transition-transform duration-300 hover:scale-[1.03]"
      >
        <span
          class="flex h-9 w-9 items-center justify-center rounded-full bg-white text-accent transition-transform duration-300 group-hover:-rotate-[35deg]"
        >
          <ArrowRight
            :size="18"
            :stroke-width="2.2"
          />
        </span>

        View Project
      </RouterLink>
    </div>

    <!-- Visual kanan -->
    <div
      class="project-card__visual relative flex min-h-[360px] items-end justify-center lg:min-h-0 lg:justify-end"
    >
      <!-- Cahaya tambahan -->
      <div
        class="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_70%_45%,rgba(255,255,255,0.08),transparent_48%)]"
        aria-hidden="true"
      />

      <img
        :src="project.image"
        :alt="project.imageAlt"
        class="project-card__image relative z-10 max-h-[580px] w-[115%] max-w-none object-contain object-bottom lg:absolute lg:bottom-0 lg:right-[-5%] lg:h-[94%] lg:w-auto xl:right-0"
      />
    </div>

    <!-- Overlay ketika card berada di belakang -->
    <div
        data-project-overlay
        class="pointer-events-none absolute inset-0 z-30 bg-black opacity-0"
        aria-hidden="true"
    />
  </article>
</template>

<style scoped>
.project-card__panel {
  transform-origin: top center;
  will-change: transform;
  backface-visibility: hidden;
  transform: translateZ(0);
}

.project-card__image {
  filter: none;
}

@media (max-width: 1023px) {
  .project-card__image {
    max-height: 470px;
  }
}
</style>