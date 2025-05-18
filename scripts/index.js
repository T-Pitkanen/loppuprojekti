//loin endpoint objektin jotta voidaan fetchata samanaikaisesti useista endpointeista
const endpoints = {
  random: "https://www.themealdb.com/api/json/v1/1/random.php",
  countries: [
    {
      name: "Italian",
      url: "https://www.themealdb.com/api/json/v1/1/filter.php?a=Italian",
    },
    {
      name: "Mexican",
      url: "https://www.themealdb.com/api/json/v1/1/filter.php?a=Mexican",
    },
    {
      name: "American",
      url: "https://www.themealdb.com/api/json/v1/1/filter.php?a=American",
    },
    {
      name: "Indian",
      url: "https://www.themealdb.com/api/json/v1/1/filter.php?a=Indian",
    },
    {
      name: "Chinese",
      url: "https://www.themealdb.com/api/json/v1/1/filter.php?a=Chinese",
    },
  ],
  categories: [
    {
      name: "Chicken",
      url: "https://www.themealdb.com/api/json/v1/1/filter.php?c=Chicken",
    },
    {
      name: "Beef",
      url: "https://www.themealdb.com/api/json/v1/1/filter.php?c=Beef",
    },
    {
      name: "Dessert",
      url: "https://www.themealdb.com/api/json/v1/1/filter.php?c=Dessert",
    },
  ],
};



// discover kohdan renderöinti johon halusin 5 randomia reseptiä
function renderRandomMeals(meals) {

  // container discover resepteille
  const container = document.querySelector(".recipes-container");

  // luodaan jokaiselle reseptille oma section
  const section = document.createElement("div");
  section.classList.add("category-section");

  // title jokaiselle reseptille
  const sectionTitle = document.createElement("h3");
  section.appendChild(sectionTitle);

  // toinen container
  const mealsContainer = document.createElement("div");
  mealsContainer.classList.add("meals-container");

  // loopataan reseptien läpi ja luodaan jokaiselle card temnplate ja täytetään se APIsta saatavilla tiedoilla
  meals.forEach((meal) => {
    //luodaan card
    const card = document.createElement("div");
    // annetaan sille meal-card class
    card.classList.add("meal-card");

    card.innerHTML = `
            <a href="pages/recipe.html?id=${meal.idMeal}">
                <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
                <p>${meal.strMeal}</p>
            </a>
        `;
    // lisätään jokainen card mealscontaineriin
    mealsContainer.appendChild(card);
  });

  //mealscontainer lisätään sectioniin ja section containeriin
  section.appendChild(mealsContainer);
  container.appendChild(section);
}





// reseptit maittain
function renderMealsByCountry(countries) {
  //sisältö
  const container = document.querySelector(
    "#categories-by-country .country-container"
  );

  // looppaus 
  countries.forEach((country) => {

    // luodaan jokaiselle maalle oma section
    const section = document.createElement("div");
    section.classList.add("category-section");


    // jokaisen maan otsikko
    const sectionTitle = document.createElement("h3");
    sectionTitle.textContent = country.name;
    section.appendChild(sectionTitle);

    //container resepteille
    const mealsContainer = document.createElement("div");
    mealsContainer.classList.add("meals-container");

    // looppaus ja valitaan 5 reseptiä
    country.meals.slice(0, 5).forEach((meal) => {
      const card = document.createElement("div");
      // lisätään meal-card class
      card.classList.add("meal-card");
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

// reseptit kategorioittain
function renderMealsByCategory(categories) {
  //sisältö
  const container = document.querySelector("#categories .categories-container");

  //looppaus
  categories.forEach((category) => {

    // luodaan jokaiselle kategoriolle oma section
    const section = document.createElement("div");
    section.classList.add("category-section");

    // jokaisen kategorian otsikko
    const categoryTitle = document.createElement("h3");
    categoryTitle.textContent = category.name;
    section.appendChild(categoryTitle);

    //container resepteille
    const mealsContainer = document.createElement("div");
    mealsContainer.classList.add("meals-container");


    // looppaus ja valitaan 5 reseptiä
    category.meals.slice(0, 5).forEach((meal) => {
      const card = document.createElement("div");
      // lisätään meal-card class jokaiselle
      card.classList.add("meal-card");
      card.innerHTML = `
                <a href="loppuprojekti/pages/recipe.html?id=${meal.idMeal}">
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

//  haetaan data endpointista ja renderöidään se
// 5 satunnaista reseptiä, maat ja kategoriat
// käytetään async/await koska halutaan että kaikki data on haettu ennenkuin renderöidään

async function fetchAndDisplayData() {
  try {
    //random
    const randomMeals = await Promise.all(
      Array.from({ length: 5 }, () =>
        fetch(endpoints.random)
          .then((res) => res.json())
          .then((data) => data.meals[0])
      )
    );
    renderRandomMeals(randomMeals);

    //country
    const countryData = await Promise.all(
      endpoints.countries.map((country) =>
        fetch(country.url)
          .then((res) => res.json())
          .then((data) => ({ name: country.name, meals: data.meals }))
      )
    );


    renderMealsByCountry(countryData);


     //category
    const categoryData = await Promise.all(
      endpoints.categories.map((category) =>
        fetch(category.url)
          .then((res) => res.json())
          .then((data) => ({ name: category.name, meals: data.meals }))
      )
    );
    renderMealsByCategory(categoryData);

     //virheidenkäsittely
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}



fetchAndDisplayData();
