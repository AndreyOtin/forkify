import * as React from 'react';
import { ActionType, useAppContext } from '../../context/context';
import { Status } from '../../hooks/api';
import Error from '../error/Error';
import { Spinner } from '../spinner/Spinner';
import { getBookmarks, removeBookmark, setBookmark } from '../../api/local-storage';

const Recipe = () => {
  const { status, recipe, dispatch } = useAppContext()
  const [isFavorite, setFavorite] = React.useState(false)

  React.useEffect(() => {
    if (!recipe) {
      return
    }

    const isFav = getBookmarks().some((fav) => fav.recipeId === recipe.recipe.recipeId)
    setFavorite(isFav)
  }, [recipe]);

  const handleBookmarkClick = (id: string) => {
    if (isFavorite) {
      removeBookmark(id);
      setFavorite(!isFavorite)
      dispatch({ type: ActionType.UpdateFavorite })
    } else {
      if (!recipe?.recipe) {
        return;
      }

      setBookmark(recipe.recipe);
      setFavorite(!isFavorite)
      dispatch({ type: ActionType.UpdateFavorite })
    }
  }

  return (
    <div className="recipe">

      {status.recipes === Status.IDLE &&
        <div className="message">
          <div>
            <svg>
              <use href="/img/icons.svg#icon-smile"></use>
            </svg>
          </div>
          <p>Start by searching for a recipe or an ingredient. Have fun!</p>
        </div>
      }

      {status.recipes === Status.REJECTED && <Error />}

      {recipe &&
        !(status.recipe === Status.REJECTED) &&
        <>
          <Spinner isActive={status.recipe === Status.PENDING}>
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
                <span className="recipe__info-data recipe__info-data--minutes">Publisher: </span>
                <span className="recipe__info-text">{recipe.recipe.publisher}</span>
              </div>
              <div className="recipe__info">
                <svg className="recipe__info-icon">
                  <use href="/img/icons.svg#icon-users"></use>
                </svg>
                <span className="recipe__info-data recipe__info-data--people">Rating</span>
                <span className="recipe__info-text">{Math.round(recipe.recipe.socialRank)}</span>
              </div>

              <div className="recipe__user-generated">
                <svg>
                  <use href="/img/icons.svg#icon-user"></use>
                </svg>
              </div>
              <button
                onClick={() => handleBookmarkClick(recipe.recipe.recipeId)}
                className="btn--round">
                <svg className="">
                  <use href={`/img/icons.svg#icon-bookmark${isFavorite ? '-fill' : ''}`}></use>
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
          </Spinner>
          <div className="recipe__directions">
            <h2 className="heading--2">How to cook it</h2>
            <p className="recipe__directions-text">
              This recipe was carefully designed and tested by
              <span className="recipe__publisher"> {recipe.recipe.publisher}</span>. Please check out
                directions at their website.
            </p>
            <a
              className="btn--small recipe__btn"
              href={recipe.recipe.publisherUrl}
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
