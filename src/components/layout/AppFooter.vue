<script setup lang="ts">

import footerImage from '../../assets/Footer.png'

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
                  <circle
                    cx="17.2"
                    cy="6.8"
                    r="1.25"
                    fill="#1d1d1d"
                  />
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
                  <circle
                    cx="7.2"
                    cy="7.5"
                    r="1.3"
                    fill="#1d1d1d"
                  />

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
  display: block;
}


</style>