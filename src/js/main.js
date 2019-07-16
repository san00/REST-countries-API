const url = "https://restcountries.eu/rest/v2/all";
const countries = [];
const input = document.querySelector(".searchbar__input");
const countryRegion = document.querySelectorAll("[data-country]");

fetch(url)
  .then(response => {
    return response.json();
  })
  .then(data => {
    countries.push(...data);
    displayAllCountries([]);
  }).catch(error => console.error(error));

//Filter & match countries

function matchCountry() {
  let userInput = input.value;
  matchedCountry = countries.filter(place => {
    const regex = new RegExp(userInput, "gi");
    return place.name.match(regex);
  });
  displayAllCountries(matchedCountry);
}

function filterCountriesByRegion() {
  const worldRegion = this.dataset.country;
  regionArray = countries.filter(country => {
    const regex = new RegExp(worldRegion, "gi");
    return country.region.match(regex);
  });
  displayAllCountries(regionArray);
}


function displayAllCountries(results, regionW) {
  const card = document.querySelector(".cards");
  card.innerHTML = " ";

  let value = [];

  if (results.length < 1) {
    value = countries;
  } else if (results.length >= 1) {
    value = results;
  }
  else {
    value = regionW;
  };

  value.forEach(country => {
    //create container for each country
    let div = document.createElement("div");
    div.setAttribute("class", "cards__container");
    div.setAttribute("href", "detail.html?name=" + country.name);

    //append flag
    let img = document.createElement("img");
    img.setAttribute("class", "cards__img");
    img.src = country.flag;
    div.append(img);
    card.append(div);

    //append name
    let countryName = document.createElement("h3");
    countryName.setAttribute("class", "cards__name");
    div.append(countryName);

    let capital = document.createElement("p");
    capital.setAttribute("class", "cards__desc");
    capital.append(`Capital: ${country.capital}`);
    div.append(capital);
    card.append(div);

    let region = document.createElement("p");
    region.setAttribute("class", "cards__desc");
    region.append(`Region: ${country.region}`);
    div.append(region);
    card.append(div);


    let detaillink = document.createElement("a");
    detaillink.setAttribute("href", "detail.html?name=" + country.name);
    detaillink.setAttribute("class", "card__link-to-detail-page");
    detaillink.append(country.name);
    countryName.append(detaillink);
  });

}

input.addEventListener("keydown", matchCountry);
input.addEventListener("change", matchCountry);
countryRegion.forEach(button => button.addEventListener("click", filterCountriesByRegion));