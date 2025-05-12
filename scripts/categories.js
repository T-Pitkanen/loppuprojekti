// categories
function renderCategories(categories) {
    const container = document.querySelector('#categories .categories-container');
    container.innerHTML = '';

    categories.forEach((category) => {
        const card = document.createElement('div');
        card.classList.add('category-card');
        card.innerHTML = `
            <h3>${category.strCategory}</h3>
            <img src="${category.strCategoryThumb}" alt="${category.strCategory}" />
            <p>${category.strCategoryDescription.slice(0, 100)}...</p>
            <a href="index.html?category=${category.strCategory}">View Recipes</a>
        `;
        container.appendChild(card);
    });
}

// country
function renderCategoriesByCountry(countries) {
    const container = document.querySelector('#categories-by-country .country-container');
    container.innerHTML = '';

    countries.forEach((country) => {
        const card = document.createElement('div');
        card.classList.add('country-card');
        card.innerHTML = `
            <h3>${country.strArea}</h3>
            <a href="index.html?country=${country.strArea}">View Recipes</a>
        `;
        container.appendChild(card);
    });
}

// FETCH
fetch('https://www.themealdb.com/api/json/v1/1/categories.php')
    .then((res) => {
        if (!res.ok) {
            throw new Error('Failed to fetch categories');
        }
        return res.json();
    })
    .then((data) => {
        renderCategories(data.categories);
    })
    .catch((error) => console.error('Error fetching categories:', error));

fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list')
    .then((res) => {
        if (!res.ok) {
            throw new Error('Failed to fetch categories by country');
        }
        return res.json();
    })
    .then((data) => {
        renderCategoriesByCountry(data.meals);
    })
    .catch((error) => console.error('Error fetching categories by country:', error));
