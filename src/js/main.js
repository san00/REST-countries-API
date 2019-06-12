const url = "https://restcountries.eu/rest/v2/all";
const countries = [];
const input = document.querySelector(".searchbar__input");

fetch(url)
  .then(response => {
    return response.json();
  })
  .then(data => {
    countries.push(...data);
    displayCountries([]);
  }).catch(error => console.error(error));

//Filter & match country based on searchbar input.
//Creates a new array with the filtered results.

function matchCountry() {
  let userInput = input.value;
  matchedCountry = countries.filter(place => {
    //check if search term matches any countries
    const regex = new RegExp(userInput, "gi"); //global match, ignore case
    return place.name.match(regex);
  });
  //pass filtered results to displayCountry
  displayCountries(matchedCountry);

}

//Display all countries using countries array

function displayCountries(results) {
  const card = document.querySelector(".card");

  //clears the display of all flags & appends the matched country.
  card.innerHTML = " ";

  //if user searches for a country, 
  //return the matched result and update DOM to show that country, 
  //else display all countries.
  let value = [];
  //check whether to display all countries
  if (results.length < 1) {
    value = countries;
  } else {
    value = results;
  }

  value.forEach(country => {
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

    let capital = document.createElement("p");
    capital.setAttribute("class", "card__desc");
    capital.append(country.capital);
    div.append(capital);
    card.append(div);
  });

}

input.addEventListener("keydown", matchCountry);
input.addEventListener("change", matchCountry);








