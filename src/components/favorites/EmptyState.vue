<script setup>
import { RouterLink } from 'vue-router'
import IconHeart from '@/components/icons/IconHeart.vue'
</script>

<template>
  <div class="empty-state">
    <div class="empty-icon">
      <IconHeart />
    </div>
    <h3>No favorites yet</h3>
    <p>Click on the heart icon on a recipe card to save it.</p>
    <RouterLink to="/" class="discover-btn">Discover recipes</RouterLink>
  </div>
</template>

<style scoped>
.empty-state {
  text-align: center;
  padding: 5rem 2rem;
  color: var(--color-text-muted);
}

.empty-icon :deep(svg) {
  width: 48px;
  height: 48px;
  fill: var(--color-icon-empty);
  margin: 0 auto 1.25rem;
}

.empty-state h3 {
  font-family: var(--font-serif);
  font-size: 1.4rem;
  color: var(--color-text-primary);
  margin-bottom: var(--space-sm);
}

.empty-state p {
  font-size: 0.95rem;
  margin-bottom: 1.75rem;
  color: var(--color-text-muted);
}

.discover-btn {
  display: inline-block;
  padding: 10px 22px;
  background: var(--color-bg-dark);
  color: var(--color-text-inverse);
  text-decoration: none;
  border-radius: var(--radius-pill);
  font-size: 0.9rem;
  font-weight: 600;
  transition: background var(--transition-base);
}

.discover-btn:hover {
  background: var(--color-bg-dark-hover);
}
</style>
