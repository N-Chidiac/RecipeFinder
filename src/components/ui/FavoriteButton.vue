<script setup>
import IconHeart from '@/components/icons/IconHeart.vue'

defineProps({
  active: {
    type: Boolean,
    default: false,
  },
  ariaLabel: {
    type: String,
    required: true,
  },
})

const emit = defineEmits(['click'])
</script>

<template>
  <button
    class="fav-btn"
    :class="{ active }"
    :aria-label="ariaLabel"
    @click="emit('click', $event)"
  >
    <IconHeart />
  </button>
</template>

<style scoped>
.fav-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background: var(--color-surface-glass);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  transition:
    transform var(--transition-fast),
    background var(--transition-fast);
  backdrop-filter: blur(4px);
}

.fav-btn:hover {
  transform: scale(1.12);
}

.fav-btn :deep(svg) {
  width: 17px;
  height: 17px;
  fill: var(--color-icon-muted);
  transition: fill var(--transition-base);
}

.fav-btn.active :deep(svg) {
  fill: var(--color-primary);
}
</style>
