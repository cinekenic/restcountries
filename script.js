const urlApi = "https://restcountries.com/v2/all";
const allCountysKey = "Countries";
const lastTime = "lastTime";
const sevenDays = 604800000;
const time = new Date().getTime();

let resFilter;
function dataFromFetch() {
  fetch(urlApi)
    .then((res) => res.json())
    .then((res) => {
      const data = res;

      localStorage.setItem(allCountysKey, JSON.stringify(data));

      const prevData = JSON.parse(localStorage.getItem(allCountysKey));
      localStorage.setItem(lastTime, JSON.stringify(new Date().getTime()));
      function comparison() {
        console.log("func comparison is runing");
        const ids = prevData.map((e) => e.population);
        let filtered = data.filter((e) => !ids.includes(e.population));
        for (let el of filtered) {
          console.log(el.name);
        }
      }
      comparison();
    });
}

function checkExistDataFromFetch() {
  if (!localStorage.getItem("Countries")) {
    dataFromFetch();
  }
}

checkExistDataFromFetch();

function downladAfterSevenDays() {
  let newTime = time - localStorage.lastTime;
  if (newTime > sevenDays) {
    console.log("data download after seven days");
    dataFromFetch();
  }
}

downladAfterSevenDays();
