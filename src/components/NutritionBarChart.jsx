import React, { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";

const NutritionBarChart = ({ recipeId }) => {
  const [nutritionData, setNutritionData] = useState(null);

  useEffect(() => {
    const fetchNutritionData = async () => {
      const API_KEY = import.meta.env.VITE_APP_API_KEY;
      const response = await fetch(
        `https://api.spoonacular.com/recipes/${recipeId}/nutritionWidget.json?apiKey=${API_KEY}`
      );
      const data = await response.json();
      setNutritionData(data);
    };

    fetchNutritionData();
  }, [recipeId]);

  if (!nutritionData) return <p>Loading...</p>;

  const chartData = [
    {
      name: "Protein",
      Recipe: parseInt(nutritionData.protein.replace("g", "")),
      RDI: 50,
    },
    {
      name: "Fat",
      Recipe: parseInt(nutritionData.fat.replace("g", "")),
      RDI: 70,
    },
    {
      name: "Carbohydrates",
      Recipe: parseInt(nutritionData.carbs.replace("g", "")),
      RDI: 300,
    },
  ];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="Recipe" fill="#8884d8" />
        <Bar dataKey="RDI" fill="#82ca9d" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default NutritionBarChart;
