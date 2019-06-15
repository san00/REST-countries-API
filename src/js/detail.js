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

    const card = document.querySelector(".detailCard");

    let countryNameElement = document.createElement("h3");
    countryNameElement.setAttribute("class", "card__name");
    countryNameElement.append(country.name);
    div.append(countryNameElement);
    card.append(div);

    let flag = document.createElement("img");
    flag.setAttribute("class", "card__img");
    flag.src = country.flag;
    div.append(flag);
    card.append(div);

    let capital = document.createElement("p");
    capital.setAttribute("class", "card__capital");
    capital.append(`Capital:` + country.capital);
    div.append(capital);
    card.append(div);
}