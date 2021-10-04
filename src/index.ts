const urlApi = "https://restcountries.com/v2/all";
const allCountrysKey = "Countries";
const lastTime = "lastTime";
const sevenDays = 604800000;
const time = new Date().getTime();

interface regionalBlocs {
  name: string;
}

interface ICountry {
  name: string;
  population: number;
  regionalBlocs: Array<regionalBlocs>;
  area: number;
}

function filterCountries(countries: ICountry[]) {
  countries = countries
    .filter(
      (el: ICountry): boolean =>
        el.regionalBlocs !== undefined &&
        el.regionalBlocs.find((findEl: regionalBlocs) =>
          findEl.name.includes("European Union")
        ) !== undefined
    )
    .filter((el: ICountry): boolean => !el.name.includes("a"))
    .sort(
      (a: ICountry, b: ICountry): number =>
        a.population / a.area - b.population / b.area
    )
    .reverse();

  countries.pop();

  const populationArray: Array<number> = countries.map(
    (el: ICountry): number => el.population
  );

  populationArray.reduce((a: number, b: number): number => a + b, 0) > 500000000
    ? console.log(
        "Zsumowana populacja pięciu najgęściej zaludnionych państw uzyskanych z wcześniejszych operacji jest większa od 500 milionów"
      )
    : console.log(
        "Zsumowana populacja pięciu najgęściej zaludnionych państw uzyskanych z wcześniejszych operacji nie jest większa od 500 milionów"
      );
  console.log(populationArray.reduce((a, b) => a + b, 0));

  console.log(countries);
}

function comparison(data: ICountry[], prevData: ICountry[]) {
  console.log("func comparison is running");
  let filtered = data.filter((el: ICountry) => {
    const prevCountryData = prevData.find(
      (prevEl: ICountry) => prevEl.name === el.name
    )!;

    return el.population !== prevCountryData.population;
  });

  for (let el of filtered) {
    console.log(el.name);
  }
}

function fetchData(): Promise<ICountry[]> | void {
  fetch(urlApi)
    .then((res) => res.json())
    .then((data: ICountry[]) => {
      const prevData = JSON.parse(localStorage.getItem(allCountrysKey)!);

      localStorage.setItem(allCountrysKey, JSON.stringify(data));
      localStorage.setItem(lastTime, JSON.stringify(new Date().getTime()));

      if (prevData) {
        comparison(data, prevData);
      }
      filterCountries(data);
    });
}

function checkfetchData(): void {
  if (
    !localStorage.getItem("Countries") ||
    time - Number(localStorage.getItem("lastTime")) > sevenDays
  ) {
    fetchData();
  }
}

checkfetchData();
