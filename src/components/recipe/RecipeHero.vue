<script setup>
import FavoriteToggle from '@/components/ui/FavoriteToggle.vue'

defineProps({
  image: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    default: '',
  },
  country: {
    type: String,
    default: '',
  },
  isFavorite: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['toggle-favorite'])
</script>

<template>
  <div class="recipe-hero">
    <img :src="image" :alt="name" />
    <div class="hero-overlay">
      <div class="hero-tags">
        <span v-if="category" class="hero-tag">{{ category }}</span>
        <span v-if="country" class="hero-tag hero-tag-country">{{ country }}</span>
      </div>
      <FavoriteToggle
        :active="isFavorite"
        active-label="Delete favorite"
        inactive-label="Add to favorites"
        @click="emit('toggle-favorite')"
      />
    </div>
  </div>
</template>

<style scoped>
.recipe-hero {
  position: relative;
  border-radius: var(--radius-lg);
  overflow: hidden;
  margin-bottom: var(--space-xl);
}

.recipe-hero img {
  width: 100%;
  height: 380px;
  object-fit: cover;
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, var(--color-overlay-hero) 0%, transparent 55%);
  display: flex;
  align-items: flex-start;
  justify-content: flex-end;
  padding: var(--space-md);
}

.hero-tags {
  position: absolute;
  bottom: var(--space-md);
  left: var(--space-md);
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  max-width: calc(100% - 4rem);
}

.hero-tag {
  background: var(--color-surface-glass);
  color: var(--color-text-primary);
  padding: 4px 12px;
  border-radius: var(--radius-pill);
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.8px;
  text-transform: uppercase;
}

.hero-tag-country {
  color: var(--color-text-muted);
}
</style>
