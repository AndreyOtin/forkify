import { createContext, useContext, useState } from "react";
import { DetaledRecipe, Recipe } from "../types/recipe";
import useApi, { Status } from "../hooks/api";

export type IAppContext = {
  recipes: Recipe | null;
  recipe: DetaledRecipe | null,
  status: typeof Status[keyof typeof Status]
  run: Pick<ReturnType<typeof useApi>, 'run'>['run']
};

const ititialState = {
  recipes: null,
  recipe: null,
  status: Status.IDLE
}

const AppContext = createContext<Partial<IAppContext>>(ititialState)

const useAppContext = () => useContext(AppContext) as IAppContext;

function AppContextProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<Partial<IAppContext>>({...ititialState})
  const { response, run, } = useApi(setState)

  const status = response.status

  return (
    <AppContext.Provider value={{...state, status, run }}>
      {children}
    </AppContext.Provider>
  );
};


export default AppContextProvider
export { useAppContext }
