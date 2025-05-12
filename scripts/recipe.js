// otetaan URL:sta reseptin id ja tallennetaan se
const urlParams = new URLSearchParams(window.location.search);
const recipeId = urlParams.get('id');

// fetchataan resepti kyseisen id:n avulla
function fetchRecipeDetails(id) {
	fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
		.then((res) => {
			if (!res.ok) {
				throw new Error('Failed to fetch recipe details');
			}
			return res.json();
		})
		.then((data) => {
			// array jossa on meidä resepti
			const recipe = data.meals[0];
			// resepti renderöidään
			renderRecipeDetails(recipe);
		})
		.catch((error) => console.error('Error fetching recipe details:', error));
}

// renderöidään kyseisen reseptin tiedot
function renderRecipeDetails(recipe) {
	const recipeContainer = document.querySelector('.recipe-container');
	recipeContainer.innerHTML = `
        <h3>${recipe.strMeal}</h3>
        <img src="${recipe.strMealThumb}" alt="${recipe.strMeal}" />
        <p><strong>Category:</strong> ${recipe.strCategory}</p>
        <p><strong>Area:</strong> ${recipe.strArea}</p>
        <p><strong>Instructions:</strong> ${recipe.strInstructions}</p>
        <h4>Ingredients:</h4>
        <ul>
            ${Object.keys(recipe)
							.filter((key) => key.startsWith('strIngredient') && recipe[key])
							.map(
								(key) =>
									`<li>${recipe[key]} - ${
										recipe[`strMeasure${key.slice(13)}`]
									}</li>`
							)
							.join('')}
        </ul>
    `;
}

// fetch & display
if (recipeId) {
	fetchRecipeDetails(recipeId);
}
