<script setup>
import { useRecipeStore } from '@/stores/recipes'
import PageLayout from '@/components/layout/PageLayout.vue'
import FavoritesHeader from '@/components/favorites/FavoritesHeader.vue'
import FavoritesList from '@/components/FavoritesList.vue'

const recipeStore = useRecipeStore()
</script>

<template>
  <PageLayout>
    <FavoritesHeader :count="recipeStore.favorites.length" />

    <main class="main-content">
      <FavoritesList />
    </main>
  </PageLayout>
</template>

<style scoped>
.main-content {
  max-width: var(--max-width-content);
  margin: 0 auto;
}
</style>
