<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { Mail } from 'lucide-vue-next'

import logoBoy from '../assets/logoBoy.png'

const isCollapsed = ref(false)
const isNavbarHovered = ref(false)
const isScrolling = ref(false)

let scrollEndTimer: number | undefined

// Navbar baru collapse setelah halaman bergerak sejauh ini.
const COLLAPSE_START = 40

// Berapa lama tanpa event scroll sampai dianggap berhenti scroll.
const SCROLL_END_DELAY = 220

const handleScroll = () => {
  const currentScrollY = Math.max(window.scrollY, 0)

  isScrolling.value = true

  // Saat sedang scroll, navbar collapse.
  // Tetapi tetap terbuka jika cursor sedang berada di navbar.
  if (
    currentScrollY > COLLAPSE_START &&
    !isNavbarHovered.value
  ) {
    isCollapsed.value = true
  } else {
    isCollapsed.value = false
  }

  // Reset timer setiap ada gerakan scroll baru.
  if (scrollEndTimer) {
    window.clearTimeout(scrollEndTimer)
  }

  // Kalau tidak ada scroll lagi selama 220ms,
  // berarti user sudah berhenti scroll.
  scrollEndTimer = window.setTimeout(() => {
    isScrolling.value = false
    isCollapsed.value = false
  }, SCROLL_END_DELAY)
}

const handleNavbarEnter = () => {
  isNavbarHovered.value = true
  isCollapsed.value = false
}

const handleNavbarLeave = () => {
  isNavbarHovered.value = false

  // Kalau cursor keluar ketika user masih scroll,
  // navbar kembali collapse.
  if (
    isScrolling.value &&
    window.scrollY > COLLAPSE_START
  ) {
    isCollapsed.value = true
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, {
    passive: true,
  })
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)

  if (scrollEndTimer) {
    window.clearTimeout(scrollEndTimer)
  }
})
</script>

<template>
  <header
    class="fixed inset-x-0 top-4 z-50 flex justify-center px-4 sm:top-6"
  >
    <nav
      aria-label="Main navigation"
      class="flex max-w-full items-center transition-[gap] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
      :class="isCollapsed ? 'gap-0' : 'gap-2 sm:gap-3'"
      @mouseenter="handleNavbarEnter"
      @mouseleave="handleNavbarLeave"
    >
      <!-- Logo -->
      <RouterLink
        to="/"
        aria-label="Go to homepage"
        class="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-md bg-[#c1203a] shadow-[0_10px_30px_rgba(0,0,0,0.25)] transition-transform duration-300 hover:scale-105 sm:h-12 sm:w-12"
      >
        <img
          :src="logoBoy"
          alt="Boy logo"
          class="h-full w-full object-contain p-2.5"
        />
      </RouterLink>

      <!-- Navigation menu -->
      <div
        class="flex h-11 items-center overflow-hidden rounded-md bg-[#1d1d1d]/90 backdrop-blur-xl transition-[max-width,opacity,transform,padding,border-width,margin] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] sm:h-12"
        :class="
          isCollapsed
            ? 'pointer-events-none max-w-0 -translate-x-2 scale-95 border-0 px-0 opacity-0'
            : 'max-w-[220px] translate-x-0 scale-100 border border-white/25 px-1.5 opacity-100 sm:max-w-[280px] sm:px-2'
        "
      >
        <RouterLink
          :to="{ path: '/', hash: '#work' }"
          class="whitespace-nowrap rounded px-2.5 py-2 text-[11px] text-white transition-colors hover:text-[#c1203a] sm:px-3 sm:text-xs"
        >
          Work
        </RouterLink>

        <RouterLink
          :to="{ path: '/', hash: '#about' }"
          class="whitespace-nowrap rounded px-2.5 py-2 text-[11px] text-white transition-colors hover:text-[#c1203a] sm:px-3 sm:text-xs"
        >
          About
        </RouterLink>

        <a
          href="/resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          class="whitespace-nowrap rounded px-2.5 py-2 text-[11px] text-white transition-colors hover:text-[#c1203a] sm:px-3 sm:text-xs"
        >
          Resume
        </a>
      </div>

      <!-- Email -->
      <a
        href="mailto:emailtemanmu@gmail.com"
        aria-label="Send email"
        class="flex h-11 items-center justify-center overflow-hidden rounded-md bg-[#1d1d1d]/90 text-white backdrop-blur-xl transition-[width,max-width,opacity,transform,border-width] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-[#c1203a] hover:text-[#c1203a] sm:h-12"
        :class="
          isCollapsed
            ? 'pointer-events-none w-0 max-w-0 translate-x-2 scale-95 border-0 opacity-0'
            : 'w-11 max-w-11 translate-x-0 scale-100 border border-white/25 opacity-100 sm:w-12 sm:max-w-12'
        "
      >
        <Mail
          :size="17"
          :stroke-width="2"
        />
      </a>
    </nav>
  </header>
</template>