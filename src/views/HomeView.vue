<script setup lang="ts">
import AboutSection from '../components/home/AboutSection.vue'
import ExperienceSection from '../components/home/ExperienceSection.vue'
import HeroSection from '../components/home/HeroSection.vue'
import ProjectsSection from '../components/home/ProjectsSection.vue';
import WhatIDoSection from '../components/home/WhatIDoSection.vue'
import AppFooter from '../components/layout/AppFooter.vue';
</script>

<template>
  <main class="bg-main">
    <HeroSection />
    <WhatIDoSection />
    <ProjectsSection />
    <AboutSection />
    <ExperienceSection />
    <AppFooter />
  </main>
</template>