//query string
const urlParams = new URLSearchParams(window.location.search);
const countryName = urlParams.get("name");
const endpoint = "https://restcountries.eu/rest/v2/name/" + countryName;

fetch(endpoint).then(response => {
    return response.json();
})
    .then(countries => {
        const country = countries[0];
        displayCountryDetail(country);
        countries[0].borders.map(borderCountry => {
            return fetch(`https://restcountries.eu/rest/v2/alpha/${borderCountry}`)
                .then(data => {
                    return data.json();
                })
                .then(borderCountryInfo => {
                    displayBorderDetails(borderCountryInfo);
                })
        })
    }).catch(error => console.error(error));

const card = document.querySelector(".card");
let outerdiv = document.createElement("div");
outerdiv.setAttribute("class", "card__container");

let innerdiv = document.createElement("div");
innerdiv.setAttribute("class", "card__container-inner");


function displayCountryDetail(country) {

    let flag = document.createElement("img");
    flag.setAttribute("class", "card__flag");
    flag.src = country.flag;
    outerdiv.append(flag);
    card.append(outerdiv);

    let countryNameElement = document.createElement("h4");
    countryNameElement.setAttribute("class", "card__name");
    countryNameElement.append(country.name);
    outerdiv.append(countryNameElement);

    let countryStoryElement = document.createElement("p");
    countryStoryElement.setAttribute("class", "card__story");
    countryStoryElement.append(` ${country.name} is a country in ${country.subregion} with a population of ${country.population} people.
    The capital city is ${country.capital}, the local currency is the ${country.currencies[0].name} 
    and the main language spoken is ${country.languages[0].name}.
    Local time zone ${country.timezones} `);
    outerdiv.append(countryStoryElement);

    let titleElement = document.createElement("p");
    titleElement.setAttribute("class", "card__border-country-heading");
    titleElement.append(`Border countries:`);
    outerdiv.append(titleElement);
}


function displayBorderDetails(borderCountryInfo) {

    let borderCountryElement = document.createElement("div");
    borderCountryElement.setAttribute("class", "card__border-countries");
    innerdiv.append(borderCountryElement);
    outerdiv.append(innerdiv);

    let borderCountrylink = document.createElement("a");
    borderCountrylink.setAttribute("href", "detail.html?name=" + borderCountryInfo.name);
    borderCountrylink.setAttribute("class", "borderlink");
    borderCountrylink.append(`${borderCountryInfo.name}`);
    borderCountryElement.append(borderCountrylink);
}
