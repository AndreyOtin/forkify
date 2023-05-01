import SearchRedults from './components/search-results/SearchRedults';
import Recipe from './components/recipe/Recipe';
import Header from './components/header/Header';
import './sass/main.scss';
import { useAppContext } from './context/context';

function App() {
  const { status } = useAppContext()

  return (
    <div className="container">
      <Header />
      <SearchRedults key={status.recipes} />
      <Recipe />
    </div>
  );
}

export default App;
