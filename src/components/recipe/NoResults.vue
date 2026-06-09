<template>
  <p class="no-results">
    <slot>No recipes found. Try another search term. </slot>
  </p>
</template>

<style scoped>
.no-results {
  grid-column: 1 / -1;
  text-align: center;
  color: var(--color-text-muted);
  font-size: 1rem;
  padding: 4rem 0;
  font-family: var(--font-sans);
}
</style>
