<script setup>
import { computed } from 'vue'
import { useRecipeStore } from '@/stores/recipes'
import SectionDivider from '@/components/ui/SectionDivider.vue'

const recipeStore = useRecipeStore()

const searchLabel = computed(() => {
  const count = recipeStore.recipes.length
  const term = recipeStore.currentSearch
  const filters = [...new Set([...recipeStore.matchedCategories, ...recipeStore.matchedCountries])]

  if (filters.length > 0) {
    return `${count} results for "${term}" (${filters.join(', ')})`
  }

  return `${count} results for "${term}"`
})
</script>

<template>
  <div class="section-meta">
    <span class="result-count">
      {{
        recipeStore.currentSearch
          ? searchLabel
          : `${recipeStore.recipes.length} recipes`
      }}
    </span>
    <SectionDivider />
  </div>
</template>

<style scoped>
.section-meta {
  display: flex;
  align-items: center;
  gap: var(--space-md);
  padding: var(--space-xl) var(--space-xl) 1.25rem;
}

.result-count {
  font-size: 0.82rem;
  font-weight: 600;
  color: var(--color-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.6px;
  white-space: nowrap;
}
</style>
