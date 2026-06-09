<script setup>
defineProps({
  count: {
    type: Number,
    required: true,
  },
  borderColor: {
    type: String,
    default: 'var(--color-bg-hero-start)',
  },
})
</script>

<template>
  <span class="badge" :style="{ borderColor }">{{ count }}</span>
</template>

<style scoped>
.badge {
  position: absolute;
  top: -7px;
  right: -7px;
  background: var(--color-primary);
  color: var(--color-text-inverse);
  font-size: 0.65rem;
  font-weight: 700;
  min-width: 18px;
  height: 18px;
  border-radius: var(--radius-pill);
  padding: 0 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid;
}
</style>
