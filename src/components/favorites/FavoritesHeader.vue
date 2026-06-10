<script setup>
import BackLink from '@/components/ui/BackLink.vue'

defineProps({
  count: {
    type: Number,
    required: true,
  },
})
</script>

<template>
  <header class="page-header">
    <div class="header-content">
      <div class="back-wrapper">
        <BackLink to="/" label="Back to recipes" />
      </div>

      <h1>My Favorites</h1>
      <p class="subtitle">
        {{ count }}
        {{ count === 1 ? 'recipe saved' : 'recipes saved' }}
      </p>
    </div>
  </header>
</template>

<style scoped>
.page-header {
  margin-bottom: var(--space-2xl);
}

.header-content {
  max-width: var(--max-width-content);
  margin: 0 auto;
  padding: var(--space-xl) var(--space-2xl) var(--space-2xl);
}

.header-content h1 {
  font-family: var(--font-serif);
  font-size: 2.25rem;
  font-weight: 700;
  color: var(--color-text-primary);
  margin-bottom: 0.3rem;
}

.subtitle {
  color: var(--color-primary);
  font-size: 1rem;
  font-weight: 500;
}
</style>
