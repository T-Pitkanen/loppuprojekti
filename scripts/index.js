// API 

//loin endpoint const jotta voidaan fetchata samanaikaisesti useista endpointeista
const endpoints = {
    random: 'https://www.themealdb.com/api/json/v1/1/random.php',
    countries: [
        { name: 'Italian', url: 'https://www.themealdb.com/api/json/v1/1/filter.php?a=Italian' },
        { name: 'Mexican', url: 'https://www.themealdb.com/api/json/v1/1/filter.php?a=Mexican' },
        { name: 'American', url: 'https://www.themealdb.com/api/json/v1/1/filter.php?a=American' },
        { name: 'Indian', url: 'https://www.themealdb.com/api/json/v1/1/filter.php?a=Indian' },
        { name: 'Chinese', url: 'https://www.themealdb.com/api/json/v1/1/filter.php?a=Chinese' },
 
    ],
    categories: [
        { name: 'Chicken', url: 'https://www.themealdb.com/api/json/v1/1/filter.php?c=Chicken' },
        { name: 'Beef', url: 'https://www.themealdb.com/api/json/v1/1/filter.php?c=Beef' },
        { name: 'Dessert', url: 'https://www.themealdb.com/api/json/v1/1/filter.php?c=Dessert' },
    ],
};

function renderRandomMeals(meals) {
    const container = document.querySelector('.recipes-container');
    container.innerHTML = '<h2>Discover</h2>';

    const section = document.createElement('div');
    section.classList.add('category-section'); 

    const sectionTitle = document.createElement('h3');
    section.appendChild(sectionTitle);

    const mealsContainer = document.createElement('div');
    mealsContainer.classList.add('meals-container');

    meals.forEach((meal) => {
        const card = document.createElement('div');
        card.classList.add('meal-card');
        card.innerHTML = `
            <a href="pages/recipe.html?id=${meal.idMeal}">
                <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
                <p>${meal.strMeal}</p>
            </a>
        `;
        mealsContainer.appendChild(card);
    });

    section.appendChild(mealsContainer); 
    container.appendChild(section); 
}


function renderMealsByCountry(countries) {
    const container = document.querySelector('#categories-by-country .country-container');

    countries.forEach((country) => {
        const section = document.createElement('div');
        section.classList.add('category-section'); 

        const sectionTitle = document.createElement('h3');
        sectionTitle.textContent = country.name;
        section.appendChild(sectionTitle);

        const mealsContainer = document.createElement('div');
        mealsContainer.classList.add('meals-container'); 

        country.meals.slice(0, 5).forEach((meal) => {
            const card = document.createElement('div');
            card.classList.add('meal-card');
            card.innerHTML = `
                <a href="pages/recipe.html?id=${meal.idMeal}">
                    <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
                    <p>${meal.strMeal}</p>
                </a>
            `;
            mealsContainer.appendChild(card); 
        });

        section.appendChild(mealsContainer); 
        container.appendChild(section);
    });
}


function renderMealsByCategory(categories) {
    const container = document.querySelector('#categories .categories-container');

    categories.forEach((category) => {
        const section = document.createElement('div');
        section.classList.add('category-section'); 

        const categoryTitle = document.createElement('h3');
        categoryTitle.textContent = category.name;
        section.appendChild(categoryTitle);

        const mealsContainer = document.createElement('div');
        mealsContainer.classList.add('meals-container');

        category.meals.slice(0, 5).forEach((meal) => {
            const card = document.createElement('div');
            card.classList.add('meal-card');
            card.innerHTML = `
                <a href="pages/recipe.html?id=${meal.idMeal}">
                    <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
                    <p>${meal.strMeal}</p>
                </a>
            `;
            mealsContainer.appendChild(card);
        });

        section.appendChild(mealsContainer);
        container.appendChild(section);
    });
}

async function fetchAndDisplayData() {
    try {
        const randomMeals = await Promise.all(
            Array.from({ length: 5 }, () =>
                fetch(endpoints.random)
                    .then((res) => res.json())
                    .then((data) => data.meals[0])
            )
        );
        renderRandomMeals(randomMeals);

        const countryData = await Promise.all(
            endpoints.countries.map((country) =>
                fetch(country.url)
                    .then((res) => res.json())
                    .then((data) => ({ name: country.name, meals: data.meals }))
            )
        );
        renderMealsByCountry(countryData);

        const categoryData = await Promise.all(
            endpoints.categories.map((category) =>
                fetch(category.url)
                    .then((res) => res.json())
                    .then((data) => ({ name: category.name, meals: data.meals }))
            )
        );
        renderMealsByCategory(categoryData);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

fetchAndDisplayData();
