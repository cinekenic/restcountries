"use strict";
const urlApi = "https://restcountries.com/v2/all";
const allCountrysKey = "Countries";
const lastTime = "lastTime";
const sevenDays = 604800000;
const time = new Date().getTime();
function filterCountries(countries) {
    countries = countries
        .filter((el) => el.regionalBlocs !== undefined &&
        el.regionalBlocs.find((findEl) => findEl.name.includes("European Union")) !== undefined)
        .filter((el) => !el.name.includes("a"))
        .sort((a, b) => a.population / a.area - b.population / b.area)
        .reverse();
    countries.pop();
    console.log(countries);
    const populationArray = countries.map((el) => el.population);
    populationArray.reduce((a, b) => a + b, 0) > 500000000
        ? console.log("Zsumowana populacja pięciu najgęściej zaludnionych państw uzyskanych z wcześniejszych operacji jest większa od 500 milionów")
        : console.log("Zsumowana populacja pięciu najgęściej zaludnionych państw uzyskanych z wcześniejszych operacji nie jest większa od 500 milionów");
    console.log(populationArray.reduce((a, b) => a + b, 0));
    console.log(countries);
}
function comparison(data, prevData) {
    console.log("func comparison is running");
    let filtered = data.filter((el) => {
        const prevCountryData = prevData.find((prevEl) => prevEl.name === el.name);
        return el.population !== prevCountryData.population;
    });
    for (let el of filtered) {
        console.log(el.name);
    }
}
function fetchData() {
    fetch(urlApi)
        .then((res) => res.json())
        .then((data) => {
        const prevData = JSON.parse(localStorage.getItem(allCountrysKey));
        localStorage.setItem(allCountrysKey, JSON.stringify(data));
        localStorage.setItem(lastTime, JSON.stringify(new Date().getTime()));
        if (prevData) {
            comparison(data, prevData);
        }
        filterCountries(data);
    });
}
function checkfetchData() {
    if (!localStorage.getItem("Countries") ||
        time - Number(localStorage.getItem("lastTime")) > sevenDays) {
        fetchData();
    }
}
checkfetchData();
function sum(a, b) {
    return a;
}
sum(2, 2);
sum("2", 2);
