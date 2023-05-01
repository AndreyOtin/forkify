// @flow
import * as React from 'react';
import { Recipe } from '../../types/recipe';
import { ActionType, useAppContext } from '../../context/context';
import { fetchRecipe } from '../../api/client';

type Props = {
  recipe: Recipe['recipes'][0],
  variant?: 'default' | 'bookmark'
};

export function Card({ recipe, variant = "default" }: Props) {
  const { dispatch, recipe: currentRecipe } = useAppContext()

  const handleRecipeClick = async (id: string, evt: React.MouseEvent) => {
    evt.preventDefault()

    dispatch({ type: ActionType.FetchRecipe })

    try {
      const recipe = await fetchRecipe(id)

      dispatch({ type: ActionType.FetchRecipeResolved, data: recipe })
    } catch (error) {
      dispatch({ type: ActionType.FetchRecipeRejected })
    }
  }


  return (
    <li
      key={recipe.recipeId}
      className="preview">
      <a
        onClick={(evt) => handleRecipeClick(recipe.recipeId, evt)}
        className={`preview__link ${recipe.recipeId === currentRecipe?.recipe.recipeId ? 'preview__link--active' : ''}`}
        href={`#${recipe.recipeId}`}
      >
        <figure className="preview__fig">
          <img src={`${recipe.imageUrl}`} alt="Test" />
        </figure>
        <div className="preview__data">
          <h4 className="preview__title">{recipe.title}</h4>
          <p className="preview__publisher">{recipe.publisher}</p>

          {variant === 'default' &&
            <div className="preview__user-generated">
              <svg>
                <use href="/img/icons.svg#icon-user"></use>
              </svg>
            </div>}

        </div>
      </a>
    </li>
  );
};
