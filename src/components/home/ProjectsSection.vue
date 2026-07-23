<script setup lang="ts">
import {
  nextTick,
  onBeforeUnmount,
  onMounted,
  ref,
} from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import { projects } from '../../data/projects'

import ProjectCard from './ProjectCard.vue'
import SectionDivider from '../ui/SectionDivider.vue'

gsap.registerPlugin(ScrollTrigger)

const stageRef = ref<HTMLElement | null>(null)

let gsapMatchMedia:
  | ReturnType<typeof gsap.matchMedia>
  | undefined

onMounted(async () => {
  await nextTick()

  const stage = stageRef.value

  if (!stage) {
    return
  }

  gsapMatchMedia = gsap.matchMedia()

  /*
    Animasi stacked card hanya dijalankan
    pada tablet dan desktop.
  */
  gsapMatchMedia.add('(min-width: 768px)', () => {
    const slides = Array.from(
      stage.querySelectorAll<HTMLElement>(
        '[data-project-slide]',
      ),
    )

    const panels = slides
      .map((slide) =>
        slide.querySelector<HTMLElement>(
          '[data-project-panel]',
        ),
      )
      .filter(
        (panel): panel is HTMLElement =>
          panel !== null,
      )

    const overlays = slides
      .map((slide) =>
        slide.querySelector<HTMLElement>(
          '[data-project-overlay]',
        ),
      )
      .filter(
        (overlay): overlay is HTMLElement =>
          overlay !== null,
      )

    if (
      slides.length === 0 ||
      panels.length !== slides.length
    ) {
      return
    }

    /*
      Card pertama langsung terlihat.
      Card lainnya berada di bawah layar.
    */
    gsap.set(slides, {
      yPercent: (index) =>
        index === 0 ? 0 : 115,
    })

    gsap.set(panels, {
     scale: 1,
    transformOrigin: 'top center',
    force3D: true,
    })

    gsap.set(overlays, {
     opacity: 0,
    })

    const timeline = gsap.timeline({
      defaults: {
        ease: 'none',
      },

      scrollTrigger: {
        trigger: stage,

        /*
          Stage dipin saat tepat mencapai
          bagian atas layar.
        */
        start: 'top top',

        /*
          Satu perpindahan project mendapat
          sekitar 115% tinggi layar.
        */
        end: () =>
          `+=${Math.max(
            (slides.length - 1) *
              window.innerHeight *
              1.15,
            window.innerHeight,
          )}`,

        pin: true,
        scrub: 0.35,
        anticipatePin: 1,
        invalidateOnRefresh: true,

        // Hidupkan sementara untuk debugging:
        // markers: true,
      },
    })

    const SCALE_STEP = 0.045
    const MIN_SCALE = 0.86

    for (
    let currentIndex = 1;
    currentIndex < slides.length;
    currentIndex += 1
    ) {
    const currentSlide = slides[currentIndex]
    const position = `project-${currentIndex}`

    timeline.addLabel(position)

    /*
        Setiap card yang sudah berada di belakang
        dibuat semakin kecil berdasarkan tingkatnya.
    */
    for (
        let previousIndex = 0;
        previousIndex < currentIndex;
        previousIndex += 1
    ) {
        const previousPanel = panels[previousIndex]
        const previousOverlay = overlays[previousIndex]

        /*
        depth 1 = tepat satu tingkat di belakang
        depth 2 = dua tingkat di belakang
        dan seterusnya.
        */
        const depth = currentIndex - previousIndex

        const targetScale = Math.max(
        1 - SCALE_STEP * depth,
        MIN_SCALE,
        )

        const overlayOpacity = Math.min(
        depth * 0.12,
        0.32,
        )

        timeline.to(
        previousPanel,
        {
            scale: targetScale,
            force3D: true,
            duration: 1,
        },
        position,
        )

        if (previousOverlay) {
        timeline.to(
        previousOverlay,
        {
            opacity: overlayOpacity,
            duration: 1,
        },
        position,
        )
        }
    }

    /*
        Card baru naik dari bawah dan menjadi
        card utama dengan ukuran penuh.
    */
    timeline.to(
        currentSlide,
        {
            yPercent: 0,
            force3D: true,
            duration: 1,
        },
        position,
    )
    }

    return () => {
      timeline.scrollTrigger?.kill()
      timeline.kill()

      gsap.set(slides, {
        clearProps: 'transform',
      })

      gsap.set(panels, {
        clearProps: 'transform',
     })

        gsap.set(overlays, {
        clearProps: 'opacity',
     })
    }
  })

  /*
    Mobile memakai layout vertikal biasa.
    Animasi pin dimatikan agar tetap ringan.
  */
  gsapMatchMedia.add('(max-width: 767px)', () => {
    const slides = Array.from(
      stage.querySelectorAll<HTMLElement>(
        '[data-project-slide]',
      ),
    )

    gsap.set(slides, {
      clearProps: 'transform',
    })

    return () => {
      gsap.set(slides, {
        clearProps: 'transform',
      })
    }
  })

  requestAnimationFrame(() => {
    ScrollTrigger.refresh()
  })
})

onBeforeUnmount(() => {
  gsapMatchMedia?.revert()
})
</script>

<template>
  <section
    id="work"
    class="bg-main pt-16 sm:pt-20 lg:pt-24"
  >
    <SectionDivider />

    <!-- Header project -->
    <div
    class="mx-auto mt-14 w-full max-w-[1600px] px-5 text-center sm:mt-16 sm:px-8 lg:mt-20 lg:px-14"
    >
    <p
        class="font-display text-lg font-semibold uppercase text-accent sm:text-xl"
    >
        Selected Work
    </p>

    <h2
        class="mx-auto mt-5 max-w-[900px] font-display text-[38px] font-semibold uppercase leading-[0.96] tracking-[-0.045em] text-text-primary sm:text-[48px] lg:text-[64px]"
    >
        Projects That Define My Work.
    </h2>
<!-- 
    <p
        class="mx-auto mt-5 max-w-[680px] text-sm leading-7 text-text-secondary sm:text-base"
    >
        Designing digital products, websites, and scalable design systems.
    </p> -->
    </div>

    <!--
      Stage desktop:
      dipin selama project berganti.
    -->
    <div
      ref="stageRef"
      class="project-stage relative mt-16 min-h-[100svh] overflow-hidden lg:mt-20"
    >
      <!-- Mobile -->
      <div
        class="space-y-8 px-4 pb-24 md:hidden"
      >
        <ProjectCard
          v-for="(project, index) in projects"
          :key="project.id"
          :project="project"
          :index="index"
        />
      </div>

      <!-- Tablet dan desktop -->
      <div
        class="relative mx-auto hidden h-[100svh] w-full max-w-[1800px] px-3 py-4 sm:px-5 md:block"
      >
        <div
          v-for="(project, index) in projects"
          :key="project.id"
          data-project-slide
          class="project-slide absolute inset-x-3 bottom-4 sm:inset-x-5"
          :style="{
            top: `${16 + index * 24}px`,
            zIndex: index + 1,
          }"
        >
          <ProjectCard
            :project="project"
            :index="index"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.project-stage {
  isolation: isolate;
}

.project-slide {
  will-change: transform;
}
</style>