<script setup lang="ts">
import {
  onBeforeUnmount,
  onMounted,
  ref,
} from 'vue'
import { gsap } from 'gsap'

const emit = defineEmits<{
  reveal: []
  complete: []
}>()

const languages = [
  'Welcome',           // Inggris
  'Willkommen',        // Jerman
  'Bienvenue',         // Prancis
  'G’day',             // Australia — sapaan informal
  'ようこそ',           // Jepang
  'Добро пожаловать',  // Rusia
  '欢迎',               // Mandarin
  '환영합니다',          // Korea
  'Selamat Datang',    // Indonesia
]

const splashRef = ref<HTMLElement | null>(null)
const textRef = ref<HTMLElement | null>(null)

let timeline: gsap.core.Timeline | undefined
let previousBodyOverflow = ''

onMounted(() => {
  if (!splashRef.value || !textRef.value) {
    return
  }

  previousBodyOverflow = document.body.style.overflow
  document.body.style.overflow = 'hidden'

  const prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)',
  ).matches

  if (prefersReducedMotion) {
    textRef.value.textContent = 'Selamat Datang'
    textRef.value.style.color = '#c1203a'

    emit('reveal')

    gsap.to(splashRef.value, {
      autoAlpha: 0,
      duration: 0.3,
      delay: 0.4,
      onComplete: () => {
        emit('complete')
      },
    })

    return
  }

  const splashTimeline = gsap.timeline()
  timeline = splashTimeline

  languages.forEach((language, index) => {
    const isLastLanguage =
      index === languages.length - 1

    splashTimeline.call(() => {
      if (!textRef.value) {
        return
      }

      textRef.value.textContent = language
      textRef.value.style.color = isLastLanguage
        ? '#c1203a'
        : '#ffffff'
    })

    splashTimeline.fromTo(
      textRef.value,
      {
        y: 28,
        autoAlpha: 0,
        filter: 'blur(8px)',
      },
      {
        y: 0,
        autoAlpha: 1,
        filter: 'blur(0px)',
        duration: 0.3,
        ease: 'power3.out',
      },
    )

    if (!isLastLanguage) {
      splashTimeline.to(
        textRef.value,
        {
          y: -22,
          autoAlpha: 0,
          filter: 'blur(6px)',
          duration: 0.22,
          ease: 'power2.in',
        },
        '+=0.08',
      )
    }
  })

  timeline
    .to(
      textRef.value,
      {
        scale: 1.025,
        duration: 0.28,
        ease: 'power2.out',
      },
      '+=0.18',
    )
    .call(() => {
      /*
        Konten website mulai dipasang di belakang
        ketika splash akan menghilang.
      */
      emit('reveal')
    })
    .to(
      splashRef.value,
      {
        autoAlpha: 0,
        duration: 0.65,
        ease: 'power2.inOut',
      },
      '+=0.1',
    )
    .call(() => {
      emit('complete')
    })
})

onBeforeUnmount(() => {
  timeline?.kill()
  document.body.style.overflow = previousBodyOverflow
})
</script>

<template>
  <div
    ref="splashRef"
    class="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-main"
    role="status"
    aria-label="Website loading"
  >
    <!-- Cahaya merah yang sangat tipis -->
    <div
      class="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_55%,rgba(193,32,58,0.1),transparent_38%)]"
      aria-hidden="true"
    />

    <div class="relative px-5 text-center">
      <p
        ref="textRef"
        aria-live="polite"
        class="min-h-[1.1em] font-display text-[clamp(2.2rem,6vw,6rem)] font-semibold leading-none tracking-[-0.045em] text-white"
      >
        Welcome
      </p>
    </div>
  </div>
</template>