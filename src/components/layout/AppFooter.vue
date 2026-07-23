<script setup lang="ts">
import {
  Instagram,
  Linkedin,
} from 'lucide-vue-next'

const socialLinks = [
  {
    name: 'Instagram',
    url: '#',
    icon: Instagram,
  },
  {
    name: 'LinkedIn',
    url: '#',
    icon: Linkedin,
  },
]
</script>

<template>
  <footer
    id="contact"
    class="relative overflow-hidden bg-main pt-28 sm:pt-36 lg:pt-44"
  >
    <!-- Panel merah full width -->
    <div
      class="footer-panel relative w-full bg-accent pb-7 pt-16 sm:pb-9 sm:pt-20 lg:pb-10 lg:pt-24"
    >
      <!-- Nama besar -->
        <div
        class="footer-title pointer-events-none absolute left-1/2 top-0 z-0 flex w-screen -translate-x-1/2 -translate-y-[70%] items-end justify-between whitespace-nowrap font-display text-[clamp(3rem,12.8vw,15rem)] font-semibold uppercase leading-[0.72] tracking-[-0.075em] text-accent sm:-translate-y-[82%] lg:-translate-y-[95%]"
        aria-hidden="true"
        >
        <span class="-translate-x-[0.055em]">Boy</span>
        <span class="translate-x-[0.045em]">Perton</span>
        </div>

      <!-- Isi tetap mengikuti container website -->
      <div
        class="relative z-10 mx-auto w-full max-w-[1600px] px-5 sm:px-8 lg:px-14"
      >
        <div
          class="grid gap-8 sm:grid-cols-2 sm:items-end lg:grid-cols-[1fr_1fr_2fr]"
        >
          <!-- Email -->
          <div>
            <p class="text-xs font-semibold text-white">
              Email
            </p>

            <a
              href="mailto:boyferton07@gmail.com"
              class="mt-2 inline-block text-sm text-white/90 transition-opacity duration-300 hover:opacity-65"
            >
              boyferton07@gmail.com
            </a>
          </div>

          <!-- Social -->
          <div>
            <p class="text-xs font-semibold text-white">
              Social
            </p>

            <div class="mt-2 flex items-center gap-2">
              <a
                v-for="social in socialLinks"
                :key="social.name"
                :href="social.url"
                :aria-label="social.name"
                target="_blank"
                rel="noopener noreferrer"
                class="group flex h-8 w-8 items-center justify-center bg-main text-white transition-transform duration-300 hover:-translate-y-1"
              >
                <component
                  :is="social.icon"
                  :size="15"
                  :stroke-width="2"
                  class="transition-transform duration-300 group-hover:scale-110"
                />
              </a>
            </div>
          </div>
        </div>

        <!-- Garis bawah -->
        <div
          class="mt-6 h-px w-full bg-white/45 sm:mt-8"
          aria-hidden="true"
        />
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer-panel {
  isolation: isolate;
}

.footer-title {
  font-kerning: none;
  text-rendering: geometricPrecision;
}


</style>