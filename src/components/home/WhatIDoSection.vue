<script setup lang="ts">
import {
  onBeforeUnmount,
  onBeforeUpdate,
  onMounted,
  ref,
} from 'vue'

import type { ComponentPublicInstance } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import SectionDivider from '../ui/SectionDivider.vue'

type TemplateRefValue =
  | Element
  | ComponentPublicInstance
  | null

gsap.registerPlugin(ScrollTrigger)

const description =
  'I create digital experiences that balance user needs, business goals, and long-term scalability. Every decision is guided by clarity, consistency, and meaningful impact.'

const descriptionWords = description.split(' ')



interface StatItem {
  value: number
  suffix: string
  label: string
  description: string
}

const stats: StatItem[] = [
  {
    value: 3,
    suffix: '+',
    label: 'Years of Experience',
    description:
      'Designing digital products, websites, and scalable design systems.',
  },
  {
    value: 30,
    suffix: '+',
    label: 'Projects Completed',
    description:
      'UI/UX, websites, design systems, and freelance design projects.',
  },
]

const statNumberElements = ref<HTMLElement[]>([])

const setStatNumberElement = (
  element: TemplateRefValue,
  index: number,
) => {
  if (element instanceof HTMLElement) {
    statNumberElements.value[index] = element
  }
}

const sectionRef = ref<HTMLElement | null>(null)
const descriptionRef = ref<HTMLElement | null>(null)
const wordElements = ref<HTMLElement[]>([])

let animationContext: gsap.Context | undefined

const setWordElement = (
  element: TemplateRefValue,
  index: number,
) => {
  if (element instanceof HTMLElement) {
    wordElements.value[index] = element
  }
}

/*
  Membersihkan daftar element sebelum Vue melakukan update,
  supaya referensi span tidak menumpuk.
*/
onBeforeUpdate(() => {
  wordElements.value = []
  statNumberElements.value = []
})

onMounted(() => {
  if (
    !sectionRef.value ||
    !descriptionRef.value ||
    wordElements.value.length === 0
  ) {
    return
  }

  animationContext = gsap.context(() => {
    /*
      Kondisi awal seluruh kata:
      abu-abu sesuai desain.
    */
    gsap.set(wordElements.value, {
        color: '#9a9a9a',
        filter: 'blur(2px)',
        opacity: '0.45',
    })

    /*
      Setiap kata berubah menjadi putih secara berurutan
      mengikuti progres scroll.
    */
    gsap.to(wordElements.value, {
        color: '#ffffff',
        filter: 'blur(0px)',
        opacity: '1',
        ease: 'none',
        stagger: 0.08,

        scrollTrigger: {
            trigger: descriptionRef.value,
            start: 'top 15%',
            end: 'bottom 5%',
            scrub: 0.35,
    },
    })

    statNumberElements.value.forEach((element, index) => {
    const stat = stats[index]

    const counter = {
      value: 0,
    }

    gsap.to(counter, {
      value: stat.value,
      duration: 1.5,
      ease: 'power2.out',
      snap: {
        value: 1,
      },

      onUpdate: () => {
        element.textContent =
          `${Math.round(counter.value)}${stat.suffix}`
      },

      scrollTrigger: {
        trigger: element,
        start: 'top 85%',
        once: true,
      },
    })
  })
  }, sectionRef.value)
})

onBeforeUnmount(() => {
  animationContext?.revert()
})
</script>

<template>
  <section
    id="what-i-do"
    ref="sectionRef"
    class="bg-main pb-24 pt-20 sm:pb-28 sm:pt-24 lg:pb-36 lg:pt-28"
  >
    <SectionDivider />

    <div
      class="mx-auto mt-12 grid w-full max-w-[1600px] gap-10 px-5 sm:mt-14 sm:px-8 lg:mt-16 lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-16 lg:px-14"
    >
      <!-- Judul kiri -->
      <div>
        <p
          class="font-display text-xl font-semibold uppercase tracking-[-0.03em] text-accent sm:text-2xl"
        >
          What I Do
        </p>
      </div>

      <!-- Konten kanan -->
      <div class="w-full lg:ml-auto lg:max-w-[920px]">
        <!-- Deskripsi utama -->
        <p
          ref="descriptionRef"
          class="font-display text-[30px] font-medium leading-[1.08] tracking-[-0.045em] sm:text-[38px] lg:text-right lg:text-[46px] xl:text-[50px]"
        >
          <span
            v-for="(word, index) in descriptionWords"
            :key="`${word}-${index}`"
            :ref="(element) => setWordElement(element, index)"
            class="what-i-do__word inline text-text-secondary"
          >
            {{ word }}{{ index < descriptionWords.length - 1 ? ' ' : '' }}
          </span>
        </p>

        <!-- Statistik -->
        <div
          class="mt-12 grid gap-10 sm:grid-cols-2 sm:gap-12 lg:mt-14 lg:gap-16"
        >
          <article
            v-for="(stat, index) in stats"
            :key="stat.label"
          >
            <p
              :ref="(element) => setStatNumberElement(element, index)"
              class="font-display text-[48px] font-semibold leading-none tracking-[-0.04em] text-accent sm:text-[54px]"
            >
              0{{ stat.suffix }}
            </p>

            <h3
              class="mt-3 text-sm font-medium text-text-secondary sm:text-base"
            >
              {{ stat.label }}
            </h3>

            <p
              class="mt-3 max-w-[360px] text-sm leading-6 text-text-primary/85"
            >
              {{ stat.description }}
            </p>
          </article>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.what-i-do__word {
  display: inline;
  will-change: color, filter, opacity;
}

@media (prefers-reduced-motion: reduce) {
  .what-i-do__word {
    color: #ffffff !important;
  }
}
</style>