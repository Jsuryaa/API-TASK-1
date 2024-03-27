function fetchData(url) {
    return new Promise((resolve, reject) => {
      fetch(url)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => resolve(data))
        .catch((error) => reject(error));
    });
  }

  function displayData(data) {
    const dataContainer = document.getElementById("dataContainer");
    dataContainer.innerHTML = "";

    data.forEach((country) => {
      const countryCard = document.createElement("div");
      countryCard.classList.add("col-md-4", "mb-4");

      const cardColor = getCardColor(country.cases);
      countryCard.innerHTML = `
            <div class="card h-100 bg-${cardColor}">
                <div class="card-body">
                    <h5 class="card-title">${country.country}</h5>
                    <p class="card-text">Cases: ${country.cases}</p>
                    <p class="card-text">Deaths: ${country.deaths}</p>
                    <p class="card-text">Recovered: ${country.recovered}</p>
                </div>
            </div>
        `;
      dataContainer.appendChild(countryCard);
    });
  }

  function getCardColor(cases) {
    if (cases > 500000) {
      return "danger";
    } else if (cases > 100000) {
      return "warning";
    } else {
      return "success";
    }
  }

  function searchCountry() {
    const searchInput = document
      .getElementById("searchInput")
      .value.toLowerCase();
    const filteredData = globalData.filter((country) =>
      country.country.toLowerCase().includes(searchInput)
    );
    displayData(filteredData);
  }

  window.onload = function () {
    fetchData("https://disease.sh/v3/covid-19/countries")
      .then((data) => {
        globalData = data;
        displayData(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  };

  document
    .getElementById("searchButton")
    .addEventListener("click", searchCountry);

  document
    .getElementById("searchInput")
    .addEventListener("keypress", function (e) {
      if (e.key === "Enter") {
        searchCountry();
      }
    });