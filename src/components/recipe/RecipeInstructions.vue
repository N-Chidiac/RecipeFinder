<script setup>
defineProps({
  instructions: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <section class="section wide">
    <h3>Preparation</h3>
    <p class="instructions">{{ instructions }}</p>
  </section>
</template>

<style scoped>
.section h3 {
  font-family: var(--font-serif);
  font-size: 1rem;
  font-weight: 700;
  color: var(--color-text-primary);
  margin-bottom: var(--space-md);
  padding-bottom: var(--space-sm);
  border-bottom: 2px solid var(--color-text-primary);
}

.instructions {
  white-space: pre-line;
  line-height: 1.75;
  color: var(--color-text-body);
  font-size: 0.95rem;
}
</style>
