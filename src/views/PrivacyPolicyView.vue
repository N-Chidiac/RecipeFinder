<script setup>
import { RouterLink } from 'vue-router'
import PageLayout from '@/components/layout/PageLayout.vue'
import AppNavbar from '@/components/layout/AppNavbar.vue'
import BackLink from '@/components/ui/BackLink.vue'
</script>

<template>
  <PageLayout>
    <AppNavbar variant="light" brand-to="/">
      <template #actions>
        <BackLink to="/" label="Back" />
      </template>
    </AppNavbar>

    <article class="policy-page">
      <h1>Privacy Policy</h1>
      <p class="policy-updated">Last updated: June 9, 2026</p>

      <section>
        <h2>Introduction</h2>
        <p>
          Recipe Finder ("we", "our", or "us") respects your privacy. This Privacy Policy explains
          how we handle information when you use our recipe discovery website.
        </p>
      </section>

      <section>
        <h2>Information We Collect</h2>
        <p>
          Recipe Finder does not require you to create an account. We store the following
          information locally in your browser:
        </p>
        <ul>
          <li>Favorite recipes you save</li>
          <li>Recent search terms</li>
        </ul>
        <p>
          This data stays on your device and is not transmitted to our servers unless you explicitly
          share it.
        </p>
        <p>
          Recipe Finder does not collect, store, or process personal data such as names, email
          addresses, or account information.
        </p>
      </section>

      <section>
        <h2>Recipe Data</h2>
        <p>
          Recipe data and images are provided by the TheMealDB API. Requests for recipe information
          are sent to TheMealDB when you perform searches or view recipes. Please refer to
          TheMealDB's privacy practices for information about how they process data.
        </p>
      </section>

      <section>
        <h2>Cookies and Local Storage</h2>
        <p>
          We use browser local storage to remember your favorites and recent searches. For more
          details, see our
          <RouterLink to="/cookie-policy">Cookie Policy</RouterLink>.
        </p>
      </section>

      <section>
        <h2>Your Rights</h2>
        <p>
          You can clear your saved favorites and search history at any time by clearing your browser
          data or using your browser's local storage settings.
        </p>
      </section>

      <!-- <section>
        <h2>Contact</h2>
        <p>
          If you have questions about this Privacy Policy, please contact us at
          <a href="mailto:privacy@recipefinder.example">privacy@recipefinder.example</a>.
        </p>
      </section> -->
    </article>
  </PageLayout>
</template>

<style scoped>
.policy-page {
  max-width: 720px;
  margin: 0 auto;
  padding: var(--space-xl) var(--space-xl) var(--space-3xl);
}

.policy-page h1 {
  font-family: var(--font-serif);
  font-size: 2rem;
  font-weight: 700;
  color: var(--color-text-primary);
  margin-bottom: var(--space-sm);
}

.policy-updated {
  font-size: 0.85rem;
  color: var(--color-text-muted);
  margin-bottom: var(--space-2xl);
}

.policy-page section {
  margin-bottom: var(--space-xl);
}

.policy-page h2 {
  font-family: var(--font-serif);
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--color-text-primary);
  margin-bottom: var(--space-sm);
}

.policy-page p,
.policy-page li {
  font-size: 0.95rem;
  color: var(--color-text-body);
  line-height: 1.7;
}

.policy-page ul {
  list-style: disc;
  padding-left: 1.25rem;
  margin: var(--space-sm) 0;
}

.policy-page a {
  color: var(--color-primary);
  font-weight: 600;
}

@media (max-width: 580px) {
  .policy-page {
    padding: var(--space-xl) var(--space-md) var(--space-3xl);
  }
}
</style>
