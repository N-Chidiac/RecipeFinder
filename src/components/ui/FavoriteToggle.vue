<script setup>
import IconHeart from '@/components/icons/IconHeart.vue'

defineProps({
  active: {
    type: Boolean,
    default: false,
  },
  activeLabel: {
    type: String,
    default: 'Delete favorite',
  },
  inactiveLabel: {
    type: String,
    default: 'Add to favorites',
  },
})

const emit = defineEmits(['click'])
</script>

<template>
  <button class="fav-btn" :class="{ active }" @click="emit('click')">
    <IconHeart />
    {{ active ? activeLabel : inactiveLabel }}
  </button>
</template>

<style scoped>
.fav-btn {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 8px 16px;
  border-radius: var(--radius-pill);
  background: var(--color-surface-glass);
  color: var(--color-text-primary);
  font-size: 0.85rem;
  font-weight: 600;
  font-family: var(--font-sans);
  transition:
    background var(--transition-base),
    color var(--transition-base);
  backdrop-filter: blur(4px);
}

.fav-btn :deep(svg) {
  width: 16px;
  height: 16px;
  fill: var(--color-icon-inactive);
  transition: fill var(--transition-base);
}

.fav-btn.active :deep(svg) {
  fill: var(--color-primary);
}

.fav-btn.active {
  background: var(--color-primary-light);
  color: var(--color-primary);
}
</style>
