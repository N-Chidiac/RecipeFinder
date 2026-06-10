# Recipe Finder

A recipe search and discovery app built with Vue 3 and the free MealDB API. Search by name, category, or country — save favorites, browse recipe details, and pick up where you left off with recent search history.

## Features

- **Smart search** — finds recipes by name, category, and country simultaneously
- **Favorites** — save recipes with a single click, persisted to localStorage
- **Recent searches** — quick-access chips for your last 5 searches
- **Infinite scroll** — browse the full recipe database letter by letter
- **Detail page** — full ingredients list, step-by-step instructions, and YouTube video link

## Tech Stack

|           |                                                                            |
| --------- | -------------------------------------------------------------------------- |
| Framework | Vue 3 (Composition API + `<script setup>`)                                 |
| State     | Pinia                                                                      |
| Routing   | Vue Router 4                                                               |
| Build     | Vite                                                                       |
| Data      | [TheMealDB API](https://www.themealdb.com/api.php) (free, no key required) |

## Getting Started

```bash
npm install
npm run dev
```

# Production build

```bash
npm run build
npm run preview
```

# Lint & format

```bash
npm run lint
npm run format
```

Requires Node `^20.19.0` or `>=22.12.0`.

## Project Structure

```
src/
├── assets/styles/
│   └── global.css          # CSS reset + design tokens
├── components/
│   ├── favorites/           # FavoritesHeader, EmptyState
│   ├── home/                # HeroSection, HeroContent, SectionMeta, RecentSearches
│   ├── icons/               # ChevronIcon, IconHeart, IconPlay
│   ├── layout/              # PageLayout, AppNavbar, AppFooter
│   ├── navigation/          # FavoritesLink
│   ├── recipe/              # RecipeHero, RecipeGrid, RecipeIngredients, RecipeInstructions, VideoLink, NoResults
│   ├── ui/                  # BackLink, BrandLogo, CountBadge, FavoriteButton, FavoriteToggle, SearchChip, SectionDivider
│   ├── RecipeCard.vue
│   └── RecipeList.vue
├── router/
│   └── index.js
├── stores/
│   └── recipes.js           # Search, favorites, recent searches, pagination
└── views/
    ├── HomeView.vue
    ├── DetailView.vue
    ├── FavoritesView.vue
    ├── PrivacyPolicyView.vue
    └── CookiePolicyView.vue
```

## API

Powered by the free [TheMealDB API](https://www.themealdb.com/api.php). No API key or account required. Search results combine direct name matches, category matches, country matches, and a full A–Z letter sweep for broader results.
