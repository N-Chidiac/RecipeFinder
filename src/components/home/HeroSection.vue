<script setup>
import AppNavbar from '@/components/layout/AppNavbar.vue'
import FavoritesLink from '@/components/navigation/FavoritesLink.vue'
import HeroContent from '@/components/home/HeroContent.vue'
import SearchBar from '@/components/SearchBar.vue'
import RecentSearches from '@/components/home/RecentSearches.vue'
</script>

<template>
  <header class="hero">
    <div class="hero-nav-sticky">
      <AppNavbar variant="dark">
        <template #actions>
          <FavoritesLink />
        </template>
      </AppNavbar>
    </div>

    <HeroContent />

    <div class="hero-tools-sticky">
      <div class="search-wrapper">
        <SearchBar />
      </div>
      <RecentSearches />
    </div>
  </header>
</template>

<style scoped>
.hero {
  --hero-nav-height: 4.5rem;
  --hero-bg: linear-gradient(160deg, var(--color-bg-hero-end) 0%, var(--color-bg-hero-start) 100%);

  background: var(--hero-bg);
  padding-bottom: var(--space-3xl);
}

.hero-nav-sticky {
  position: fixed;
  top: 0;
  z-index: 20;
  width: 100%;
  background: var(--hero-bg);
}

.hero-tools-sticky {
  position: sticky;
  top: var(--hero-nav-height);
  z-index: 19;
  padding-bottom: 0.25rem;
}

.search-wrapper {
  max-width: var(--max-width-search);
  margin: 0 auto;
  padding: 0 var(--space-md);
}
</style>
