<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { ArrowLeft } from 'lucide-vue-next'

import AppFooter from '../components/layout/AppFooter.vue'
import { projectDetails } from '../data/projectDetails'

const route = useRoute()

const project = computed(() => {
  return projectDetails.find((item) => item.slug === route.params.slug)
})
</script>

<template>
  <main class="min-h-screen bg-main text-text-primary">
    <template v-if="project">
      <!-- ==================================================
        HERO PROJECT DETAIL
      =================================================== -->
      <section
        class="mx-auto w-full max-w-[1600px] px-5 pb-20 pt-24 sm:px-8 sm:pt-28 lg:px-24 lg:pb-28 lg:pt-32"
      >
        <!-- Back -->
        <RouterLink
          :to="{
            name: 'home',
            hash: '#work',
          }"
          class="inline-flex items-center gap-2 rounded-full border border-white/15 bg-[#111111] px-4 py-2 text-xs text-white/80 transition-colors duration-300 hover:border-accent/50 hover:text-accent"
        >
          <ArrowLeft :size="14" />

          <span> Back </span>
        </RouterLink>

        <!-- Informasi utama -->
        <div class="mt-10">
          <!-- Badge -->
          <span
            class="inline-flex rounded-full bg-accent px-3 py-1 text-[11px] font-medium text-white"
          >
            {{ project.badge }}
          </span>

          <!-- Title -->
          <h1
            class="mt-5 font-display text-[34px] font-semibold uppercase leading-none tracking-[-0.045em] text-white sm:text-[42px] lg:text-[48px]"
          >
            {{ project.title }}
          </h1>

          <!-- Summary -->
          <p
            class="mt-4 max-w-[760px] text-sm leading-7 text-text-secondary sm:text-[15px]"
          >
            {{ project.summary }}
          </p>

          <!-- Metadata -->
          <div class="mt-6 flex flex-wrap gap-x-10 gap-y-4">
            <div>
              <p class="text-[11px] text-white/45">Role</p>

              <p class="mt-1 text-sm text-white">
                {{ project.role }}
              </p>
            </div>

            <div>
              <p class="text-[11px] text-white/45">Platform</p>

              <p class="mt-1 text-sm text-white">
                {{ project.platform }}
              </p>
            </div>

            <div>
              <p class="text-[11px] text-white/45">Year</p>

              <p class="mt-1 text-sm text-white">
                {{ project.year }}
              </p>
            </div>
          </div>

          <!-- Hero media -->
          <div
            class="mt-8 overflow-hidden rounded-[14px] border border-white/[0.05] bg-[#111111]"
          >
            <div
              class="flex aspect-[16/9] items-center justify-center text-sm text-white/30"
            >
              GIF preview coming soon
            </div>
          </div>
        </div>
      </section>

      <!-- ==================================================
        CONTEXT
      =================================================== -->
      <section
        class="border-t border-white/[0.04] bg-main py-20 sm:py-24 lg:py-28"
      >
        <div class="mx-auto w-full max-w-[1600px] px-5 sm:px-8 lg:px-24">
          <!-- Heading dan deskripsi -->
          <div class="max-w-[900px]">
            <p
              class="font-display text-lg font-semibold uppercase text-accent sm:text-xl lg:text-2xl"
            >
              {{ project.context.eyebrow }}
            </p>

            <h2
              class="mt-3 font-display text-[32px] font-semibold leading-[1.02] tracking-[-0.045em] text-white sm:text-[36px] lg:text-[40px]"
            >
              {{ project.context.title }}
            </h2>

            <div
              class="mt-6 max-w-[860px] space-y-5 text-sm leading-7 text-text-secondary sm:text-base"
            >
              <p
                v-for="paragraph in project.context.paragraphs"
                :key="paragraph"
              >
                {{ paragraph }}
              </p>
            </div>
          </div>

          <!-- Context cards -->
          <div
            class="mt-12 grid gap-4 sm:mt-14 md:grid-cols-2 lg:grid-cols-3 lg:gap-6"
          >
            <article
              v-for="card in project.context.cards"
              :key="card.title"
              class="min-h-[200px] rounded-md bg-[#171717] p-6 sm:p-7"
            >
              <h3
                class="flex items-start gap-3 text-base font-medium leading-6 text-white sm:text-lg"
              >
                <span
                  class="mt-[9px] size-2 shrink-0 rounded-full bg-accent"
                  aria-hidden="true"
                />

                <span>
                  {{ card.title }}
                </span>
              </h3>

              <p class="mt-4 text-sm leading-7 text-text-secondary">
                {{ card.description }}
              </p>
            </article>
          </div>
        </div>
      </section>

      <!-- ==================================================
        IN USERS' OWN WORDS
      =================================================== -->
      <section class="overflow-hidden bg-main py-20 sm:py-24 lg:py-28">
        <div class="mx-auto w-full max-w-[1600px] px-5 sm:px-8 lg:px-24">
          <!-- Heading -->
          <div class="mx-auto max-w-[900px] text-center">
            <h2
              class="font-display text-[30px] font-semibold leading-[1.05] tracking-[-0.04em] text-white sm:text-[36px] lg:text-[40px]"
            >
              {{ project.userVoices.title }}
            </h2>

            <p
              class="mx-auto mt-5 max-w-[800px] text-sm leading-7 text-text-secondary sm:text-base"
            >
              {{ project.userVoices.description }}
            </p>
          </div>

          <!-- Quote cards -->
          <div
            data-user-voices-track
            class="mt-12 grid gap-5 md:grid-cols-2 lg:mt-14 lg:grid-cols-3 lg:gap-6"
          >
            <article
              v-for="item in project.userVoices.quotes"
              :key="`${item.name}-${item.quote}`"
              data-user-voice-card
              class="flex min-h-[280px] flex-col rounded-md bg-[#171717] p-6 sm:min-h-[300px] sm:p-7 lg:min-h-[320px]"
            >
              <blockquote
                class="font-display text-[20px] font-semibold leading-[1.2] tracking-[-0.025em] text-white sm:text-[22px] lg:text-[24px]"
              >
                “{{ item.quote }}”
              </blockquote>

              <div class="mt-auto pt-10">
                <p class="text-xs text-text-secondary sm:text-sm">
                  {{ item.persona }}
                </p>

                <p class="mt-2 text-sm font-medium text-accent">
                  {{ item.name }}
                </p>
              </div>
            </article>
          </div>

          <!-- Disclaimer -->
          <p
            class="mx-auto mt-8 max-w-[900px] text-center text-xs italic leading-6 text-white/25 sm:text-sm"
          >
            {{ project.userVoices.disclaimer }}
          </p>
        </div>
      </section>

      <!-- ==================================================
        VISUAL REDESIGN
      =================================================== -->
      <section class="bg-main py-20 sm:py-24 lg:py-28">
        <div
          class="mx-auto grid w-full max-w-[1600px] items-center gap-12 px-5 sm:px-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(420px,1.05fr)] lg:gap-20 lg:px-24"
        >
          <!-- Konten kiri -->
          <div class="max-w-[720px]">
            <p
              class="font-display text-lg font-semibold uppercase text-accent sm:text-xl lg:text-2xl"
            >
              {{ project.visualRedesign.eyebrow }}
            </p>

            <h2
              class="mt-3 max-w-[700px] font-display text-[32px] font-semibold leading-[1.02] tracking-[-0.045em] text-white sm:text-[36px] lg:text-[40px]"
            >
              {{ project.visualRedesign.title }}
            </h2>

            <p
              class="mt-6 max-w-[680px] text-sm leading-7 text-text-secondary sm:text-base"
            >
              {{ project.visualRedesign.description }}
            </p>
          </div>

          <!-- Visual kanan -->
          <div
            class="overflow-hidden rounded-lg border border-white/[0.04] bg-[#17151f]"
          >
            <img
              :src="project.visualRedesign.image"
              :alt="project.visualRedesign.imageAlt"
              class="h-auto w-full object-contain"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      <!-- ==================================================
        FINANCIAL MANAGEMENT
      =================================================== -->
      <section class="bg-main py-20 sm:py-24 lg:py-28">
        <div class="mx-auto w-full max-w-[1600px] px-5 sm:px-8 lg:px-24">
          <!-- Header -->
          <div class="mx-auto max-w-[920px] text-center">
            <p
              class="font-display text-lg font-semibold uppercase text-accent sm:text-xl lg:text-2xl"
            >
              {{ project.financialManagement.eyebrow }}
            </p>

            <h2
              class="mx-auto mt-3 max-w-[850px] font-display text-[32px] font-semibold leading-[1.02] tracking-[-0.045em] text-white sm:text-[36px] lg:text-[40px]"
            >
              {{ project.financialManagement.title }}
            </h2>

            <p
              class="mx-auto mt-5 max-w-[850px] text-sm leading-7 text-text-secondary sm:text-base"
            >
              {{ project.financialManagement.description }}
            </p>
          </div>

          <!-- Visuals -->
          <div class="mt-12 grid gap-8 md:grid-cols-2 lg:mt-14 lg:gap-10">
            <figure
              v-for="visual in project.financialManagement.visuals"
              :key="visual.imageAlt"
            >
              <div
                class="flex aspect-[16/9] items-center justify-center overflow-hidden rounded-md border border-white/[0.04] bg-[#171717]"
              >
                <img
                  v-if="visual.image"
                  :src="visual.image"
                  :alt="visual.imageAlt"
                  class="h-full w-full object-cover"
                  loading="lazy"
                />

                <span
                  v-else
                  class="text-xs uppercase tracking-[0.12em] text-white/20"
                >
                  Image coming soon
                </span>
              </div>

              <figcaption
                class="mt-4 text-xs leading-5 text-text-secondary sm:text-sm sm:leading-6"
              >
                {{ visual.caption }}
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      <!-- ==================================================
        SPLIT BILL
      =================================================== -->
      <section class="bg-main py-20 sm:py-24 lg:py-28">
        <div class="mx-auto w-full max-w-[1600px] px-5 sm:px-8 lg:px-24">
          <!-- Header -->
          <div class="mx-auto max-w-[920px] text-center">
            <p
              class="font-display text-lg font-semibold uppercase text-accent sm:text-xl lg:text-2xl"
            >
              {{ project.splitBill.eyebrow }}
            </p>

            <h2
              class="mx-auto mt-3 max-w-[850px] font-display text-[32px] font-semibold leading-[1.02] tracking-[-0.045em] text-white sm:text-[36px] lg:text-[40px]"
            >
              {{ project.splitBill.title }}
            </h2>

            <p
              class="mx-auto mt-5 max-w-[850px] text-sm leading-7 text-text-secondary sm:text-base"
            >
              {{ project.splitBill.description }}
            </p>
          </div>

          <!-- Split bill steps -->
          <div
            class="mt-12 grid gap-x-5 gap-y-10 sm:mt-14 md:grid-cols-2 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-12"
          >
            <figure
              v-for="(step, index) in project.splitBill.steps"
              :key="`${index}-${step.imageAlt}`"
            >
              <div
                class="flex aspect-[4/5] items-center justify-center overflow-hidden bg-[#171717]"
              >
                <img
                  v-if="step.image"
                  :src="step.image"
                  :alt="step.imageAlt"
                  class="h-full w-full object-cover"
                  loading="lazy"
                />

                <span
                  v-else
                  class="font-display text-xs uppercase tracking-[0.14em] text-white/15"
                >
                  Screen
                  {{ String(index + 1).padStart(2, '0') }}
                </span>
              </div>

              <figcaption
                class="mt-4 text-xs leading-5 text-text-secondary sm:text-sm sm:leading-6"
              >
                {{ step.description }}
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      <!-- ==================================================
        USABILITY TESTING
      =================================================== -->
      <section class="bg-main pb-0 pt-20 sm:pt-24 lg:pt-28">
        <div
          class="mx-auto grid w-full max-w-[1600px] gap-14 px-5 sm:px-8 lg:grid-cols-[minmax(0,1.45fr)_minmax(320px,0.75fr)] lg:items-center lg:gap-20 lg:px-24"
        >
          <!-- Konten kiri -->
          <div>
            <p
              class="font-display text-lg font-semibold uppercase text-accent sm:text-xl lg:text-2xl"
            >
              {{ project.usabilityTesting.eyebrow }}
            </p>

            <h2
              class="mt-3 max-w-[850px] font-display text-[32px] font-semibold leading-[1.02] tracking-[-0.045em] text-white sm:text-[36px] lg:text-[40px]"
            >
              {{ project.usabilityTesting.title }}
            </h2>

            <p
              class="mt-5 max-w-[840px] text-sm leading-7 text-text-secondary sm:text-base"
            >
              {{ project.usabilityTesting.description }}
            </p>

            <!-- Statistik utama -->
            <div
              class="mt-10 grid grid-cols-2 gap-x-8 gap-y-10 sm:mt-12 sm:grid-cols-3 lg:max-w-[760px]"
            >
              <div
                v-for="metric in project.usabilityTesting.metrics"
                :key="metric.label"
              >
                <p
                  class="font-display text-[42px] font-semibold leading-none tracking-[-0.04em] text-accent sm:text-[48px] lg:text-[54px]"
                >
                  {{ metric.value }}
                </p>

                <p
                  class="mt-4 max-w-[160px] text-sm leading-6 text-accent sm:text-base"
                >
                  {{ metric.label }}
                </p>
              </div>
            </div>
          </div>

          <!-- Hasil setiap task -->
          <div class="grid gap-4">
            <article
              v-for="result in project.usabilityTesting.scenarioResults"
              :key="result.label"
              class="rounded-md bg-[#171717] px-6 py-5 sm:px-7 sm:py-6"
            >
              <p
                class="font-display text-[30px] font-semibold leading-none tracking-[-0.035em] text-accent sm:text-[34px]"
              >
                {{ result.value }}
              </p>

              <p class="mt-3 text-sm font-medium text-white sm:text-base">
                {{ result.label }}
              </p>
            </article>
          </div>
        </div>
      </section>

      <!-- ==================================================
        FOOTER FULL WIDTH
      =================================================== -->
      <AppFooter />
    </template>

    <!-- Project tidak ditemukan -->
    <section
      v-else
      class="flex min-h-screen items-center justify-center px-5 text-center"
    >
      <div>
        <p class="font-display text-3xl font-semibold uppercase text-white">
          Project not found
        </p>

        <RouterLink
          :to="{
            name: 'home',
            hash: '#work',
          }"
          class="mt-5 inline-flex text-sm text-accent"
        >
          Back to projects
        </RouterLink>
      </div>
    </section>
  </main>
</template>
