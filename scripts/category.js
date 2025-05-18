const urlParams = new URLSearchParams(window.location.search);
const category = urlParams.get('category');

function fetchRecipesByCategory() {
  const endpoint = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`;

  fetch(endpoint)
    .then((res) => {
      if (!res.ok) {
        throw new Error('Failed to fetch recipes');
      }
      return res.json();
    })
    .then((data) => {
      renderRecipes(data.meals);
    })
    .catch((error) => console.error('Error fetching recipes:', error));
}

function renderRecipes(recipes) {
  const container = document.querySelector('.recipes-container');
  const categoryName = document.querySelector('#category-name');
  categoryName.textContent = category;

  container.innerHTML = recipes
    .map(
      (recipe) => `
      <div class="recipe-card">
        <a href="recipe.html?id=${recipe.idMeal}">
          <img src="${recipe.strMealThumb}" alt="${recipe.strMeal}" />
          <h3>${recipe.strMeal}</h3>
        </a>
      </div>
    `
    )
    .join('');
}

fetchRecipesByCategory();