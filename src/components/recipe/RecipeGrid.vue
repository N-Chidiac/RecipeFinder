<template>
  <div class="recipe-grid">
    <slot />
  </div>
</template>

<style scoped>
.recipe-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.75rem;
}

@media (max-width: 960px) {
  .recipe-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 580px) {
  .recipe-grid {
    grid-template-columns: 1fr;
  }
}
</style>
