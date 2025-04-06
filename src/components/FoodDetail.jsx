import React, { Component, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
const API_KEY = import.meta.env.VITE_APP_API_KEY;
import './FoodDetail.css';
import FoodChart from "./FoodChart";
import NutritionBarChart from "./NutritionBarChart";

const FoodDetail = () => {
  let params = useParams();
  const [fullDetails, setFullDetails] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFullDetails = async () => {
      try {
        if (!API_KEY) {
          throw new Error("API key is missing. Please check your environment configuration.");
        }
        console.log("Route parameters:", params); // Debugging log
        if (!params.name) {
          throw new Error("Recipe ID is missing from the route parameters.");
        }
        console.log("Fetching details for recipe ID:", params.name); // Debugging log
        const response = await fetch(
          `https://api.spoonacular.com/recipes/${params.name}/information?apiKey=${API_KEY}`
        );
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.statusText}`);
        }
        const json = await response.json();
        if (!json || !json.id) {
          throw new Error("Invalid data received from the API.");
        }
        
        setFullDetails(json);
        console.log("Fetched full details:", fullDetails); // Debugging log
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error.message);
      }
    };
    fetchFullDetails();
  }, [params.name]);

  return (
    <div className="food-detail">
      {error ? (
        <p className="error-message">Failed to load food details: {error}</p>
      ) : (
        fullDetails && (
          <div className="details-container">
            <h1>{fullDetails.title}</h1>
            <img src={fullDetails.image} alt={fullDetails.title} />
            <p dangerouslySetInnerHTML={{ __html: fullDetails.summary }}></p>
            <h2>Ingredients:</h2>
            <ul>
              {fullDetails.extendedIngredients.map((ingredient) => (
                <li key={ingredient.id}>{ingredient.original}</li>
              ))}
            </ul>
            <h2>Instructions:</h2>
            {fullDetails.analyzedInstructions.length > 0 ? (
              <ol>
                {fullDetails.analyzedInstructions[0].steps.map((step) => (
                  <li key={step.number}>{step.step}</li>
                ))}
              </ol>
            ) : (
              <p>No instructions available.</p>
            )}
            <h2>Nutrition Information:</h2>
            <div className="nutrition-chart">
              <FoodChart recipeId={params.name} />
            </div>
            <h2>Daily Nutritional Comparison:</h2>
            <div className="nutrition-bar-chart">
              <NutritionBarChart recipeId={params.name} />
            </div>
          </div>
        )
      )}
      
    </div>
  );
};

export default FoodDetail;


