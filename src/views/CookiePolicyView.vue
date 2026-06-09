<script setup>
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
      <h1>Cookie Policy</h1>
      <p class="policy-updated">Last updated: June 9, 2026</p>

      <section>
        <h2>What Are Cookies?</h2>
        <p>
          Cookies are small text files stored on your device when you visit a website. They help
          websites remember your preferences and improve your experience.
        </p>
      </section>

      <section>
        <h2>How Recipe Finder Uses Storage</h2>
        <p>
          Recipe Finder uses browser local storage rather than traditional tracking cookies. We use
          this storage to:
        </p>
        <ul>
          <li>Save your favorite recipes between visits</li>
          <li>Remember your recent search terms for quick access</li>
        </ul>
        <p>
          This information is stored only on your device and is not used for advertising or shared
          with third parties.
        </p>
        <p>Recipe Finder does not use advertising, analytics, or tracking cookies.</p>
      </section>

      <section>
        <h2>Third-Party Services</h2>
        <p>
          When you search for or view recipes, your browser may load images and data from TheMealDB.
          These services may use their own cookies or similar technologies according to their own
          policies.
        </p>
      </section>

      <section>
        <h2>Managing Your Preferences</h2>
        <p>You can control or delete stored data at any time by:</p>
        <ul>
          <li>Clearing your browser's site data</li>
          <li>Removing individual items from your favorites within the app</li>
          <li>Using your browser's privacy or developer settings to clear local storage</li>
        </ul>
      </section>

      <section>
        <h2>Changes to This Policy</h2>
        <p>
          We may update this Cookie Policy from time to time. Any changes will be posted on this
          page with an updated revision date.
        </p>
      </section>

      <!-- <section>
        <h2>Contact</h2>
        <p>
          For questions about our use of cookies and local storage, contact us at
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
