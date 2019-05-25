const url = "https://restcountries.eu/rest/v2/all";
const countries = [];

fetch(url)
    .then(response => {
        return response.json();
    })
    .then(data => {
        countries.push(...data)
        return countries;

    }).then(displayCountries);


function displayCountries() {
    const card = document.querySelector(".card");
      countries.forEach(country => {

        //create container for each country
        let div = document.createElement("div")
        div.setAttribute("class", "card__container")
        
        //append flag
        let img = document.createElement('img')
        img.setAttribute("class", "card__img")
        img.src = country.flag;
        div.append(img)
        card.append(div);

        //append name 
        let countryName = document.createElement('h3')
        countryName.setAttribute("class", "card__name")
        countryName.append(country.name)
        div.append(countryName);
        card.append(div);
    })
}
