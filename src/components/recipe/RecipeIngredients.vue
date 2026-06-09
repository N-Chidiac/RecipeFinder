<script setup>
defineProps({
  ingredients: {
    type: Array,
    required: true,
  },
})
</script>

<template>
  <section class="section">
    <h3>Ingredients</h3>
    <ul class="ingredients">
      <li v-for="(item, index) in ingredients" :key="index">
        <span class="measure">{{ item.measure }}</span>
        <span class="ingredient">{{ item.ingredient }}</span>
      </li>
    </ul>
  </section>
</template>

<style scoped>
.section h3 {
  font-family: var(--font-serif);
  font-size: 1rem;
  font-weight: 700;
  color: var(--color-text-primary);
  margin-bottom: var(--space-md);
  padding-bottom: var(--space-sm);
  border-bottom: 2px solid var(--color-text-primary);
}

.ingredients li {
  display: flex;
  gap: 0.6rem;
  padding: var(--space-sm) 0;
  border-bottom: 1px solid var(--color-border-card);
  font-size: 0.9rem;
}

.measure {
  color: var(--color-primary);
  font-weight: 600;
  width: min(40%, 200px);
}

.ingredient {
  color: var(--color-text-secondary);
}
</style>
