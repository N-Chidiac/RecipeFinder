<script setup>
import { useRoute } from 'vue-router'
import { useRecipeStore } from '@/stores/recipes'
import { onMounted, watch } from 'vue'
import PageLayout from '@/components/layout/PageLayout.vue'
import AppNavbar from '@/components/layout/AppNavbar.vue'
import BackLink from '@/components/ui/BackLink.vue'
import RecipeHero from '@/components/recipe/RecipeHero.vue'
import RecipeIngredients from '@/components/recipe/RecipeIngredients.vue'
import RecipeInstructions from '@/components/recipe/RecipeInstructions.vue'
import VideoLink from '@/components/recipe/VideoLink.vue'

const route = useRoute()
const recipeStore = useRecipeStore()

function toggleFavorite() {
  const recipe = recipeStore.selectedRecipe
  if (recipeStore.isFavorite(recipe.id)) {
    recipeStore.removeFavorite(recipe.id)
  } else {
    recipeStore.addFavorite(recipe)
  }
}

onMounted(() => {
  recipeStore.selectRecipe(route.params.id)
})

watch(
  () => route.params.id,
  (id) => {
    recipeStore.selectRecipe(id)
  },
)
</script>

<template>
  <PageLayout>
    <AppNavbar variant="light" brand-to="/">
      <template #actions>
        <BackLink to="/" label="Back" />
      </template>
    </AppNavbar>

    <p v-if="recipeStore.detailLoading" class="detail-status">Load recipe…</p>

    <div v-else-if="recipeStore.selectedRecipe" class="recipe-page">
      <RecipeHero
        :image="recipeStore.selectedRecipe.img"
        :name="recipeStore.selectedRecipe.name"
        :category="recipeStore.selectedRecipe.category"
        :country="recipeStore.selectedRecipe.country"
        :is-favorite="recipeStore.isFavorite(recipeStore.selectedRecipe.id)"
        @toggle-favorite="toggleFavorite"
      />

      <div class="recipe-content">
        <h1>{{ recipeStore.selectedRecipe.name }}</h1>

        <div class="two-col">
          <RecipeIngredients :ingredients="recipeStore.selectedRecipe.ingredients" />
          <RecipeInstructions :instructions="recipeStore.selectedRecipe.instructions" />
        </div>

        <VideoLink
          v-if="recipeStore.selectedRecipe.videoLink"
          :href="recipeStore.selectedRecipe.videoLink"
        />
      </div>
    </div>

    <p v-else class="detail-status">Recipe not found.</p>
  </PageLayout>
</template>

<style scoped>
.detail-status {
  text-align: center;
  color: var(--color-text-muted);
  font-size: 1rem;
  padding: 4rem var(--space-lg);
  font-family: var(--font-sans);
}

.recipe-page {
  max-width: var(--max-width-detail);
  margin: var(--space-xl) auto;
  padding: 0 var(--space-lg) 5rem;
}

.recipe-content h1 {
  font-family: var(--font-serif);
  font-size: 2rem;
  font-weight: 700;
  color: var(--color-text-primary);
  margin-bottom: var(--space-xl);
  line-height: 1.2;
}

.two-col {
  display: grid;
  grid-template-columns: 260px 1fr;
  gap: var(--space-2xl);
  align-items: start;
}

@media (max-width: 680px) {
  .two-col {
    grid-template-columns: 1fr;
  }
}
</style>
