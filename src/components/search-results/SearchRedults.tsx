import { useState } from 'react';
import { useAppContext } from '../../context/context';
import { Status } from '../../hooks/api';
import { Spinner } from '../spinner/Spinner';
import { Card } from '../card/Card';

const maxElemntsPerPage = 10;

const SearchRedults = () => {
  const { status, recipes } = useAppContext()
  const [count, setCount] = useState(maxElemntsPerPage)

  if (status.recipes === Status.PENDING) {
    return <Spinner isActive />
  }

  const isForward = (recipes?.count || 0) - count > 0;
  const isBack = (recipes?.count || 0) - count < maxElemntsPerPage;


  return (
    <div className="search-results">
      {
        !(status.recipes === Status.IDLE || status.recipes === Status.REJECTED) &&
        <>
          <ul className="results">
            {recipes?.recipes
              .slice(count - maxElemntsPerPage, count)
              .map((recipe) => (
                <Card key={recipe.recipeId} recipe={recipe} />
              ))}
          </ul>

          <div style={{ marginTop: 'auto' }} className="pagination">
            {
              isBack &&
              <button
                onClick={() => setCount((count) => count - maxElemntsPerPage)}
                className="btn--inline pagination__btn--prev"
              >
                <svg className="search__icon">
                  <use href="/img/icons.svg#icon-arrow-left"></use>
                </svg>
                <span>Page {Math.floor(count / maxElemntsPerPage) - 1}</span>
              </button>
            }
            {
              isForward &&
              <button
                onClick={() => setCount((count) => count + maxElemntsPerPage)}
                className="btn--inline pagination__btn--next"
              >
                <span>Page {Math.floor(count / maxElemntsPerPage) + 1}</span>
                <svg className="search__icon">
                  <use href="/img/icons.svg#icon-arrow-right"></use>
                </svg>
              </button>
            }
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
    </div >
    </div >
  );
};

export default SearchRedults;
