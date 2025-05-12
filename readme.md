https://www.themealdb.com/api.php

API
Alustavasti käytin https://www.geeksforgeeks.org/javascript-fetch-method/ fetch templatea mutta ongelmaksi tuli, kun halusin hakea monesta eri endpointista ja en halunnut käyttää samaa templatea monta kertaa toistuvasti. Käytin tekoälyä kysyäkseni miten saan monta endpointia haettua saman aikaisesti ja vastaukseksi sain Promise.all ja endpointtien mappaus jota käytin lopullisessa koodissa. Löysin siitä vielä tämän linkin jonka kävin myös läpi: https://www.geeksforgeeks.org/how-to-fetch-an-array-of-urls-with-promise-all/

Sivun vaihto
Halusin että käyttäjä voisi klikata reseptiä ja se veisi kyseiselle reseptin sivulle. Tiesin että sen saa tehtyä käyttämällä urlSearchParams, jotta voin saada receptin ID:n urlista ja näin tehdä uuden fetch haun kyseisellä ID:llä, joka vie minut halutulle resepti sivulle. Otin mallia : https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams/get. Mallissa käytetään (document.location.search), mutta sain selville että minun pitää käyttää (window.location.search), koska olen selainympäristössä.
Tein uuden API Fetchin käyttämällä tallennettua ID:tä ja renderöin reseptin tiedot niin kuin index.html sivulla käyttäen index.js mallina. En kuitenkaan saanut aluksi ainesosa luetteloa toimimaan/näkymään joten käytin siinä tekoälyä.


Kategoria sivu
Tein myös sivun missä on näkyvissä kaikki kategoriat ja reseptit maiden perusteella. Otin mallia index.js mutta muutin tarvittavat esim url, innerhtml yms... 


