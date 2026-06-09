<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <footer class="app-footer">
    <div class="footer-inner">
      <p class="footer-copy">&copy; {{ new Date().getFullYear() }} Recipe Finder</p>
      <nav class="footer-nav" aria-label="Legal">
        <RouterLink to="/privacy-policy">Privacy Policy</RouterLink>
        <RouterLink to="/cookie-policy">Cookie Policy</RouterLink>
      </nav>
    </div>
  </footer>
</template>

<style scoped>
.app-footer {
  border-top: 1px solid var(--color-border);
  background: var(--color-bg-white);
  margin-top: auto;
}

.footer-inner {
  max-width: var(--max-width-content);
  margin: 0 auto;
  padding: var(--space-lg) var(--space-xl);
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-md);
}

.footer-copy {
  font-size: 0.85rem;
  color: var(--color-text-muted);
}

.footer-nav {
  display: flex;
  gap: var(--space-lg);
}

.footer-nav a {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--color-text-body);
  text-decoration: none;
  transition: color var(--transition-base);
}

.footer-nav a:hover {
  color: var(--color-primary);
}

@media (max-width: 580px) {
  .footer-inner {
    flex-direction: column;
    align-items: flex-start;
    padding: var(--space-lg) var(--space-md);
  }
}
</style>
