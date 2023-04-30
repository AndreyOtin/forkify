import React from 'react';
import { useAppContext } from '../../contect/context';
import { fetchQuery } from '../../api/client';
import { Status } from '../../hooks/api';

const Search = () => {
  const [search, setSearch] = React.useState('');
  const { run, status } = useAppContext()

  const handleSearchSubmit: React.FormEventHandler<HTMLFormElement> = async (evt) => {
    evt.preventDefault();

    await run(fetchQuery(search))

    if (status !== Status.REJECTED) {
      setSearch('')
    }
  }

  return (
    <form
      onSubmit={handleSearchSubmit}
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
