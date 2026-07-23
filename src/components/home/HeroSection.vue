<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { MapPin } from 'lucide-vue-next'
import { gsap } from 'gsap'

import profileImage from '../../assets/images/profile-boy.png'

interface HeroWord {
  text: string
  className?: string
}

const heroLines: HeroWord[][] = [
  [
    { text: 'I' },
    { text: 'design', className: 'text-accent' },
    { text: 'digital' },
  ],
  [
    { text: 'products' },
    { text: 'that' },
  ],
  [
    { text: 'people' },
    { text: 'love', className: 'text-accent' },
    { text: 'to' },
  ],
  [
    { text: 'use'},
  ],
]

const heroSection = ref<HTMLElement | null>(null)
const profileWrapper = ref<HTMLElement | null>(null)
const heroTitle = ref<HTMLElement | null>(null)

let animationContext: gsap.Context | undefined

onMounted(() => {
  if (
    !heroSection.value ||
    !profileWrapper.value ||
    !heroTitle.value
  ) {
    return
  }

  animationContext = gsap.context(() => {
    const letters = Array.from(
      heroTitle.value!.querySelectorAll<HTMLElement>(
        '[data-hero-letter]',
      ),
    )

    const timeline = gsap.timeline()

    // Foto naik dari bawah.
    timeline.fromTo(
      profileWrapper.value,
      {
        yPercent: 110,
        opacity: 0,
      },
      {
        yPercent: 0,
        opacity: 1,
        duration: 1.25,
        delay: 0.15,
        ease: 'power4.out',
      },
    )

    // Heading muncul per huruf.
    timeline.fromTo(
      letters,
      {
        yPercent: 120,
        opacity: 0,
        filter: 'blur(10px)',
      },
      {
        yPercent: 0,
        opacity: 1,
        filter: 'blur(0px)',
        duration: 0.8,
        ease: 'power3.out',
        stagger: {
          each: 0.025,
          from: 'start',
        },
      },

      // Mulai sebelum animasi foto selesai.
      '-=0.85',
    )
  }, heroSection.value)
})

onBeforeUnmount(() => {
  animationContext?.revert()
})
</script>

<template>
  <section
    id="home"
    ref="heroSection"
    class="hero relative min-h-screen overflow-hidden bg-main"
  >
    <!-- Background gradient -->
    <div
      class="hero__background absolute inset-0"
      aria-hidden="true"
    />

    <!-- Gradient tambahan agar bagian kiri tetap terbaca -->
    <div
      class="hero__text-overlay absolute inset-0"
      aria-hidden="true"
    />

    <!-- Foto -->
    <div
      ref="profileWrapper"  
      class="hero__image-wrapper pointer-events-none absolute bottom-0 right-[-15%] z-[2] h-[62%] w-[105%] sm:right-[-6%] sm:h-[78%] sm:w-[78%] lg:right-[-2%] lg:h-[94%] lg:w-[58%] xl:right-[1%] xl:w-[55%]"
    >
      <img
        :src="profileImage"
        alt="Boy, digital product designer"
        class="hero__image h-full w-full object-contain object-bottom"
      />
    </div>

    <!-- Fade bawah supaya foto menyatu dengan background -->
    <div
      class="hero__bottom-fade pointer-events-none absolute inset-x-0 bottom-0 z-[3] h-[38%]"
      aria-hidden="true"
    />

    <!-- Isi Hero -->
    <div
      class="relative z-10 mx-auto flex min-h-screen w-full max-w-[1600px] px-5 pb-20 pt-28 sm:px-8 sm:pt-32 lg:items-center lg:px-24 lg:pb-24 lg:pt-28"
    >
      <div
        class="flex w-full flex-col lg:w-[56%]"
      >
        <!-- Sapaan -->
        <p
        class="mb-4 flex items-center gap-2 text-xs font-medium text-text-primary sm:mb-5 sm:text-sm"
        >
        <span class="h-2 w-2 shrink-0 rounded-full bg-accent" />

        <span>
            Hello I’m
            <span class="font-semibold text-accent">
            Boy
            </span>
            !
        </span>
        </p>

        <!-- Heading -->
        <h1
          ref="heroTitle"
          aria-label="I design digital products that people love to use"
          class="hero__title max-w-[650px] font-display text-[34px] font-semibold uppercase leading-[0.95] tracking-[-0.045em] text-text-primary sm:text-[44px] lg:text-[56px]"
        >
          <span
            v-for="(line, lineIndex) in heroLines"
            :key="lineIndex"
            class="block overflow-hidden lg:whitespace-nowrap"
          >
            <span
              v-for="(word, wordIndex) in line"
              :key="`${word.text}-${wordIndex}`"
              class="inline-block whitespace-nowrap"
              :class="word.className"
            >
              <span
                v-for="(letter, letterIndex) in Array.from(word.text)"
                :key="`${word.text}-${letterIndex}`"
                data-hero-letter
                aria-hidden="true"
                class="hero-letter inline-block"
              >
                {{ letter }}
              </span>

              <span
                v-if="wordIndex < line.length - 1"
                aria-hidden="true"
              >
                &nbsp;
              </span>
            </span>
          </span>
        </h1>
      </div>

      <!-- Lokasi -->
      <div
        class="absolute bottom-6 left-5 z-20 flex items-center gap-3 sm:bottom-8 sm:left-8 lg:bottom-9 lg:left-24"
      >
        <div
          class="flex items-center gap-2 text-[10px] sm:text-xs"
        >
          <span class="text-white/40">
            Based In
          </span>

          <MapPin
            :size="14"
            :stroke-width="2"
            class="text-[#c1203a]"
            fill="currentColor"
          />

          <span class="text-white/90">
            Jakarta, Indonesia
          </span>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  min-height: 100vh;
  min-height: 100svh;
  isolation: isolate;
}

.hero-letter {
  will-change: transform, opacity, filter;
}

/*
  Layer background:
  1. Linear gradient agar sisi kiri dominan hitam.
  2. Conic gradient sebagai angular gradient merah.
*/
.hero__background {
  pointer-events: none;

  background:
    linear-gradient(
      90deg,
      #1d1d1d 0%,
      rgba(29, 29, 29, 0.98) 35%,
      rgba(29, 29, 29, 0.88) 52%,
      rgba(29, 29, 29, 0.32) 78%,
      rgba(29, 29, 29, 0.16) 100%
    ),
    conic-gradient(
      from 205deg at 89% 45%,
      #1d1d1d 0deg,
      #1d1d1d 45deg,
      rgba(193, 32, 58, 0.2) 85deg,
      rgba(193, 32, 58, 0.75) 120deg,
      #c1203a 145deg,
      rgba(193, 32, 58, 0.46) 180deg,
      rgba(29, 29, 29, 0.84) 235deg,
      #1d1d1d 290deg,
      #1d1d1d 360deg
    );
}

/*
  Gradient tambahan untuk melindungi tulisan
  dari background merah dan foto.
*/
.hero__text-overlay {
  z-index: 1;
  pointer-events: none;

  background: linear-gradient(
    90deg,
    rgba(29, 29, 29, 0.72) 0%,
    rgba(29, 29, 29, 0.35) 45%,
    transparent 72%
  );
}

.hero__bottom-fade {
  background: linear-gradient(
    to bottom,
    transparent 0%,
    rgba(29, 29, 29, 0.35) 35%,
    rgba(29, 29, 29, 0.94) 90%,
    #1d1d1d 100%
  );
}

.hero__image-wrapper {
  will-change: transform, opacity;
}

.hero__image {
  filter: drop-shadow(
    -24px 16px 40px rgba(0, 0, 0, 0.18)
  );
}

/* Tablet dan mobile */
@media (max-width: 1023px) {
  .hero__background {
    background:
      linear-gradient(
        180deg,
        rgba(29, 29, 29, 0.98) 0%,
        rgba(29, 29, 29, 0.86) 42%,
        rgba(29, 29, 29, 0.28) 75%,
        rgba(29, 29, 29, 0.55) 100%
      ),
      conic-gradient(
        from 215deg at 90% 62%,
        #1d1d1d 0deg,
        #1d1d1d 55deg,
        rgba(193, 32, 58, 0.32) 100deg,
        #c1203a 145deg,
        rgba(193, 32, 58, 0.4) 185deg,
        #1d1d1d 265deg,
        #1d1d1d 360deg
      );
  }

  .hero__text-overlay {
    background: linear-gradient(
      180deg,
      rgba(29, 29, 29, 0.7) 0%,
      rgba(29, 29, 29, 0.28) 50%,
      transparent 80%
    );
  }
}

/* Mobile kecil */
@media (max-width: 639px) {
  .hero__background {
    background:
      linear-gradient(
        180deg,
        #1d1d1d 0%,
        rgba(29, 29, 29, 0.9) 44%,
        rgba(29, 29, 29, 0.25) 76%,
        rgba(29, 29, 29, 0.8) 100%
      ),
      conic-gradient(
        from 220deg at 100% 70%,
        #1d1d1d 0deg,
        rgba(193, 32, 58, 0.22) 95deg,
        rgba(193, 32, 58, 0.82) 140deg,
        rgba(193, 32, 58, 0.3) 190deg,
        #1d1d1d 275deg,
        #1d1d1d 360deg
      );
  }

  .hero__title {
    max-width: 100%;
  }

  .hero__image {
    opacity: 0.78;
  }

  .hero__bottom-fade {
    height: 45%;

    background: linear-gradient(
      to bottom,
      transparent 0%,
      rgba(29, 29, 29, 0.24) 30%,
      rgba(29, 29, 29, 0.96) 88%,
      #1d1d1d 100%
    );
  }
}

@media (prefers-reduced-motion: reduce) {
  .hero-letter {
    opacity: 1 !important;
    filter: none !important;
    transform: none !important;
  }
}
</style>