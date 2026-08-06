<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import SectionDivider from '../ui/SectionDivider.vue'
import profileImage from '../../assets/images/profile-boy.png'

gsap.registerPlugin(ScrollTrigger)

const aboutTitleWords = ['A', 'Little', 'About', 'Myself']

const sectionRef = ref<HTMLElement | null>(null)
const titleRef = ref<HTMLElement | null>(null)

let animationContext: gsap.Context | undefined

onMounted(() => {
  if (!sectionRef.value || !titleRef.value) {
    return
  }

  animationContext = gsap.context(() => {
    const words =
      titleRef.value!.querySelectorAll<HTMLElement>('[data-about-word]')

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
    class="bg-main pb-0 pt-16 sm:pt-20 lg:pt-16"
  >
    <div
      class="mx-auto mt-14 grid w-full max-w-[1600px] items-center gap-14 px-5 sm:mt-16 sm:px-8 lg:mt-10 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-20 lg:px-24 xl:grid-cols-[minmax(0,1fr)_360px] xl:gap-28"
    >
      <!-- Konten About di kiri -->
      <div class="w-full lg:max-w-[820px]">
        <p
          class="font-display text-lg font-semibold uppercase tracking-[-0.02em] text-accent sm:text-xl lg:text-2xl"
        >
          About Me
        </p>

        <h2
          ref="titleRef"
          aria-label="A Little About Myself"
          class="mt-3 flex flex-wrap gap-x-[0.18em] gap-y-[0.06em] font-display text-[32px] font-semibold uppercase leading-[0.98] tracking-[-0.04em] text-text-primary sm:text-[40px] lg:justify-start lg:text-[46px]"
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
          class="mt-6 max-w-[760px] space-y-5 text-sm leading-6 text-text-secondary sm:text-base sm:leading-7"
        >
          <p>
            My journey into design started with graphic design, where I
            developed a strong foundation in visual communication, branding, and
            creative problem-solving. Working on a variety of projects taught me
            how thoughtful design can shape the way people interact with
            products and brands. Over time, my curiosity grew beyond visuals,
            leading me to explore product design and the process behind creating
            meaningful digital experiences.
          </p>

          <p>
            Today, I enjoy designing products that solve real problems by
            balancing user needs, business goals, and technical feasibility. I
            believe great design isn't just about how something looks; it's
            about creating experiences that are clear, intuitive, and built to
            make a lasting impact.
          </p>
        </div>

        <p
          class="mt-8 font-display text-xl font-semibold text-accent sm:text-2xl"
        >
          Boy
        </p>
      </div>

      <!-- Foto card putih di kanan -->
      <div class="flex justify-center lg:justify-end">
        <figure
          class="about-card w-full max-w-[260px] rounded-[6px] bg-white p-4 pb-12 shadow-[0_24px_70px_rgba(0,0,0,0.24)] sm:max-w-[300px] sm:p-5 sm:pb-14 lg:max-w-[320px] xl:max-w-[340px]"
        >
          <div
            class="relative aspect-[4/5] overflow-hidden rounded-[2px] bg-[#ffa34d]"
          >
            <div
              class="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(255,255,255,0.16),transparent_52%)]"
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
    </div>
  </section>
</template>

<style scoped>
.about-card {
  transform-origin: center;
}

.about-title-word {
  will-change: transform, opacity, filter;
}

@media (prefers-reduced-motion: reduce) {
  .about-title-word {
    opacity: 1 !important;
    filter: none !important;
    transform: none !important;
  }
}

.about-title-word {
  will-change: transform, opacity, filter;
}

@media (prefers-reduced-motion: reduce) {
  .about-title-word {
    opacity: 1 !important;
    filter: none !important;
    transform: none !important;
  }
}
</style>
