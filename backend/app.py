from flask import Flask, jsonify, request
import requests
from dotenv import load_dotenv
import os

# Load environment variables from .env file
load_dotenv()

app = Flask(__name__)

# Get the API key from the environment
API_KEY = os.getenv("SPOONACULAR_API_KEY")

@app.route('/recipes/<int:recipe_id>', methods=['GET'])
def get_recipe(recipe_id):
    response = requests.get(
        f"https://api.spoonacular.com/recipes/{recipe_id}/information?apiKey={API_KEY}"
    )
    if response.status_code == 200:
        return jsonify(response.json())
    else:
        return jsonify({"error": "Recipe not found"}), 404

@app.route('/recipes', methods=['POST'])
def create_recipe():
    data = request.json
    # Save the recipe to your database (mocked here)
    return jsonify({"message": "Recipe created", "data": data}), 201

if __name__ == '__main__':
    app.run(debug=True)
