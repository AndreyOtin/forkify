import React from 'react';
import { useAppContext } from '../../contect/context';
import { Status } from '../../hooks/api';
import Error from '../error/Error';

const Recipe = () => {
  const { status, recipe } = useAppContext()
console.log('dg')
  return (
    <div className="recipe">

      {status === Status.IDLE &&
        <div className="message">
          <div>
            <svg>
              <use href="/img/icons.svg#icon-smile"></use>
            </svg>
          </div>
          <p>Start by searching for a recipe or an ingredient. Have fun!</p>
        </div>
      }

      {status === Status.REJECTED && <Error />}

      {recipe &&
        <>
          <figure className="recipe__fig">
            <img src={`${recipe.recipe.imageUrl}`} alt={`${recipe.recipe.title}`} className="recipe__img" />
            <h1 className="recipe__title">
              <span>{recipe.recipe.title}</span>
            </h1>
          </figure>

          <div className="recipe__details">
            <div className="recipe__info">
              <svg className="recipe__info-icon">
                <use href="/img/icons.svg#icon-clock"></use>
              </svg>
              <span className="recipe__info-data recipe__info-data--minutes">45</span>
              <span className="recipe__info-text">minutes</span>
            </div>
            <div className="recipe__info">
              <svg className="recipe__info-icon">
                <use href="/img/icons.svg#icon-users"></use>
              </svg>
              <span className="recipe__info-data recipe__info-data--people">4</span>
              <span className="recipe__info-text">servings</span>

              <div className="recipe__info-buttons">
                <button className="btn--tiny btn--increase-servings">
                  <svg>
                    <use href="/img/icons.svg#icon-minus-circle"></use>
                  </svg>
                </button>
                <button className="btn--tiny btn--increase-servings">
                  <svg>
                    <use href="/img/icons.svg#icon-plus-circle"></use>
                  </svg>
                </button>
              </div>
            </div>

            <div className="recipe__user-generated">
              <svg>
                <use href="/img/icons.svg#icon-user"></use>
              </svg>
            </div>
            <button className="btn--round">
              <svg className="">
                <use href="/img/icons.svg#icon-bookmark-fill"></use>
              </svg>
            </button>
          </div>

          <div className="recipe__ingredients">
            <h2 className="heading--2">Recipe ingredients</h2>
            <ul className="recipe__ingredient-list">
              {recipe.recipe.ingredients
                .map((ingredient, index) => (
                  <li key={index.toString()} className="recipe__ingredient">
                    <svg className="recipe__icon">
                      <use href="/img/icons.svg#icon-check"></use>
                    </svg>
                    <div className="recipe__description">
                      {ingredient}
                    </div>
                  </li>
                ))}
            </ul>
          </div>

          <div className="recipe__directions">
            <h2 className="heading--2">How to cook it</h2>
            <p className="recipe__directions-text">
              This recipe was carefully designed and tested by
              <span className="recipe__publisher">The Pioneer Woman</span>. Please check out
              directions at their website.
            </p>
            <a
              className="btn--small recipe__btn"
              href="http://thepioneerwoman.com/cooking/pasta-with-tomato-cream-sauce/"
              target="_blank" rel="noreferrer"
            >
              <span>Directions</span>
              <svg className="search__icon">
                <use href="/img/icons.svg#icon-arrow-right"></use>
              </svg>
            </a>
          </div>
        </>}

    </div>
  );
};

export default Recipe;
