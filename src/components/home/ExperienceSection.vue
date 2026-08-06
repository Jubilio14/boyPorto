<script setup lang="ts">
import { nextTick, onBeforeUnmount, onMounted, ref } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import { experiences } from '../../data/experiences'

import ExperienceCard from './ExperienceCard.vue'

gsap.registerPlugin(ScrollTrigger)

const experienceTitleWords = ['Projects', 'That', 'Define', 'My', 'Work.']

const sectionRef = ref<HTMLElement | null>(null)
const titleRef = ref<HTMLElement | null>(null)

const pinStageRef = ref<HTMLElement | null>(null)
const viewportRef = ref<HTMLElement | null>(null)
const trackRef = ref<HTMLElement | null>(null)

let titleAnimationContext: gsap.Context | undefined

let gsapMatchMedia: ReturnType<typeof gsap.matchMedia> | undefined

onMounted(async () => {
  await nextTick()
  if (document.fonts) {
    await document.fonts.ready
  }

  const section = sectionRef.value
  const title = titleRef.value
  const pinStage = pinStageRef.value
  const viewport = viewportRef.value
  const track = trackRef.value

  if (!section || !title || !pinStage || !viewport || !track) {
    return
  }

  titleAnimationContext = gsap.context(() => {
    const titleWords = title.querySelectorAll<HTMLElement>(
      '[data-experience-title-word]',
    )

    gsap.set(titleWords, {
      y: 42,
      autoAlpha: 0,
      rotation: 0,
      transformOrigin: 'center bottom',
    })

    ScrollTrigger.create({
      trigger: title,
      start: 'top 82%',
      once: true,
      invalidateOnRefresh: true,

      onEnter: () => {
        gsap.to(titleWords, {
          y: 0,
          autoAlpha: 1,
          rotation: 0,
          duration: 0.75,
          stagger: 0.14,
          ease: 'power3.out',

          onComplete: () => {
            gsap.set(titleWords, {
              clearProps: 'transform,opacity,visibility',
            })
          },
        })
      },
    })
  }, section)

  gsapMatchMedia = gsap.matchMedia()

  gsapMatchMedia.add('(min-width: 768px)', () => {
    const cards = Array.from(
      track.querySelectorAll<HTMLElement>('[data-experience-card]'),
    )

    if (cards.length === 0) {
      return
    }

    const firstCard = cards[0]
    const lastCard = cards[cards.length - 1]

    /*
      Posisi awal:
      card pertama tepat di tengah viewport.
    */
    const getStartX = () => {
      const viewportCenter = viewport.clientWidth / 2

      const firstCardCenter = firstCard.offsetLeft + firstCard.offsetWidth / 2

      return viewportCenter - firstCardCenter
    }

    /*
      Posisi akhir:
      card terakhir tepat di tengah viewport.
    */
    const getEndX = () => {
      const viewportCenter = viewport.clientWidth / 2

      const lastCardCenter = lastCard.offsetLeft + lastCard.offsetWidth / 2

      return viewportCenter - lastCardCenter
    }

    /*
      Kalau hanya satu card,
      cukup letakkan di tengah tanpa horizontal scroll.
    */
    if (cards.length === 1) {
      gsap.set(track, {
        x: getStartX(),
      })

      return () => {
        gsap.set(track, {
          clearProps: 'transform',
        })
      }
    }

    const getHorizontalDistance = () => {
      return Math.abs(getEndX() - getStartX())
    }

    gsap.set(track, {
      x: getStartX(),
      force3D: true,
    })

    const horizontalTween = gsap.to(track, {
      x: getEndX,
      ease: 'none',
      force3D: true,

      scrollTrigger: {
        trigger: pinStage,
        pin: true,
        pinSpacing: true,

        start: 'top top',

        end: () =>
          `+=${Math.max(
            getHorizontalDistance() * 1.05,
            window.innerHeight * 1.1,
          )}`,

        scrub: 0.35,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    })

    return () => {
      horizontalTween.scrollTrigger?.kill()
      horizontalTween.kill()

      gsap.set(track, {
        clearProps: 'transform',
      })
    }
  })

  /*
    Mobile tetap menggunakan swipe horizontal biasa.
  */
  gsapMatchMedia.add('(max-width: 767px)', () => {
    gsap.set(track, {
      clearProps: 'transform',
    })

    return () => {
      gsap.set(track, {
        clearProps: 'transform',
      })
    }
  })

  requestAnimationFrame(() => {
    ScrollTrigger.sort()
    ScrollTrigger.refresh()
  })
})

onBeforeUnmount(() => {
  titleAnimationContext?.revert()
  gsapMatchMedia?.revert()
})
</script>

<template>
  <section id="experience" ref="sectionRef" class="relative bg-main pt-16">
    <div
      class="mx-auto mt-14 w-full max-w-[1600px] px-5 text-center sm:mt-16 sm:px-8 lg:mt-20 lg:px-14"
    >
      <p
        class="font-display text-lg font-semibold uppercase text-accent sm:text-xl lg:text-2xl"
      >
        Experience
      </p>

      <h2
        ref="titleRef"
        aria-label="Projects That Define My Work."
        class="mx-auto mt-5 flex max-w-[1100px] flex-wrap justify-center gap-x-[0.18em] gap-y-[0.06em] font-display text-[34px] font-semibold uppercase leading-none tracking-[-0.045em] text-text-primary sm:text-[36px] lg:text-[40px]"
      >
        <span
          v-for="word in experienceTitleWords"
          :key="word"
          class="inline-block overflow-hidden align-bottom"
        >
          <span
            data-experience-title-word
            aria-hidden="true"
            class="experience-title-word inline-block"
          >
            {{ word }}
          </span>
        </span>
      </h2>

      <p
        class="mx-auto mt-5 max-w-[650px] text-sm leading-7 text-text-secondary sm:text-base"
      >
        The teams, companies, and collaborations that have shaped my growth as a
        product designer.
      </p>
    </div>

    <!--
      Hanya area ini yang dipin.
      h-screen membuat card memperoleh satu layar penuh.
    -->
    <div ref="pinStageRef" class="relative h-[100svh] overflow-hidden bg-main">
      <!-- Batasnya sama dengan konten section lain -->
      <div class="mx-auto h-full w-full max-w-[1600px] px-5 sm:px-8 lg:px-14">
        <div
          ref="viewportRef"
          class="experience-scroll relative h-full overflow-x-auto overflow-y-hidden md:overflow-hidden"
        >
          <!-- Track seluruh kartu -->
          <div
            ref="trackRef"
            class="experience-track relative flex h-full w-max items-center gap-12 py-20 sm:gap-16 md:px-0 lg:gap-20"
          >
            <!-- Garis timeline -->
            <div
              v-if="experiences.length > 1"
              class="experience-timeline-line pointer-events-none absolute top-1/2 z-0 hidden h-px -translate-y-1/2 md:block"
              aria-hidden="true"
            />

            <div
              v-for="(experience, index) in experiences"
              :key="experience.id"
              data-experience-card
              class="relative z-10 shrink-0 snap-center"
              :class="
                experience.datePosition === 'top'
                  ? 'translate-y-6'
                  : '-translate-y-6'
              "
            >
              <ExperienceCard
                :experience="experience"
                :tilt="index % 2 === 0 ? 'left' : 'right'"
              />
            </div>
          </div>

          <!-- Fade + blur kiri -->
          <div
            v-if="experiences.length > 1"
            class="experience-edge experience-edge--left"
            aria-hidden="true"
          />

          <!-- Fade + blur kanan -->
          <div
            v-if="experiences.length > 1"
            class="experience-edge experience-edge--right"
            aria-hidden="true"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.experience-scroll {
  scrollbar-width: none;
  scroll-snap-type: x mandatory;
  overscroll-behavior-inline: contain;
}
.experience-title-word {
  display: inline-block;
  transform: none;
  will-change: transform, opacity;
}

.experience-scroll::-webkit-scrollbar {
  display: none;
}

.experience-track {
  will-change: transform;
  backface-visibility: hidden;
}

.experience-edge {
  position: absolute;
  z-index: 30;
  top: 0;
  bottom: 0;

  width: clamp(70px, 8vw, 130px);

  pointer-events: none;
}

.experience-edge--left {
  left: 0;

  background: linear-gradient(
    90deg,
    #0a0a0a 0%,
    rgba(10, 10, 10, 0.95) 28%,
    rgba(10, 10, 10, 0.68) 55%,
    rgba(10, 10, 10, 0.25) 78%,
    transparent 100%
  );
}

.experience-edge--right {
  right: 0;

  background: linear-gradient(
    270deg,
    #0a0a0a 0%,
    rgba(10, 10, 10, 0.95) 28%,
    rgba(10, 10, 10, 0.68) 55%,
    rgba(10, 10, 10, 0.25) 78%,
    transparent 100%
  );
}

.experience-track {
  will-change: transform;
}

.experience-timeline-line {
  /*
    Lebar card desktop maksimal 430px.
    Jadi 215px adalah titik tengah card pertama dan terakhir.
  */
  left: 215px;
  right: 215px;

  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0.08),
    rgba(193, 32, 58, 0.55),
    rgba(255, 255, 255, 0.08)
  );
  box-shadow: 0 0 12px rgba(193, 32, 58, 0.12);
}

@media (min-width: 768px) {
  .experience-scroll {
    scroll-snap-type: none;
  }
}

@media (max-width: 767px) {
  .experience-edge {
    width: 38px;

    -webkit-backdrop-filter: blur(2px);
    backdrop-filter: blur(2px);
  }
}

@media (prefers-reduced-motion: reduce) {
  .experience-title-word {
    opacity: 1 !important;
    filter: none !important;
    transform: none !important;
  }
}
</style>
