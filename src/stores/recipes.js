import { ref, watch } from 'vue'
import { defineStore } from 'pinia'

const API_BASE = 'https://www.themealdb.com/api/json/v1/1'
const LETTERS = 'abcdefghijklmnopqrstuvwxyz'

// Reads a JSON value from localStorage, or returns the fallback if nothing is stored
function fromStorage(key, fallback = []) {
  const item = localStorage.getItem(key)
  return item ? JSON.parse(item) : fallback
}

export const useRecipeStore = defineStore('recipes', () => {
  // ── State ──────────────────────────────────────────────────────────────────

  const recipes = ref([])
  const selectedRecipe = ref(null)
  const currentSearch = ref(null) // the active search term (null = browsing all)
  const matchedCategories = ref([]) // used for the result count label
  const matchedCountries = ref([]) // used for the result count label

  const loading = ref(false)
  const loadingMore = ref(false)
  const detailLoading = ref(false)
  const hasMore = ref(false) // whether there are more letters left to browse

  const nextLetterIndex = ref(0) // tracks which letter to fetch next during browse

  // Persisted state — kept in sync with localStorage via watchers below
  const favorites = ref(fromStorage('favorites'))
  const recentSearches = ref(fromStorage('recentSearches'))

  // API response caches — plain variables, not reactive (no need to re-render on change)
  let categoriesCache = null
  let areasCache = null

  watch(favorites, (val) => localStorage.setItem('favorites', JSON.stringify(val)), { deep: true })
  watch(recentSearches, (val) => localStorage.setItem('recentSearches', JSON.stringify(val)), {
    deep: true,
  })

  // ── Data mapping ────────────────────────────────────────────────────────────

  // Maps a full MealDB meal object (from search/lookup endpoints)
  function mapMeal(meal) {
    const ingredients = []
    for (let i = 1; i <= 20; i++) {
      const ingredient = meal[`strIngredient${i}`]
      const measure = meal[`strMeasure${i}`]
      if (ingredient?.trim()) {
        ingredients.push({ ingredient, measure })
      }
    }
    return {
      id: meal.idMeal,
      name: meal.strMeal,
      img: meal.strMealThumb,
      category: meal.strCategory,
      country: meal.strCountry,
      instructions: meal.strInstructions,
      videoLink: meal.strYoutube,
      ingredients,
    }
  }

  // Maps a summary meal (from filter endpoints — only id, name, and image are available)
  // Instructions, videoLink, and ingredients are filled in later when the detail page loads
  function mapMealSummary(meal, category = null) {
    return {
      id: meal.idMeal,
      name: meal.strMeal,
      img: meal.strMealThumb,
      category,
      country: null,
      instructions: '',
      videoLink: '',
      ingredients: [],
    }
  }

  // ── API calls ───────────────────────────────────────────────────────────────

  async function fetchCategories() {
    if (categoriesCache) return categoriesCache
    const res = await fetch(`${API_BASE}/categories.php`)
    const data = await res.json()
    categoriesCache = data.categories.map((c) => c.strCategory)
    return categoriesCache
  }

  async function fetchAreas() {
    if (areasCache) return areasCache
    const res = await fetch(`${API_BASE}/list.php?a=list`)
    const data = await res.json()
    areasCache = data.meals ?? []
    return areasCache
  }

  async function fetchByName(term) {
    const res = await fetch(`${API_BASE}/search.php?s=${encodeURIComponent(term)}`)
    const data = await res.json()
    return data.meals ? data.meals.map(mapMeal) : []
  }

  async function fetchByCategory(category) {
    const res = await fetch(`${API_BASE}/filter.php?c=${encodeURIComponent(category)}`)
    const data = await res.json()
    return data.meals ? data.meals.map((meal) => mapMealSummary(meal, category)) : []
  }

  async function fetchByArea(area) {
    const res = await fetch(`${API_BASE}/filter.php?a=${encodeURIComponent(area)}`)
    const data = await res.json()
    return data.meals ? data.meals.map((meal) => mapMealSummary(meal)) : []
  }

  async function fetchById(id) {
    const res = await fetch(`${API_BASE}/lookup.php?i=${encodeURIComponent(id)}`)
    const data = await res.json()
    return data.meals?.[0] ? mapMeal(data.meals[0]) : null
  }

  async function fetchByLetter(letter) {
    const res = await fetch(`${API_BASE}/search.php?f=${letter}`)
    const data = await res.json()
    return data.meals ? data.meals.map(mapMeal) : []
  }

  // Fetches all 26 letters in groups of 4 to avoid firing 26 requests at once
  async function fetchAllLetters() {
    const meals = []
    for (let i = 0; i < LETTERS.length; i += 4) {
      const letters = LETTERS.slice(i, i + 4).split('')
      const results = await Promise.all(letters.map(fetchByLetter))
      meals.push(...results.flat())
    }
    return meals
  }

  // ── Search helpers ──────────────────────────────────────────────────────────

  // Returns true if a meal matches the search term by name, category, or country
  function mealMatchesSearch(meal, term, categories, countries) {
    const q = term.toLowerCase()
    if (meal.name.toLowerCase().includes(q)) return true
    if (meal.category?.toLowerCase().includes(q)) return true
    if (meal.country?.toLowerCase().includes(q)) return true
    if (categories.some((c) => c.toLowerCase() === meal.category?.toLowerCase())) return true
    return countries.some((c) => c.toLowerCase() === meal.country?.toLowerCase())
  }

  function findMatchingCategories(term, categories) {
    const lower = term.toLowerCase()
    return categories.filter((c) => c.toLowerCase().includes(lower))
  }

  // The MealDB area list only has strArea (e.g. "Italian"), no strCountry
  function findMatchingAreas(term, areas) {
    const lower = term.toLowerCase()
    const matchedAreas = areas
      .filter((a) => a.strArea?.toLowerCase().includes(lower))
      .map((a) => a.strArea)

    // Also include a capitalized version of the term itself as a fallback
    // e.g. user types "italian" → also try fetching "Italian" from the API
    const normalized = term.charAt(0).toUpperCase() + term.slice(1).toLowerCase()
    const areaKeys = [...new Set([...matchedAreas, normalized])]

    return { areaKeys, matchedAreas }
  }

  // Removes duplicate recipes from a list, keeping the first occurrence
  function dedupeById(list) {
    const seen = new Set()
    return list.filter((item) => {
      if (seen.has(item.id)) return false
      seen.add(item.id)
      return true
    })
  }

  // ── Main search ─────────────────────────────────────────────────────────────

  // Runs a broad search: by name, by category, by area, and a full A–Z sweep.
  // The A–Z sweep catches recipes that the API's own search would miss.
  async function runSearch(term) {
    const [nameResults, categories, areas] = await Promise.all([
      fetchByName(term),
      fetchCategories(),
      fetchAreas(),
    ])

    const matchedCats = findMatchingCategories(term, categories)
    matchedCategories.value = matchedCats

    const { areaKeys, matchedAreas } = findMatchingAreas(term, areas)
    matchedCountries.value = matchedAreas

    const categoryResults =
      matchedCats.length > 0 ? (await Promise.all(matchedCats.map(fetchByCategory))).flat() : []

    const areaResults = (await Promise.all(areaKeys.map(fetchByArea))).flat()

    const allMeals = await fetchAllLetters()
    const letterResults = allMeals.filter((meal) =>
      mealMatchesSearch(meal, term, matchedCats, matchedAreas),
    )

    // Mark all letters as done since the A–Z sweep already fetched everything
    nextLetterIndex.value = LETTERS.length

    return dedupeById([...nameResults, ...categoryResults, ...areaResults, ...letterResults])
  }

  // ── Browse (letter-by-letter) ───────────────────────────────────────────────

  function resetBrowse() {
    nextLetterIndex.value = 0
    matchedCategories.value = []
    matchedCountries.value = []
    hasMore.value = false
  }

  // Adds new recipes to the list, skipping ones already present. Returns how many were added.
  function mergeRecipes(newRecipes) {
    const existingIds = new Set(recipes.value.map((r) => r.id))
    const unique = newRecipes.filter((r) => !existingIds.has(r.id))
    recipes.value.push(...unique)
    return unique.length
  }

  async function loadNextLetterBatch() {
    if (nextLetterIndex.value >= LETTERS.length) {
      hasMore.value = false
      return 0
    }

    const letter = LETTERS[nextLetterIndex.value++]
    let meals = await fetchByLetter(letter)

    // During an active search, only keep meals that match the search term
    if (currentSearch.value) {
      meals = meals.filter((meal) =>
        mealMatchesSearch(
          meal,
          currentSearch.value,
          matchedCategories.value,
          matchedCountries.value,
        ),
      )
    }

    const added = mergeRecipes(meals)
    hasMore.value = nextLetterIndex.value < LETTERS.length
    return added
  }

  // ── Public actions ──────────────────────────────────────────────────────────

  async function getRecipe(searchTerm) {
    const trimmed = searchTerm.trim()

    loading.value = true
    resetBrowse()
    recipes.value = []

    try {
      if (trimmed) {
        addRecentSearch(trimmed)
        currentSearch.value = trimmed
        recipes.value = await runSearch(trimmed)
      } else {
        currentSearch.value = null
        await loadNextLetterBatch()
      }
    } finally {
      loading.value = false
    }
  }

  async function loadMore() {
    if (loadingMore.value || !hasMore.value) return

    loadingMore.value = true
    try {
      // Keep loading letters until we find at least one new result
      let added = 0
      while (nextLetterIndex.value < LETTERS.length && added === 0) {
        added = await loadNextLetterBatch()
      }
    } finally {
      loadingMore.value = false
    }
  }

  async function selectRecipe(id) {
    detailLoading.value = true

    try {
      const idStr = String(id)

      // Check if we already have this recipe in the list or favorites
      let recipe =
        recipes.value.find((r) => String(r.id) === idStr) ??
        favorites.value.find((r) => String(r.id) === idStr)

      // If we don't have it yet, or only have the summary (no instructions), fetch the full version
      if (!recipe?.instructions) {
        const full = await fetchById(id)
        if (full) {
          // Update the cached version so navigating back doesn't re-fetch
          const inList = recipes.value.findIndex((r) => String(r.id) === idStr)
          if (inList !== -1) recipes.value[inList] = full

          const inFavorites = favorites.value.findIndex((r) => String(r.id) === idStr)
          if (inFavorites !== -1) favorites.value[inFavorites] = full

          recipe = full
        }
      }

      selectedRecipe.value = recipe ?? null
    } finally {
      detailLoading.value = false
    }
  }

  // ── Favorites ───────────────────────────────────────────────────────────────

  function isFavorite(id) {
    return favorites.value.some((r) => r.id === id)
  }

  function addFavorite(recipe) {
    favorites.value.push(recipe)
  }

  function removeFavorite(id) {
    favorites.value = favorites.value.filter((r) => r.id !== id)
  }

  // ── Recent searches ─────────────────────────────────────────────────────────

  function addRecentSearch(term) {
    if (!term.trim()) return
    recentSearches.value = [
      term,
      ...recentSearches.value.filter((s) => s.toLowerCase() !== term.toLowerCase()),
    ].slice(0, 5)
  }

  // ── Expose ───────────────────────────────────────────────────────────────────

  return {
    // State
    recipes,
    selectedRecipe,
    favorites,
    recentSearches,
    currentSearch,
    matchedCategories,
    matchedCountries,
    loading,
    loadingMore,
    detailLoading,
    hasMore,
    getRecipe,
    loadMore,
    selectRecipe,
    addFavorite,
    removeFavorite,
    isFavorite,
    addRecentSearch,
  }
})
