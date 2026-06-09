<script setup>
import AppFooter from '@/components/layout/AppFooter.vue'
import HeroSection from '../home/HeroSection.vue'
</script>

<template>
  <div class="page">
    <HeroSection />
    <div class="page-body">
      <slot />
    </div>
    <AppFooter />
  </div>
</template>

<style scoped>
.page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: var(--color-bg-page);
  font-family: var(--font-sans);
}

.page-body {
  flex: 1;
}
</style>
