import { useEffect, useState } from 'react'
import './App.css'
import RecInfo from './components/RecInfo';
const ACCESS_KEY = import.meta.env.VITE_APP_API_KEY;

function App() {
  const [list, setList] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [num, setNum] = useState(10);
  let URL = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${ACCESS_KEY}&number=${num}`;

  // const [recipes, setRecipes] = useState([]);
  useEffect(() => {
    const fetchAllRecipes = async () => {
      if (searchQuery.length > 0) {
        URL += `&query=${searchQuery}`;
      }
      const response = await fetch(URL);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const json = await response.json();
      console.log(json);
      setList(json.results);

    }
    fetchAllRecipes().catch((error) => {
      console.error('Error fetching data:', error);
    });
  }, [searchQuery, num]);

  
  return (
    <div className='whole-page'>
    <h1 className='title'>Recipes</h1>
    <input
      type="text"
      placeholder="Search for a recipe..."
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
    />
    
    {list && list.length > 0 && (
      <div className="slider-container">
        <label htmlFor="num-slider">Number of Recipes: {num}</label>
        <input
          id="num-slider"
          type="range"
          min="1"
          max="20"
          value={num}
          onChange={(e) => setNum(Number(e.target.value))}
        />
      </div>
    )}
    {/* <RecInfo recipes={list} searchQuery={searchQuery}/> */}

    <div className='recipes'>
      {list && list.map((recipe) => (
        <div className='recipe' key={recipe.id}>
          <img src={recipe.image} alt={recipe.title} width='200px' />
          <h3>{recipe.title}</h3>
          <a href={`https://spoonacular.com/recipes/${recipe.title}-${recipe.id}`} target="_blank" rel="noopener noreferrer">View Recipe</a>
          
        </div>
      ))}
    </div>
    <footer className='footer'>Made with ❤️ by Hieu Nguyen</footer>
  </div>
  )
}

export default App
