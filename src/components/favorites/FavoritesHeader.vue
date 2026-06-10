<script setup>
import BackLink from '@/components/ui/BackLink.vue'
import SectionDivider from '@/components/ui/SectionDivider.vue'

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
        <SectionDivider />
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

.back-wrapper {
  display: flex;
  align-items: center;
  gap: var(--space-md);
  margin-bottom: 1.25rem;
}

.header-content h1 {
  font-family: var(--font-serif);
  font-size: 2.25rem;
  font-weight: 700;
  color: var(--color-text-primary);
  margin-bottom: 0.3rem;
}

.subtitle {
  color: var(--color-text-muted);
  font-size: 0.9rem;
}
</style>
