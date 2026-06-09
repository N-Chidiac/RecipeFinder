<script setup>
import IconPlay from '@/components/icons/IconPlay.vue'

defineProps({
  href: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    default: 'Watch video recipe',
  },
})
</script>

<template>
  <a class="video-link" :href="href" target="_blank" rel="noopener">
    <IconPlay />
    {{ label }}
  </a>
</template>

<style scoped>
.video-link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-top: var(--space-2xl);
  padding: 11px 22px;
  background: var(--color-bg-dark);
  color: var(--color-text-inverse);
  text-decoration: none;
  border-radius: var(--radius-pill);
  font-size: 0.9rem;
  font-weight: 600;
  transition: background var(--transition-base);
}

.video-link:hover {
  background: var(--color-bg-dark-hover);
}

.video-link :deep(svg) {
  width: 16px;
  height: 16px;
  fill: currentColor;
}
</style>
