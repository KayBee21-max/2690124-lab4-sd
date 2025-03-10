document.getElementById("search-btn").addEventListener("click", () => {
    const countryName = document.getElementById("country-input").value;
    if (!countryName) return alert("Please enter a country name.");

    fetch(`https://restcountries.com/v3.1/name/${countryName}`)
        .then(response => response.json())
        .then(data => {
            const country = data[0];
            document.getElementById("country-info").innerHTML = `
                <h2>${country.name.common}</h2>
                <p><strong>Capital:</strong> ${country.capital}</p>
                <p><strong>Population:</strong> ${country.population}</p>
                <p><strong>Region:</strong> ${country.region}</p>
                <img src="${country.flags.png}" alt="Flag of ${country.name.common}" width="100">
            `;

            if (country.borders) {
                document.getElementById("bordering-countries").innerHTML = `<h3>Bordering Countries:</h3>`;
                country.borders.forEach(borderCode => {
                    fetch(`https://restcountries.com/v3.1/alpha/${borderCode}`)
                        .then(response => response.json())
                        .then(borderData => {
                            document.getElementById("bordering-countries").innerHTML += `
                                <p>${borderData[0].name.common} <img src="${borderData[0].flags.png}" width="50"></p>
                            `;
                        });
                });
            } else {
                document.getElementById("bordering-countries").innerHTML = "<p>No bordering countries.</p>";
            }
        })
        .catch(error => alert("Country not found!"));
});
