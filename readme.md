# MealDB Reseptisovellus

Tämä projekti käyttää [TheMealDB API:a](https://www.themealdb.com/api.php) hakemaan ja näyttämään reseptejä kategorioittain ja maittain, sekä tarkastella yksittäin reseptien tietoja.
---

## 📁 

### `index.js`

Aluksi käytin fetch-menetelmän mallipohjaa [täältä](https://www.geeksforgeeks.org/javascript-fetch-method/), mutta halusin hakea tietoa useista eri endpointeista samanaikaisesti, enkä halunnut kopioida samaa koodia useaan kertaan.

Kysyin tekoälyltä, kuinka voisin hakea useista endpointeista samanaikaisesti ja myöhemmin löysin myös sivun mistä pystyin itsekkin siitä paremmin lukemaan.

Käytin näitä lähteitä:
- [geeksforgeeks](https://www.geeksforgeeks.org/how-to-fetch-an-array-of-urls-with-promise-all/)
- [RapidAPI](https://rapidapi.com/guides/fetch-data-multiple-apis-with-fetch)
- [digitalocean](https://www.digitalocean.com/community/tutorials/how-to-use-the-javascript-fetch-api-to-get-data)

---

### `recipe.js`

Halusin, että käyttäjä voi klikata reseptiä ja siirtyä kyseisen reseptin omaan sivuun. Tiesin, että tämän voi tehdä `URLSearchParams`-toiminnolla hakemalla reseptin ID:n URL-osoitteesta ja tekemällä uuden fetch-haun kyseisellä ID:llä.

Seurasin mallia [MDN:n dokumentaatiosta](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams/get). Esimerkissä käytettiin `document.location.search`, mutta huomasin, että selainympäristössä oikeampi vaihtoehto on `window.location.search`.

Loin uuden API-haun tallennetulla ID:llä ja renderöin reseptin tiedot samalla tavalla kuin `index.js`-tiedostossa. Ainesosalistan näyttäminen ei ollutkaan niin helppoa kuin luulin, joten käytin tekoälyä ongelman ratkaisuun.

---

### `category.js` & `categories.js`

Loin myös sivun, jossa näkyvät kaikki reseptikategoriat ja kategoriaa klikkaamalla, tulee uusi sivu, jolloin nähdään kaikki reseptit tästä kategoriasta . Käytin pohjana `index.js`- ja `recipe.js`-tiedoistoissa käyttämääni koodia , mutta muutin tarvittavat kohdat, kuten URL-osoitteet, `innerHTML` ja muita käyttöliittymän elementtejä.

Lähteitä:
- [RapidAPI](https://rapidapi.com/guides/fetch-data-multiple-apis-with-fetch)

---


