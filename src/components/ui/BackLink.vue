<script setup>
import { RouterLink } from 'vue-router'
import ChevronIcon from '@/components/icons/ChevronIcon.vue'

defineProps({
  to: {
    type: String,
    default: '/',
  },
  label: {
    type: String,
    default: 'Back',
  },
})
</script>

<template>
  <RouterLink :to="to" class="back-link">
    <ChevronIcon />
    {{ label }}
  </RouterLink>
</template>

<style scoped>
.back-link {
  display: inline-flex;
  align-items: center;
  gap: 2px;
  text-decoration: none;
  color: var(--color-text-body);
  font-size: 1rem;
  font-weight: 600;
  transition: color var(--transition-base);
}

.back-link:hover {
  color: var(--color-primary);
}

.back-link :deep(svg) {
  width: 18px;
  height: 18px;
  fill: currentColor;
}
</style>
