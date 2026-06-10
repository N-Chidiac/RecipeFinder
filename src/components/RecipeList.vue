<script setup>
import { useRecipeStore } from '@/stores/recipes'
import RecipeCard from './RecipeCard.vue'
import RecipeGrid from '@/components/recipe/RecipeGrid.vue'
import NoResults from '@/components/recipe/NoResults.vue'

const recipeStore = useRecipeStore()
</script>

<template>
  <RecipeGrid class="recipes-container">
    <p v-if="recipeStore.loading" class="status-message">Loading recipes…</p>
    <NoResults v-else-if="recipeStore.recipes.length === 0" />
    <template v-else>
      <RecipeCard v-for="recipe in recipeStore.recipes" :key="recipe.id" :recipe="recipe" />
    </template>
  </RecipeGrid>

  <div v-if="recipeStore.hasMore && !recipeStore.loading" class="load-more">
    <button class="load-more-btn" :disabled="recipeStore.loadingMore" @click="recipeStore.loadMore">
      {{ recipeStore.loadingMore ? 'Loading...' : 'Load more' }}
    </button>
  </div>
</template>

<style scoped>
.recipes-container {
  padding: 0 var(--space-xl) 0;
  margin-bottom: 40px;
}

.status-message {
  grid-column: 1 / -1;
  text-align: center;
  color: var(--color-text-muted);
  font-size: 1rem;
  padding: 4rem 0;
  font-family: var(--font-sans);
}

.load-more {
  display: flex;
  justify-content: center;
  padding: 2rem var(--space-xl) 5rem;
}

.load-more-btn {
  padding: 12px 28px;
  border-radius: var(--radius-sm);
  background: var(--color-bg-white);
  color: var(--color-text-primary);
  font-size: 0.9rem;
  font-weight: 600;
  border: 1.5px solid var(--color-primary-muted);
  transition:
    background var(--transition-base),
    border-color var(--transition-base);
}

.load-more-btn:hover:not(:disabled) {
  background: var(--color-primary-light);
  border-color: var(--color-primary);
}

.load-more-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

@media (max-width: 580px) {
  .recipes-container {
    padding: 0 var(--space-md) 0;
  }

  .load-more {
    padding: 2rem var(--space-md) 4rem;
  }
}
</style>
