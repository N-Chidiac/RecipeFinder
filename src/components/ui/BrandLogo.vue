<script setup>
import { RouterLink } from 'vue-router'

defineProps({
  to: {
    type: String,
    default: null,
  },
  variant: {
    type: String,
    default: 'light',
    validator: (v) => ['light', 'dark'].includes(v),
  },
})
</script>

<template>
  <component :is="to ? RouterLink : 'span'" :to="to" class="brand" :class="variant">
    Recipe Finder
  </component>
</template>

<style scoped>
.brand {
  font-family: var(--font-serif);
  font-size: 1.25rem;
  font-weight: 700;
  letter-spacing: -0.3px;
  text-decoration: none;
}

.brand.dark {
  color: var(--color-text-inverse);
}

.brand.light {
  font-size: 1.2rem;
  color: var(--color-text-primary);
}
</style>
