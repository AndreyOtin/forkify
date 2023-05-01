import Search from '../search/Search';
import { BookmarkList } from '../bookmak-list/BookmarkList';

const Header = () => {
  return (
    <header className="header">
      <img src="/img/logo.png" alt="Logo" className="header__logo" />
      <Search />
      <nav className="nav">
        <ul className="nav__list">
          <li className="nav__item">
            <button className="nav__btn nav__btn--bookmarks">
              <svg className="nav__icon">
                <use href="img/icons.svg#icon-bookmark"></use>
              </svg>
              <span>Bookmarks</span>
            </button>
            <div className="bookmarks">
              <BookmarkList />
            </div>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
