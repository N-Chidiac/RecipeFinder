<script setup>
import { RouterLink } from 'vue-router'
import { useRecipeStore } from '@/stores/recipes'
import IconHeart from '@/components/icons/IconHeart.vue'
import CountBadge from '@/components/ui/CountBadge.vue'

const recipeStore = useRecipeStore()
</script>

<template>
  <RouterLink to="/favorites" class="fav-link">
    <IconHeart />
    Favorites
    <CountBadge v-if="recipeStore.favorites.length > 0" :count="recipeStore.favorites.length" />
  </RouterLink>
</template>

<style scoped>
.fav-link {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 7px;
  text-decoration: none;
  color: var(--color-text-inverse);
  font-size: 0.875rem;
  font-weight: 600;
  padding: 8px 18px;
  border: 1.5px solid rgba(255, 255, 255, 0.4);
  border-radius: var(--radius-pill);
  transition:
    border-color var(--transition-base),
    background var(--transition-base);
}

.fav-link:hover {
  border-color: rgba(255, 255, 255, 0.85);
  background: rgba(255, 255, 255, 0.1);
}

.fav-link :deep(svg) {
  width: 15px;
  height: 15px;
  fill: currentColor;
}
</style>
