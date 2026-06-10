<template>
  <div class="hero-content">
    <p class="eyebrow">Daily kitchen inspiration</p>
    <h1>Discover your next <br /><em>favorite</em> recipe</h1>
    <p class="hero-sub">Thousands of recipes from around the world, always within reach.</p>
  </div>
</template>

<style scoped>
.hero-content {
  max-width: var(--max-width-narrow);
  margin: 0 auto;
  text-align: center;
  padding: 1rem 2rem 2rem;
  margin-top: 8%;
}

@media (max-width: 1000px) {
  .hero-content {
    margin-top: 10%;
  }
}

@media (max-width: 900px) {
  .hero-content {
    margin-top: 15%;
  }
}

@media (max-width: 550px) {
  .hero-content {
    margin-top: 20%;
  }
}

.eyebrow {
  text-transform: uppercase;
  letter-spacing: 2.5px;
  font-size: 0.7rem;
  font-weight: 700;
  color: var(--color-primary);
  margin-bottom: var(--space-md);
}

.hero-content h1 {
  font-family: var(--font-serif);
  font-size: clamp(1.9rem, 5vw, 3rem);
  font-weight: 700;
  color: var(--color-text-inverse);
  line-height: 1.18;
  margin-bottom: var(--space-md);
}

.hero-content h1 em {
  font-style: italic;
  color: var(--color-primary-muted);
}

.hero-sub {
  color: var(--color-text-on-dark-muted);
  font-size: 0.95rem;
  line-height: 1.6;
}
</style>
