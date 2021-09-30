const urlApi = "https://restcountries.com/v2/all";
const allCountysKey = "Countries";
const lastTime = "lastTime";
const sevenDays = 604800000;
const time = new Date().getTime();

function filterCountries(countries) {
  console.log(
    countries
      .filter(
        (el) =>
          el.regionalBlocs &&
          el.regionalBlocs[0].name.includes("European Union")
      )
      .filter((el) => !el.name.includes("a"))
      .sort((a, b) => {
        a.population - b.population;
      })
      .reverse()
  );
}

function comparison(data, prevData) {
  console.log("func comparison is runing");
  const ids = prevData.map((e) => e.population);
  let filtered = data.filter((e) => !ids.includes(e.population));
  for (let el of filtered) {
    console.log(el.name);
  }
}

function dataFromFetch() {
  fetch(urlApi)
    .then((res) => res.json())
    .then((res) => {
      const data = res;

      localStorage.setItem(allCountysKey, JSON.stringify(data));

      const prevData = JSON.parse(localStorage.getItem(allCountysKey));
      localStorage.setItem(lastTime, JSON.stringify(new Date().getTime()));

      comparison(data, prevData);
      filterCountries(data);
    });
}

function checkExistDataFromFetch() {
  if (!localStorage.getItem("Countries")) {
    dataFromFetch();
  }
}

checkExistDataFromFetch();

function downladAfterSevenDays() {
  let newTime = time - localStorage.getItem("lastTime");
  if (newTime > sevenDays) {
    console.log("data download after seven days");
    dataFromFetch();
  }
}

downladAfterSevenDays();
