<script setup>
import { useRecipeStore } from '@/stores/recipes'
import { useRouter } from 'vue-router'
import FavoriteButton from '@/components/ui/FavoriteButton.vue'

const props = defineProps({
  recipe: {
    type: Object,
    required: true,
  },
})

const router = useRouter()
const recipeStore = useRecipeStore()

function goToRecipe() {
  router.push(`/recipe/${props.recipe.id}`)
}

function toggleFavorite(e) {
  e.stopPropagation()
  if (recipeStore.isFavorite(props.recipe.id)) {
    recipeStore.removeFavorite(props.recipe.id)
  } else {
    recipeStore.addFavorite(props.recipe)
  }
}
</script>

<template>
  <article class="recipe-card" @click="goToRecipe">
    <div class="image-wrapper">
      <img :src="recipe.img" :alt="recipe.name" loading="lazy" />

      <FavoriteButton
        :active="recipeStore.isFavorite(recipe.id)"
        :aria-label="recipeStore.isFavorite(recipe.id) ? 'Delete favorite' : 'Add to favorites'"
        @click="toggleFavorite"
      />
    </div>

    <div class="card-body">
      <div class="tags">
        <span v-if="recipe.category" class="tag">{{ recipe.category }}</span>
        <span v-if="recipe.country" class="tag tag-country">{{ recipe.country }}</span>
      </div>
      <h2 class="title">{{ recipe.name }}</h2>
    </div>
  </article>
</template>

<style scoped>
.recipe-card {
  background: var(--color-bg-white);
  border-radius: var(--radius-md);
  overflow: hidden;
  cursor: pointer;
  transition:
    transform 0.25s ease,
    box-shadow 0.25s ease;
  box-shadow: var(--shadow-card);
  border: 1px solid var(--color-border-card);
}

.recipe-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-card-hover);
}

.image-wrapper {
  position: relative;
  overflow: hidden;
}

.image-wrapper img {
  width: 100%;
  height: 210px;
  object-fit: cover;
  transition: transform var(--transition-slow);
}

.recipe-card:hover .image-wrapper img {
  transform: scale(1.06);
}

.card-body {
  padding: 0.9rem 1.1rem 1.1rem;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
  margin-bottom: 0.35rem;
}

.tag {
  display: inline-block;
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.9px;
  text-transform: uppercase;
  color: var(--color-primary);
}

.tag-country {
  color: var(--color-text-muted);
}

.title {
  font-family: var(--font-serif);
  font-size: 1rem;
  font-weight: 700;
  color: var(--color-text-primary);
  line-height: 1.35;
}
</style>
