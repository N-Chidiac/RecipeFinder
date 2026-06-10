<script setup>
import BrandLogo from '@/components/ui/BrandLogo.vue'

defineProps({
  variant: {
    type: String,
    default: 'light',
    validator: (v) => ['light', 'dark'].includes(v),
  },
})
</script>

<template>
  <nav class="nav" :class="variant">
    <BrandLogo to="/" :variant="variant === 'dark' ? 'dark' : 'light'" />
    <slot name="actions" />
  </nav>
</template>

<style scoped>
.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.25rem 2.5rem;
}

.nav.light {
  background: var(--color-bg-white);
  border-bottom: 1px solid var(--color-border);
  padding: 1.1rem 2rem;
}

.nav.dark {
  padding: 1.25rem 2.5rem;
}
</style>
