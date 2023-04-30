export interface Recipe {
  count: number,
  recipes: {
    publisher: string
    title: string
    sourceUrl: string
    recipeId: string
    imageUrl: string
    socialRank: number
    publisherUrl: string
  }[]
}


export interface DetaledRecipe {
  recipe: {
    publisher: string
    ingredients: string[]
    sourceUrl: string
    recipeId: string
    imageUrl: string
    socialRank: number
    publisherUrl: string
    title: string
  }
}
