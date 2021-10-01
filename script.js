const urlApi = "https://restcountries.com/v2/all";
const allCountysKey = "Countries";
const lastTime = "lastTime";
const sevenDays = 604800000;
const time = new Date().getTime();

function filterCountries(countries) {
  countries = countries
    .filter(
      (el) =>
        el.regionalBlocs &&
        el.regionalBlocs.find((findEl) =>
          findEl.name.includes("European Union")
        )
    )
    .filter((el) => !el.name.includes("a"))
    .sort((a, b) => a.population - b.population)
    .reverse();
  console.log(countries);
}

function comparison(data, prevData) {
  console.log("func comparison is runing");
  let filtered = data.filter((el) => {
    const prevCountryData = prevData.find((prevEl) => prevEl.name === el.name);
    return el.population !== prevCountryData.population;
  });

  for (let el of filtered) {
    console.log(el.name);
  }
}

function dataFromFetch() {
  fetch(urlApi)
    .then((res) => res.json())
    .then((data) => {
      const prevData = JSON.parse(localStorage.getItem(allCountysKey));

      localStorage.setItem(allCountysKey, JSON.stringify(data));
      localStorage.setItem(lastTime, JSON.stringify(new Date().getTime()));

      if (prevData) {
        comparison(data, prevData);
      }
      filterCountries(data);
    });
}

function checkDataFromFetch() {
  if (
    !localStorage.getItem("Countries") ||
    time - localStorage.getItem(lastTime) > sevenDays
  ) {
    dataFromFetch();
  }
}

checkDataFromFetch();
