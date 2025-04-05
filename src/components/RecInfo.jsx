import React, { useEffect, useState } from "react";
const API_KEY = import.meta.env.VITE_APP_API_KEY;

const RecInfo = ({recipes, searchQuery}) => {
    
    useEffect(() => {
        const fetchRecipeInfo = async () => {
            try {
                // const response = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&query=${searchQuery}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                console.log(data);
                
            } catch (error) {
                console.error('Error fetching recipe info:', error);
            }
        };
        fetchRecipeInfo();
    },[searchQuery, num]);
    console.log(recipes);

    return (
        <div className="recipe-info">
            
            {recipes && recipes.map((recipe) => (
                <div key={recipe.id} className="recipe">
                    <img src={recipe.image} alt={recipe.title} width="200px" />
                    <h3>{recipe.title}</h3>
                    <p>Ready in {recipe.readyInMinutes} minutes</p>
                    <p>Servings: {recipe.servings}</p>
                    <a href={`https://spoonacular.com/recipes/${recipe.title}-${recipe.id}`} target="_blank" rel="noopener noreferrer">View Recipe</a>
                </div>
            ))}
        </div>
    );
}

export default RecInfo;