const urlParams = new URLSearchParams(window.location.search);
const category = urlParams.get('category');
const country = urlParams.get('country');

function fetchRecipesByCategoryOrCountry() {
  const endpoint = category
    ? `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
    : `https://www.themealdb.com/api/json/v1/1/filter.php?a=${country}`;

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
  categoryName.textContent = category || country;

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

fetchRecipesByCategoryOrCountry();