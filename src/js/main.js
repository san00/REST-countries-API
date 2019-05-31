const url = "https://restcountries.eu/rest/v2/all";
const countries = [];
let searchedCountry;
const input = document.querySelector(".searchbar__input");
input.addEventListener("keyup", updateSearchedCountry);

fetch(url)
  .then(response => {
    return response.json();
  })
  .then(data => {
    countries.push(...data);
    // console.log(countries);
    return countries;
  })
  .then(countries => {
    console.log(searchedCountry);
    return matchCountry(searchedCountry, countries);
  })
  .then(matchedCountry => {
    return displayCountries(matchedCountry);
  })
  .catch(error => console.error(error));


function updateSearchedCountry() {
    //updates search box value
  searchedCountry = input.value;
  return searchedCountry;
}

function matchCountry(searchedCountry, countries) {
  const matchedCountry = countries.filter(place => {
    //check if search term matches any countries
    const regex = new RegExp(searchedCountry, "gi"); //global match, ignore case
    return place.name.match(regex) && place.flag.match(regex);
  });
  return matchedCountry;
}

function displayCountries(matchedCountry) {
  const card = document.querySelector(".card");
  matchedCountry.forEach(country => {
    //create container for each country
    let div = document.createElement("div");
    div.setAttribute("class", "card__container");

    //append flag
    let img = document.createElement("img");
    img.setAttribute("class", "card__img");
    img.src = country.flag;
    div.append(img);
    card.append(div);

    //append name
    let countryName = document.createElement("h3");
    countryName.setAttribute("class", "card__name");
    countryName.append(country.name);
    div.append(countryName);
    card.append(div);
  });
}