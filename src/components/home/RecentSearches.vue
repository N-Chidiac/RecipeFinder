<script setup>
import { useRecipeStore } from '@/stores/recipes'
import SearchChip from '@/components/ui/SearchChip.vue'

const recipeStore = useRecipeStore()
</script>

<template>
  <div v-if="recipeStore.recentSearches.length > 0" class="recent-searches">
    <span class="recent-label">Recent:</span>
    <div class="chips">
      <SearchChip
        v-for="term in recipeStore.recentSearches"
        :key="term"
        :label="term"
        @click="recipeStore.getRecipe(term)"
      />
    </div>
  </div>
</template>

<style scoped>
.recent-searches {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  flex-wrap: wrap;
  padding: 1.25rem 2rem 0;
}

.recent-label {
  font-size: 0.75rem;
  color: var(--color-text-on-dark-faint);
  font-weight: 600;
  letter-spacing: 0.5px;
  text-transform: uppercase;
}

.chips {
  display: flex;
  gap: 0.4rem;
  flex-wrap: wrap;
}
</style>
