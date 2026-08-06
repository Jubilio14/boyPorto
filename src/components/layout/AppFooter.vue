<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { gsap } from 'gsap'

import footerImage from '../../assets/Footer.png'

const changingWordRef = ref<HTMLElement | null>(null)

const changingWords = ['Build', 'Create', 'Design']

let changingWordIndex = 0
let changingWordTimeline: gsap.core.Timeline | undefined

onMounted(() => {
  const wordElement = changingWordRef.value

  if (!wordElement) {
    return
  }

  const prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)',
  ).matches

  if (prefersReducedMotion) {
    wordElement.textContent = changingWords[0]
    return
  }

  changingWordTimeline = gsap.timeline({
    repeat: -1,
  })

  changingWordTimeline
    // Kata berhenti sebentar sebelum berganti.
    .to(
      {},
      {
        duration: 1.1,
      },
    )

    // Kata lama naik dan menghilang.
    .to(wordElement, {
      yPercent: -120,
      autoAlpha: 0,
      filter: 'blur(6px)',
      duration: 0.28,
      ease: 'power2.in',
    })

    // Mengganti isi kata.
    .call(() => {
      changingWordIndex = (changingWordIndex + 1) % changingWords.length

      wordElement.textContent = changingWords[changingWordIndex]
    })

    // Kata baru disiapkan dari bawah.
    .set(wordElement, {
      yPercent: 120,
      autoAlpha: 0,
      filter: 'blur(6px)',
    })

    // Kata baru naik ke posisi normal.
    .to(wordElement, {
      yPercent: 0,
      autoAlpha: 1,
      filter: 'blur(0px)',
      duration: 0.4,
      ease: 'power3.out',
    })
})

onBeforeUnmount(() => {
  changingWordTimeline?.kill()
})
</script>

<template>
  <footer
    id="contact"
    class="relative overflow-hidden bg-main pt-16 sm:pt-20 lg:pt-24"
  >
    <!-- CTA footer -->
    <div class="mx-auto w-full max-w-[1600px] px-5 sm:px-8 lg:px-24">
      <h2
        class="max-w-[600px] font-display text-[22px] font-semibold uppercase leading-[1.05] tracking-[-0.035em] text-white sm:text-[26px] lg:text-[30px]"
      >
        <span class="flex items-baseline gap-[0.25em]">
          <span>Let's</span>

          <span class="inline-flex min-w-[7ch] overflow-hidden align-bottom">
            <span
              ref="changingWordRef"
              class="footer-changing-word inline-block"
            >
              Build
            </span>
          </span>
        </span>

        <span class="block"> Something great </span>
      </h2>
    </div>

    <!-- Panel merah full width -->
    <div
      class="footer-panel relative mt-[clamp(7rem,11vw,13rem)] w-full bg-accent pb-7 pt-16 sm:pb-9 sm:pt-20 lg:pb-10 lg:pt-24"
    >
      <!-- Nama besar -->
      <img
        :src="footerImage"
        alt="Boy Perton"
        class="footer-title pointer-events-none absolute left-1/2 top-0 z-0 h-auto w-[100vw] max-w-none -translate-x-1/2 -translate-y-[70%] object-contain sm:-translate-y-[82%] lg:-translate-y-[92%]"
      />

      <!-- Isi tetap mengikuti container website -->
      <div
        class="relative z-10 mx-auto w-full max-w-[1600px] px-5 sm:px-8 lg:px-14"
      >
        <div
          class="grid gap-8 sm:grid-cols-2 sm:items-end lg:grid-cols-[1fr_1fr_2fr]"
        >
          <!-- Email -->
          <div>
            <p class="text-xs font-semibold text-white">Email</p>

            <a
              href="mailto:boyferton07@gmail.com"
              class="mt-2 inline-block text-sm text-white/90 transition-opacity duration-300 hover:opacity-65"
            >
              boyferton07@gmail.com
            </a>
          </div>

          <!-- Social -->
          <div>
            <p class="text-xs font-semibold text-white">Social</p>

            <div class="mt-2 flex items-center gap-2">
              <!-- Instagram -->
              <a
                href="#"
                aria-label="Instagram"
                target="_blank"
                rel="noopener noreferrer"
                class="group flex h-8 w-8 items-center justify-center bg-main transition-transform duration-300 hover:-translate-y-1 rounded-md"
              >
                <svg
                  viewBox="0 0 24 24"
                  class="h-5 w-5 transition-transform duration-300 group-hover:scale-110"
                  aria-hidden="true"
                >
                  <!-- Block putih -->
                  <rect
                    x="2.5"
                    y="2.5"
                    width="19"
                    height="19"
                    rx="5"
                    fill="#ffffff"
                  />

                  <!-- Lensa kamera -->
                  <circle
                    cx="12"
                    cy="12"
                    r="4"
                    fill="none"
                    stroke="#1d1d1d"
                    stroke-width="2"
                  />

                  <!-- Titik kamera -->
                  <circle cx="17.2" cy="6.8" r="1.25" fill="#1d1d1d" />
                </svg>
              </a>

              <!-- LinkedIn -->
              <a
                href="#"
                aria-label="LinkedIn"
                target="_blank"
                rel="noopener noreferrer"
                class="group flex h-8 w-8 items-center justify-center rounded-md bg-main transition-transform duration-300 hover:-translate-y-1"
              >
                <svg
                  viewBox="0 0 24 24"
                  class="h-5 w-5 transition-transform duration-300 group-hover:scale-110"
                  aria-hidden="true"
                >
                  <!-- Block putih -->
                  <rect
                    x="2.5"
                    y="2.5"
                    width="19"
                    height="19"
                    rx="2.8"
                    fill="#ffffff"
                  />

                  <!-- Titik huruf i -->
                  <circle cx="7.2" cy="7.5" r="1.3" fill="#1d1d1d" />

                  <!-- Batang huruf i -->
                  <rect
                    x="6"
                    y="10"
                    width="2.4"
                    height="7.5"
                    rx="0.5"
                    fill="#1d1d1d"
                  />

                  <!-- Bentuk huruf n -->
                  <path
                    d="M10.8 10H13V11.05C13.75 10.15 14.8 9.7 16.05 9.7C18.45 9.7 19 11.25 19 13.65V17.5H16.6V13.95C16.6 12.8 16.35 11.85 15.05 11.85C13.7 11.85 13.2 12.75 13.2 14V17.5H10.8V10Z"
                    fill="#1d1d1d"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <!-- Garis bawah -->
        <div class="mt-6 h-px w-full bg-white/45 sm:mt-8" aria-hidden="true" />
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer-panel {
  isolation: isolate;
}

.footer-title {
  display: block;
}

.footer-changing-word {
  will-change: transform, opacity, filter;
}

@media (prefers-reduced-motion: reduce) {
  .footer-changing-word {
    opacity: 1 !important;
    filter: none !important;
    transform: none !important;
  }
}
</style>
