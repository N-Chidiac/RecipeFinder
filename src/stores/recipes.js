import { ref, watch } from 'vue'
import { defineStore } from 'pinia'

const API_BASE = 'https://www.themealdb.com/api/json/v1/1'
const LETTERS = 'abcdefghijklmnopqrstuvwxyz'

export const useRecipeStore = defineStore('recipes', () => {
  const recipes = ref([])
  const selectedRecipe = ref(null)
  const currentSearch = ref(null)
  const matchedCategories = ref([])
  const matchedCountries = ref([])
  const loading = ref(false)
  const loadingMore = ref(false)
  const detailLoading = ref(false)
  const hasMore = ref(false)

  const nextLetterIndex = ref(0)
  const activeSearchQuery = ref(null)

  let categoriesCache = null
  let areasCache = null

  const stored = localStorage.getItem('favorites')
  const favorites = ref(stored ? JSON.parse(stored) : [])

  const storedSearches = localStorage.getItem('recentSearches')
  const recentSearches = ref(storedSearches ? JSON.parse(storedSearches) : [])

  watch(
    favorites,
    (newVal) => {
      localStorage.setItem('favorites', JSON.stringify(newVal))
    },
    { deep: true },
  )

  watch(
    recentSearches,
    (newVal) => {
      localStorage.setItem('recentSearches', JSON.stringify(newVal))
    },
    { deep: true },
  )

  function mapMeal(recipe) {
    const ingredients = []
    for (let i = 1; i <= 20; i++) {
      const ingredient = recipe[`strIngredient${i}`]
      const measure = recipe[`strMeasure${i}`]
      if (ingredient && ingredient.trim() !== '') {
        ingredients.push({ ingredient, measure })
      }
    }
    return {
      id: recipe.idMeal,
      name: recipe.strMeal,
      img: recipe.strMealThumb,
      category: recipe.strCategory,
      country: recipe.strCountry,
      instructions: recipe.strInstructions,
      videoLink: recipe.strYoutube,
      ingredients,
    }
  }

  function mapMealSummary(meal, category) {
    return {
      id: meal.idMeal,
      name: meal.strMeal,
      img: meal.strMealThumb,
      category,
      country: meal.strCountry,
      instructions: '',
      videoLink: '',
      ingredients: [],
    }
  }

  function dedupeRecipes(list) {
    const seen = new Set()
    return list.filter((recipe) => {
      if (seen.has(recipe.id)) return false
      seen.add(recipe.id)
      return true
    })
  }

  function mergeRecipes(newRecipes) {
    const existingIds = new Set(recipes.value.map((r) => r.id))
    const unique = newRecipes.filter((r) => !existingIds.has(r.id))
    recipes.value.push(...unique)
    return unique.length
  }

  function matchesSearch(meal, query, categories, countries) {
    const q = query.toLowerCase()
    if (meal.name.toLowerCase().includes(q)) return true
    if (meal.category?.toLowerCase().includes(q)) return true
    if (meal.country?.toLowerCase().includes(q)) return true
    if (categories.some((category) => category.toLowerCase() === meal.category?.toLowerCase())) {
      return true
    }
    return countries.some((country) => country.toLowerCase() === meal.country?.toLowerCase())
  }

  function resetPagination() {
    nextLetterIndex.value = 0
    activeSearchQuery.value = null
    matchedCategories.value = []
    matchedCountries.value = []
    hasMore.value = false
  }

  async function fetchCategories() {
    if (categoriesCache) return categoriesCache

    const response = await fetch(`${API_BASE}/categories.php`)
    const data = await response.json()
    categoriesCache = data.categories.map((category) => category.strCategory)
    return categoriesCache
  }

  function findMatchingCategories(term, categories) {
    const lower = term.toLowerCase()
    return categories.filter((category) => category.toLowerCase().includes(lower))
  }

  async function fetchAreas() {
    if (areasCache) return areasCache

    const response = await fetch(`${API_BASE}/list.php?a=list`)
    const data = await response.json()
    areasCache = data.meals ?? []
    return areasCache
  }

  function findMatchingCountries(term, areas) {
    const lower = term.toLowerCase()
    const filterKeys = new Set()
    const matchedCountryNames = []

    for (const area of areas) {
      const areaName = area.strArea ?? ''
      const countryName = area.strCountry ?? ''
      const isMatch =
        areaName.toLowerCase().includes(lower) || countryName.toLowerCase().includes(lower)

      if (!isMatch) continue

      if (areaName) filterKeys.add(areaName)
      if (countryName) filterKeys.add(countryName)
      matchedCountryNames.push(countryName || areaName)
    }

    filterKeys.add(term)
    if (term.length > 0) {
      filterKeys.add(term.charAt(0).toUpperCase() + term.slice(1).toLowerCase())
    }

    return { areas: [...filterKeys], countries: matchedCountryNames }
  }

  async function fetchSearch(term) {
    const response = await fetch(`${API_BASE}/search.php?s=${encodeURIComponent(term)}`)
    const data = await response.json()
    return data.meals ? data.meals.map(mapMeal) : []
  }

  async function fetchByCategory(category) {
    const response = await fetch(`${API_BASE}/filter.php?c=${encodeURIComponent(category)}`)
    const data = await response.json()
    return data.meals ? data.meals.map((meal) => mapMealSummary(meal, category)) : []
  }

  async function fetchByArea(area) {
    const response = await fetch(`${API_BASE}/filter.php?a=${encodeURIComponent(area)}`)
    const data = await response.json()
    return data.meals ? data.meals.map((meal) => mapMealSummary(meal)) : []
  }

  async function fetchMealById(id) {
    const response = await fetch(`${API_BASE}/lookup.php?i=${encodeURIComponent(id)}`)
    const data = await response.json()
    return data.meals?.[0] ? mapMeal(data.meals[0]) : null
  }

  async function fetchByLetter(letter) {
    const response = await fetch(`${API_BASE}/search.php?f=${letter}`)
    const data = await response.json()
    return data.meals ? data.meals.map(mapMeal) : []
  }

  async function fetchAllLetters() {
    const meals = []
    const chunkSize = 4

    for (let i = 0; i < LETTERS.length; i += chunkSize) {
      const chunk = LETTERS.slice(i, i + chunkSize)
      const batches = await Promise.all(chunk.split('').map((letter) => fetchByLetter(letter)))
      meals.push(...batches.flat())
    }

    return meals
  }

  async function fetchLetterMatches(term, matchedCats, countries) {
    const meals = await fetchAllLetters()
    return meals.filter((meal) => matchesSearch(meal, term, matchedCats, countries))
  }

  async function fetchSearchResults(term) {
    const [nameResults, categories, areas] = await Promise.all([
      fetchSearch(term),
      fetchCategories(),
      fetchAreas(),
    ])

    const matchedCats = findMatchingCategories(term, categories)
    matchedCategories.value = matchedCats

    const { areas: countryFilterKeys, countries } = findMatchingCountries(term, areas)
    matchedCountries.value = countries

    const categoryResults =
      matchedCats.length > 0
        ? (await Promise.all(matchedCats.map((category) => fetchByCategory(category)))).flat()
        : []

    const countryResults = (
      await Promise.all(countryFilterKeys.map((key) => fetchByArea(key)))
    ).flat()

    const letterResults = await fetchLetterMatches(term, matchedCats, countries)

    nextLetterIndex.value = LETTERS.length

    return dedupeRecipes([...nameResults, ...categoryResults, ...countryResults, ...letterResults])
  }

  async function loadNextLetterBatch() {
    if (nextLetterIndex.value >= LETTERS.length) {
      hasMore.value = false
      return 0
    }

    const letter = LETTERS[nextLetterIndex.value++]
    let meals = await fetchByLetter(letter)

    if (activeSearchQuery.value) {
      meals = meals.filter((meal) =>
        matchesSearch(
          meal,
          activeSearchQuery.value,
          matchedCategories.value,
          matchedCountries.value,
        ),
      )
    }

    const added = mergeRecipes(meals)
    hasMore.value = nextLetterIndex.value < LETTERS.length
    return added
  }

  function findStoredRecipe(id) {
    const idStr = String(id)
    return (
      recipes.value.find((r) => String(r.id) === idStr) ??
      favorites.value.find((r) => String(r.id) === idStr)
    )
  }

  function updateStoredRecipe(id, full) {
    const idStr = String(id)
    const recipeIndex = recipes.value.findIndex((r) => String(r.id) === idStr)
    if (recipeIndex !== -1) {
      recipes.value[recipeIndex] = full
    }

    const favoriteIndex = favorites.value.findIndex((r) => String(r.id) === idStr)
    if (favoriteIndex !== -1) {
      favorites.value[favoriteIndex] = full
    }
  }

  async function selectRecipe(id) {
    detailLoading.value = true

    try {
      let recipe = findStoredRecipe(id)

      if (!recipe || !recipe.instructions) {
        const full = await fetchMealById(id)
        if (full) {
          updateStoredRecipe(id, full)
          recipe = full
        }
      }

      selectedRecipe.value = recipe ?? null
    } finally {
      detailLoading.value = false
    }
  }

  function addFavorite(recipe) {
    favorites.value.push(recipe)
  }

  function isFavorite(id) {
    return favorites.value.some((r) => r.id === id)
  }

  function removeFavorite(id) {
    favorites.value = favorites.value.filter((r) => r.id !== id)
  }

  function addRecentSearch(term) {
    if (!term.trim()) return
    recentSearches.value = [
      term,
      ...recentSearches.value.filter((s) => s.toLowerCase() !== term.toLowerCase()),
    ].slice(0, 5)
  }

  async function getRecipe(searchTerm) {
    const trimmed = searchTerm.trim()

    loading.value = true
    resetPagination()
    recipes.value = []

    try {
      if (trimmed) {
        addRecentSearch(trimmed)
        currentSearch.value = trimmed
        activeSearchQuery.value = trimmed
        recipes.value = await fetchSearchResults(trimmed)
        hasMore.value = false
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
      let added = 0
      while (nextLetterIndex.value < LETTERS.length && added === 0) {
        added = await loadNextLetterBatch()
      }
    } finally {
      loadingMore.value = false
    }
  }

  return {
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
