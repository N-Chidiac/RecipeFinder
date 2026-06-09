<script setup>
defineProps({
  label: {
    type: String,
    required: true,
  },
})

const emit = defineEmits(['click'])
</script>

<template>
  <button class="chip" @click="emit('click')">{{ label }}</button>
</template>

<style scoped>
.chip {
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.18);
  color: var(--color-text-on-dark-subtle);
  padding: 4px 12px;
  border-radius: var(--radius-pill);
  font-size: 0.8rem;
  font-family: var(--font-sans);
  transition:
    background var(--transition-base),
    color var(--transition-base),
    border-color var(--transition-base);
}

.chip:hover {
  background: rgba(200, 65, 44, 0.25);
  border-color: var(--color-primary);
  color: var(--color-text-inverse);
}
</style>
