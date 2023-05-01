import { Recipe } from "../types/recipe";

const BOOKMARK_FORKIFY = 'BOOKMARK_FORKIFY';

const getBookmarks = () => {
  const item = localStorage.getItem(BOOKMARK_FORKIFY);

  return item ? JSON.parse(item) as Recipe['recipes'] : [];
};

const setBookmark = (recipe: Recipe['recipes'][0]) => {
  const items = getBookmarks()
  items.push(recipe);
  localStorage.setItem(BOOKMARK_FORKIFY, JSON.stringify(items));
};

const removeBookmark = (bookmarkId: string) => {
  const items = getBookmarks().filter(item => item.recipeId !== bookmarkId)
  localStorage.setItem(BOOKMARK_FORKIFY, JSON.stringify(items));
};

export { getBookmarks, setBookmark, removeBookmark };
