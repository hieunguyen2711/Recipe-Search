import React, { use, useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
const API_KEY = import.meta.env.VITE_APP_API_KEY;

const FoodChart = ({ recipeId }) => {
    const [nutritionData, setChartData] = useState(null);
    useEffect(() => {
        const fetchNutritionData = async () => {
            const response = await fetch(`https://api.spoonacular.com/recipes/${recipeId}/nutritionWidget.json?apiKey=${API_KEY}`);
            const data = await response.json();
            setChartData(data);
        };
        fetchNutritionData();
    }, [recipeId]);

    if (!nutritionData) return <p>Loading...</p>
    const chartData = [
        { name: "Protein", value: parseInt(nutritionData.protein.replace("g", "")) },
        { name: "Fat", value: parseInt(nutritionData.fat.replace("g", "")) },
        { name: "Carbohydrates", value: parseInt(nutritionData.carbs.replace("g", "")) },
    ];
    const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];
    return (
        <PieChart width={400} height={400}>
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={150}
            fill="#8884d8"
            label
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      );
};

export default FoodChart;

