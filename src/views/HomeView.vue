<script setup>
import { onMounted } from 'vue'
import { useRecipeStore } from '@/stores/recipes'
import PageLayout from '@/components/layout/PageLayout.vue'
import SectionMeta from '@/components/home/SectionMeta.vue'
import RecepeList from '@/components/RecepeList.vue'

const recipeStore = useRecipeStore()

onMounted(() => {
  if (recipeStore.recipes.length === 0) {
    recipeStore.getRecipe(recipeStore.currentSearch ?? '')
  }
})
</script>

<template>
  <PageLayout>
    <main class="main-content">
      <SectionMeta />
      <RecepeList />
    </main>
  </PageLayout>
</template>

<style scoped>
.main-content {
  max-width: var(--max-width-content);
  margin: 0 auto;
}
</style>
