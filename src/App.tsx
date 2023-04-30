import SearchRedults from './components/search-results/SearchRedults';
import Recipe from './components/recipe/Recipe';
import Header from './components/header/Header';
import './sass/main.scss';

function App() {
  return (
    <div className="container">
      <Header />
      <SearchRedults />
      <Recipe />
    </div>
  );
}

export default App;
