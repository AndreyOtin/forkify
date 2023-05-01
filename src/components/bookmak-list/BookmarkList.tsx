// @flow
import { getBookmarks } from '../../api/local-storage';
import { useAppContext } from '../../context/context';
import { Card } from '../card/Card';

export function BookmarkList() {
  useAppContext();
  const bookmarks = getBookmarks();

  return (
    bookmarks.length
      ?
      <ul className="bookmarks__list">
        {bookmarks.map(favorite => (
          <Card key={favorite.recipeId} recipe={favorite} variant='bookmark' />
        ))}
      </ul>
      : <div className="message">
        <div>
          <svg>
            <use href="/img/icons.svg#icon-smile"></use>
          </svg>
        </div>
        <p>
          No bookmarks yet. Find a nice recipe and bookmark it :)
        </p>
      </div>
  );
};
