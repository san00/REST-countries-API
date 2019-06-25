//query string
const urlParams = new URLSearchParams(window.location.search);

const countryName = urlParams.get("name");

const endpoint = "https://restcountries.eu/rest/v2/name/" + countryName;

fetch(endpoint)
    .then(response => {
        return response.json();
    })
    .then(countries => {
        const country = countries[0];
        displayCountryDetail(country);
    }).catch(error => console.error(error));


function displayCountryDetail(country) {
    let div = document.createElement("div");
    div.setAttribute("class", "card__container");

    const card = document.querySelector(".card");

    let flag = document.createElement("img");
    flag.setAttribute("class", "card__flag");
    flag.src = country.flag;
    div.append(flag);
    card.append(div);

    let countryNameElement = document.createElement("h4");
    countryNameElement.setAttribute("class", "card__name");
    countryNameElement.append(country.name);
    div.append(countryNameElement);

    let capital = document.createElement("p");
    capital.setAttribute("class", "card__capital");
    capital.append(`Capital: ${country.capital}`);
    div.append(capital);

    let nativeName = document.createElement("p");
    nativeName.setAttribute("class", "card__native-name");
    nativeName.append(`Native name: ${country.nativeName}`);
    div.append(nativeName);

    let population = document.createElement("p");
    population.setAttribute("class", "card__population");
    population.append(`Population: ${country.population}`);
    div.append(population);
}