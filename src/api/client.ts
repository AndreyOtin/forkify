import { DetaledRecipe, Recipe } from "../types/recipe"
import api from "./api"

const fetchQuery = async (query: string) => {
  const { data: recipes } = await api.get<Recipe>('/search', {
    params: {
      q: query
    }
  })

  return { recipes };
}


const fetchRecipe = async (id: string) => {
  const { data: recipe } = await api.get<DetaledRecipe>('/get', {
    params: {
      rId: id
    }
  })

  return { recipe }
}

export { fetchQuery, fetchRecipe }
