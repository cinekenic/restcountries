const allCountysKey = "Countries";
const sevenDays = 604800000;
const time = new Date().getTime();

function dataFromFetch() {
  fetch(
    "http://api.countrylayer.com/v2/all?access_key=25dd99021bdb701631851215e7885201"
  )
    .then((res) => res.json())
    .then((res) => {
      const data = res;
      localStorage.setItem(allCountysKey, JSON.stringify(data));
      localStorage.setItem("lastTime", JSON.stringify(new Date().getTime(res)));
    });
}

function checkExistDataFromFetch() {
  if (!localStorage.getItem("Countries")) {
    dataFromFetch();
  }
}

checkExistDataFromFetch();

function getTime() {
  let newTime = time - localStorage.lastTime;
  if (newTime > sevenDays) {
    console.log("data download after seven days");
    dataFromFetch();
  }
}

getTime();
