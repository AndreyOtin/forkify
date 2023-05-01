import { createContext, useContext, useReducer, useState } from "react";
import { DetaledRecipe, Recipe } from "../types/recipe";
import { Status } from "../hooks/api";
import { Reducer } from "react";

export interface IAppContext {
  recipes: Recipe | null;
  recipe: DetaledRecipe | null,
  status: {
    recipe: typeof Status[keyof typeof Status],
    recipes: typeof Status[keyof typeof Status]
  }
  dispatch: React.Dispatch<Action>
};

interface Action {
  data?: DetaledRecipe | Recipe
  type: ActionType,
}

export enum ActionType {
  UpdateFavorite = 'updatefavorite',
  FetchRecipe = 'fetchrecipe',
  FetchRecipeResolved = 'fetchrecipe.resolved',
  FetchRecipeRejected = 'fetchrecipe.rejected',
  FetchRecipes = 'fetchrecipes',
  FetchRecipesResolved = 'fetchrecipes.resolved',
  FetchRecipesRejected = 'fetchrecipes.rejected'
}

const initialState: IAppContext = {
  recipes: null,
  recipe: null,
  status: {
    recipe: Status.IDLE,
    recipes: Status.IDLE
  },
  dispatch: () => { }
}

const rootReducer: Reducer<IAppContext, Action> = (state, action) => {
  switch (action.type) {
    case ActionType.UpdateFavorite:
      return { ...state };
    case ActionType.FetchRecipe:
      return { ...state, status: { ...state.status, recipe: Status.PENDING } };
    case ActionType.FetchRecipeResolved:
      return { ...state, recipe: action.data as DetaledRecipe, status: { ...state.status, recipe: Status.RESOLVED } };
    case ActionType.FetchRecipeRejected:
      return { ...state, status: { ...state.status, recipe: Status.REJECTED } };
    case ActionType.FetchRecipes:
      return { ...state, status: { ...state.status, recipes: Status.PENDING } };
    case ActionType.FetchRecipesRejected:
      return { ...state, status: { ...state.status, recipes: Status.REJECTED } };
    case ActionType.FetchRecipesResolved:
      return { ...state, recipes: action.data as Recipe, status: { ...state.status, recipes: Status.RESOLVED } };
    default:
      throw new Error('wrong action')
  }
}

const AppContext = createContext<IAppContext>(initialState)

function AppContextProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(rootReducer, initialState)

  return (
    <AppContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => useContext(AppContext);
export default AppContextProvider
export { useAppContext }
