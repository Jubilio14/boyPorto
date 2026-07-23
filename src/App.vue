<script setup lang="ts">
import {
  nextTick,
  onBeforeUnmount,
  onMounted,
  ref,
} from 'vue'
import { RouterView } from 'vue-router'
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import AppNavbar from './components/AppNavbar.vue'
import AppSplash from './components/ui/AppSplash.vue'

gsap.registerPlugin(ScrollTrigger)

const showSplash = ref(true)
const showWebsite = ref(false)

let lenis: Lenis | undefined

/*
  Fungsi ini dijalankan pada setiap frame GSAP.
  Lenis menggunakan waktu dalam milidetik,
  sedangkan ticker GSAP memberikan waktu dalam detik.
*/
const updateLenis = (time: number) => {
  lenis?.raf(time * 1000)
}

onMounted(() => {
  lenis = new Lenis({
    /*
      Semakin kecil lerp, scroll semakin lembut
      dan terasa lebih berat mengejar posisi tujuan.
    */
    lerp: 0.08,

    /*
      Mengaktifkan smooth scroll untuk mouse wheel.
    */
    smoothWheel: true,

    /*
      Memperkecil jarak scroll dari roda mouse.
      0.8 berarti sekitar 80% dari kekuatan normal.
    */
    wheelMultiplier: 0.8,

    /*
      Supaya link seperti href="#experience"
      tetap berfungsi melalui Lenis.
    */
    anchors: true,
  })

  /*
    Setiap Lenis bergerak, posisi ScrollTrigger
    ikut diperbarui.
  */
  lenis.on('scroll', ScrollTrigger.update)

  /*
    Menjalankan Lenis melalui ticker GSAP agar
    seluruh animasi scroll tetap sinkron.
  */
  gsap.ticker.add(updateLenis)

  /*
    Mencegah GSAP mengompensasi frame yang terlambat,
    agar gerakan Lenis tidak meloncat.
  */
  gsap.ticker.lagSmoothing(0)

  /*
    Scroll dikunci selama splash screen tampil.
  */
  lenis.stop()
})

const handleSplashReveal = () => {
  showWebsite.value = true
}

const handleSplashComplete = async () => {
  showSplash.value = false

  await nextTick()

  /*
    Setelah splash hilang dan semua section sudah tampil,
    aktifkan smooth scroll lalu hitung ulang ScrollTrigger.
  */
  lenis?.start()
  ScrollTrigger.refresh()
}

onBeforeUnmount(() => {
  gsap.ticker.remove(updateLenis)
  lenis?.destroy()
})
</script>

<template>
  <AppSplash
    v-if="showSplash"
    @reveal="handleSplashReveal"
    @complete="handleSplashComplete"
  />

  <div v-if="showWebsite">
    <AppNavbar />
    <RouterView />
  </div>
</template>