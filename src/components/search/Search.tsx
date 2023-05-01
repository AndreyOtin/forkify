import React from 'react';
import { ActionType, useAppContext } from '../../context/context';
import { fetchQuery } from '../../api/client';

const Search = () => {
  const [search, setSearch] = React.useState('');
  const { dispatch } = useAppContext()

  const handleSearchSubmit: React.FormEventHandler<HTMLFormElement> = async (evt) => {
    evt.preventDefault();

    dispatch({ type: ActionType.FetchRecipes })

    try {
      const recipes = await fetchQuery(search)

      dispatch({ type: ActionType.FetchRecipesResolved, data: recipes })
      setSearch('')
    } catch (error) {
      dispatch({ type: ActionType.FetchRecipesRejected })
    }
  }

  return (
    <form
      onSubmit={(evt) => {
        handleSearchSubmit(evt)
      }}
      className="search">
      <input
        type="text"
        className="search__field"
        placeholder="Введите рецепт например Pizza"
        onChange={(evt) => setSearch(evt.target.value)}
        value={search}
      />
      <button
        className="btn search__btn">
        <svg className="search__icon">
          <use href="/img/icons.svg#icon-search"></use>
        </svg>
        <span>Search</span>
      </button>
    </form>
  );
};

export default Search;
