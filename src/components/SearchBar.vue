<script setup>
import { ref } from 'vue'
import { useRecipeStore } from '@/stores/recipes'
import ChevronIcon from '@/components/icons/ChevronIcon.vue'

const recipeStore = useRecipeStore()
const searchTerm = ref(recipeStore.currentSearch ?? '')

function search() {
  recipeStore.getRecipe(searchTerm.value)
}

function showAll() {
  searchTerm.value = ''
  recipeStore.getRecipe('')
}
</script>

<template>
  <div class="search-section">
    <div class="search-bar">
      <input
        v-model="searchTerm"
        placeholder="Search by name, category or country..."
        @keyup.enter="search"
      />
      <button class="search-btn" @click="search">Search</button>
    </div>

    <button v-if="recipeStore.currentSearch" class="show-all-btn" @click="showAll">
      <ChevronIcon />
      Show all recipes
    </button>
  </div>
</template>

<style scoped>
.search-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.6rem;
  padding: 0 var(--space-md);
}

.search-bar {
  display: flex;
  width: 100%;
  max-width: 520px;
  gap: 8px;
}

.search-bar input {
  flex: 1;
  padding: 11px 16px;
  border-radius: var(--radius-sm);
  border: 1.5px solid var(--color-border-on-dark);
  background: var(--color-surface-glass-light);
  color: var(--color-text-inverse);
  font-size: 0.95rem;
  outline: none;
  transition:
    border-color var(--transition-base),
    background var(--transition-base);
}

.search-bar input::placeholder {
  color: var(--color-text-on-dark-muted);
}

.search-bar input:focus {
  border-color: var(--color-border-on-dark-hover);
  background: rgba(255, 255, 255, 0.18);
}

.search-btn {
  padding: 11px 20px;
  border-radius: var(--radius-sm);
  background: var(--color-primary);
  color: var(--color-text-inverse);
  font-size: 0.9rem;
  font-weight: 600;
  white-space: nowrap;
  transition: background var(--transition-base);
}

.search-btn:hover {
  background: var(--color-primary-hover);
}

.show-all-btn {
  display: inline-flex;
  align-items: center;
  gap: 2px;
  color: var(--color-text-on-dark-medium);
  font-size: 0.85rem;
  padding: 0;
  transition: color var(--transition-base);
}

.show-all-btn:hover {
  color: var(--color-text-inverse);
}

.show-all-btn :deep(svg) {
  width: 16px;
  height: 16px;
  fill: currentColor;
}
</style>
