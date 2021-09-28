const allCountysKey = "Countries";
fetch(
  "http://api.countrylayer.com/v2/all?access_key=25dd99021bdb701631851215e7885201"
)
  .then((res) => res.json())
  .then((res) => {
    const data = res;
    console.log(res);
    localStorage.setItem(allCountysKey, JSON.stringify(data));
  });
