import { createContext, useContext, useState } from "react";
import { DetaledRecipe, Recipe } from "../types/recipe";
import useApi, { Status } from "../hooks/api";

export type IAppContext = {
  recipes: Recipe | null;
  recipe: DetaledRecipe | null,
  setState: React.Dispatch<React.SetStateAction<Partial<IAppContext>>>
};

const initialState = {
  recipes: null,
  recipe: null,
}

const AppContext = createContext<Partial<IAppContext>>(initialState)

const useAppContext = () => useContext(AppContext) as IAppContext;

function AppContextProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<Partial<IAppContext>>(initialState)

  return (
    <AppContext.Provider value={{ ...state, setState }}>
      {children}
    </AppContext.Provider>
  );
};


export default AppContextProvider
export { useAppContext }
