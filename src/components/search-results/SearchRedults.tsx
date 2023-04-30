import React, { useState } from 'react';
import { useAppContext } from '../../contect/context';
import { Status } from '../../hooks/api';
import { Spinner } from '../spinner/Spinner';
import { fetchRecipe } from '../../api/client';

const maxElemntsPerPage = 10;

const SearchRedults = () => {
  const { status, recipes, run } = useAppContext()
  const [count, setCount] = useState(maxElemntsPerPage)
  console.log(recipes)

  // if (status === Status.PENDING) {
  //   return <Spinner />
  // }


  const isForward = (recipes?.count || 0) - count > 0;
  const isBack = (recipes?.count || 0) - count < maxElemntsPerPage;

  const handleRecipeClick = (id: string, evt: React.MouseEvent) => {
    evt.preventDefault()
    run(fetchRecipe(id))
  }

  return (
    <div className="search-results">
      {status === Status.IDLE ||
        <>
          <ul className="results">
            {recipes?.recipes
              .slice(count - maxElemntsPerPage, count)
              .map((recipe) => (
                <li
                  key={recipe.recipeId}
                  className="preview">
                  <a
                    onClick={(evt) => handleRecipeClick(recipe.recipeId, evt)}
                    className="preview__link preview__link--active"
                    href={`#${recipe.recipeId}`}
                  >
                    <figure className="preview__fig">
                      <img src={`${recipe.imageUrl}`} alt="Test" />
                    </figure>
                    <div className="preview__data">
                      <h4 className="preview__title">{recipe.title}</h4>
                      <p className="preview__publisher">{recipe.publisher}</p>
                      <div className="preview__user-generated">
                        <svg>
                          <use href="/img/icons.svg#icon-user"></use>
                        </svg>
                      </div>
                    </div>
                  </a>
                </li>
              ))}
          </ul>

          <div style={{ marginTop: 'auto' }} className="pagination">
            {isBack &&
              <button
                onClick={() => setCount((count) => count - maxElemntsPerPage)}
                className="btn--inline pagination__btn--prev">
                <svg className="search__icon">
                  <use href="/img/icons.svg#icon-arrow-left"></use>
                </svg>
                <span>Page {Math.floor(count / maxElemntsPerPage) - 1}</span>
              </button>}
            {isForward &&
              <button
                onClick={() => setCount((count) => count + maxElemntsPerPage)}
                className="btn--inline pagination__btn--next">
                <span>Page {Math.floor(count / maxElemntsPerPage) + 1}</span>
                <svg className="search__icon">
                  <use href="/img/icons.svg#icon-arrow-right"></use>
                </svg>
              </button>}
          </div>
        </>
      }

      <p style={{ marginBottom: '25px' }} className="copyright">
        &copy; Copyright by
        <a
          className="twitter-link"
          target="_blank"
          href="https://twitter.com/jonasschmedtman" rel="noreferrer"
        >Jonas Schmedtmann</a
        >. Use for learning or your portfolio. Don't use to teach. Don't claim
        as your own.
      </p>
    </div>
  );
};

export default SearchRedults;
