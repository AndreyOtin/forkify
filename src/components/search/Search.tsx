import React from 'react';
import { useAppContext } from '../../contect/context';
import { fetchQuery } from '../../api/client';
import useApi, { Status } from '../../hooks/api';

const Search = () => {
  const [search, setSearch] = React.useState('');
  const { setState } = useAppContext()
  const { run, response } = useApi()

  const handleSearchSubmit: React.FormEventHandler<HTMLFormElement> = async (evt) => {
    evt.preventDefault();
    try {
      const data = await run(fetchQuery(search))
      setSearch('')
      setState((s) => ({ ...s, ...data }))
    } catch (err) {

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
        placeholder="Search over 1,000,000 recipes..."
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
