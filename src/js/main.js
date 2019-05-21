function displayCountries() {

    const card = document.querySelector(".card");
    
    fetch('https://restcountries.eu/rest/v2/all')
        .then(response => {
            return response.json();
        })
        .then(data => {
          
            data.forEach(country => {

                //create container for each country
                let div = document.createElement("div")
                div.setAttribute("class", "card__container")
                
                //append country flag
                let img = document.createElement('img')
                img.setAttribute("class", "card__img")
                img.src = country.flag
                div.append(img)
                card.append(div);
                
                //append country name 
                let countryName = document.createElement('h3')
                countryName.setAttribute("class", "card__name")
                countryName.append(country.name)
                div.append(countryName);
                card.append(div);
                
                //append country information
                let info = document.createElement('h4')
                info.setAttribute("class", "card__info")
                info.append(`Population: ${country.population}`);
                div.append(info);
                card.append(div);

            });
        })
};

displayCountries();
