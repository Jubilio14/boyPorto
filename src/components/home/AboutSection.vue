<script setup lang="ts">
import {
  onBeforeUnmount,
  onMounted,
  ref,
} from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import SectionDivider from '../ui/SectionDivider.vue'
import profileImage from '../../assets/images/profile-boy.png'

gsap.registerPlugin(ScrollTrigger)

const aboutTitleWords = [
  'A',
  'Little',
  'About',
  'Myself',
]

const sectionRef = ref<HTMLElement | null>(null)
const titleRef = ref<HTMLElement | null>(null)

let animationContext: gsap.Context | undefined

onMounted(() => {
  if (!sectionRef.value || !titleRef.value) {
    return
  }

  animationContext = gsap.context(() => {
    const words = titleRef.value!.querySelectorAll<HTMLElement>(
      '[data-about-word]',
    )

    gsap.set(words, {
      yPercent: 120,
      opacity: 0,
      filter: 'blur(8px)',
    })

    ScrollTrigger.create({
      trigger: sectionRef.value,
      start: 'top 75%',
      once: true,
      invalidateOnRefresh: true,

      onEnter: () => {
        gsap.to(words, {
          yPercent: 0,
          opacity: 1,
          filter: 'blur(0px)',
          duration: 0.85,
          stagger: 0.12,
          ease: 'power3.out',
        })
      },
    })
  }, sectionRef.value)

  requestAnimationFrame(() => {
    ScrollTrigger.sort()
    ScrollTrigger.refresh()
  })
})

onBeforeUnmount(() => {
  animationContext?.revert()
})
</script>

<template>
  <section
    id="about"
    ref="sectionRef"
    class="bg-main pb-24 pt-16 sm:pb-28 sm:pt-20 lg:pb-36 lg:pt-24"
  >
    <SectionDivider />

    <div
      class="mx-auto mt-14 grid w-full max-w-[1600px] items-center gap-16 px-5 sm:mt-16 sm:px-8 lg:mt-20 lg:grid-cols-[minmax(280px,420px)_minmax(0,1fr)] lg:gap-20 lg:px-24 xl:gap-28"
    >
      <!-- Foto polaroid -->
      <div class="flex justify-center lg:justify-start">
        <figure
          class="about-polaroid relative w-full max-w-[280px] rotate-[-4deg] bg-white p-4 pb-14 shadow-[0_24px_70px_rgba(0,0,0,0.28)] sm:max-w-[320px] sm:p-5 sm:pb-16 lg:max-w-[350px]"
        >
          <div
            class="relative aspect-[4/5] overflow-hidden bg-[#ffa34d]"
          >
            <!-- Dekorasi ringan di belakang foto -->
            <div
              class="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(255,255,255,0.18),transparent_50%)]"
              aria-hidden="true"
            />

            <img
              :src="profileImage"
              alt="Boy, digital product designer"
              class="absolute inset-x-0 bottom-0 mx-auto h-[94%] w-full object-contain object-bottom"
            />
          </div>
        </figure>
      </div>

      <!-- Konten About -->
      <div
        class="w-full lg:ml-auto lg:max-w-[900px] lg:text-right"
      >
        <p
          class="font-display text-lg font-semibold uppercase tracking-[-0.02em] text-accent sm:text-xl"
        >
          About Me
        </p>

        <h2
          ref="titleRef"
          aria-label="A Little About Myself"
          class="mt-5 flex flex-wrap gap-x-[0.18em] gap-y-[0.06em] font-display text-[36px] font-semibold uppercase leading-[0.98] tracking-[-0.04em] text-text-primary sm:text-[44px] lg:justify-end lg:text-[52px]"
        >
          <span
            v-for="word in aboutTitleWords"
            :key="word"
            class="inline-block overflow-hidden align-bottom"
          >
            <span
              data-about-word
              aria-hidden="true"
              class="about-title-word inline-block"
            >
              {{ word }}
            </span>
          </span>
        </h2>

        <div
          class="mt-7 space-y-6 text-sm leading-7 text-text-secondary sm:text-base sm:leading-8"
        >
          <p>
            My journey into design started with graphic design, where I spent years creating visual identities, marketing materials, and digital experiences for a wide range of clients. Along the way, I discovered that my passion wasn't just making things look good it was understanding how design could solve problems and create better experiences for people.
          </p>

          <p>
            That curiosity naturally led me to UI/UX design. Today, I focus on designing digital products that balance user needs, business goals, and long-term scalability. From building design systems to crafting intuitive interfaces, I enjoy turning complex ideas into experiences that feel simple, purposeful, and easy to use.
          </p>
        </div>

        <p
          class="mt-9 font-display text-2xl font-semibold text-accent sm:text-3xl"
        >
          Boy
        </p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.about-polaroid {
  transform-origin: center;
}

.about-title-word {
  will-change: transform, opacity, filter;
}

@media (max-width: 1023px) {
  .about-polaroid {
    transform: rotate(-2.5deg);
  }
}

@media (prefers-reduced-motion: reduce) {
  .about-title-word {
    opacity: 1 !important;
    filter: none !important;
    transform: none !important;
  }
}
</style>