<script setup>
import { useRecipeStore } from '@/stores/recipes'
import RecipeCard from './RecipeCard.vue'
import RecipeGrid from '@/components/recipe/RecipeGrid.vue'
import EmptyState from '@/components/favorites/EmptyState.vue'

const recipeStore = useRecipeStore()
</script>

<template>
  <div class="favorites-wrapper">
    <EmptyState v-if="recipeStore.favorites.length === 0" />

    <RecipeGrid v-else class="favorites-grid">
      <RecipeCard v-for="recipe in recipeStore.favorites" :key="recipe.id" :recipe="recipe" />
    </RecipeGrid>
  </div>
</template>

<style scoped>
.favorites-wrapper {
  padding: 0 var(--space-xl) 5rem;
}

@media (max-width: 580px) {
  .favorites-wrapper {
    padding: 0 var(--space-md) 4rem;
  }
}
</style>
