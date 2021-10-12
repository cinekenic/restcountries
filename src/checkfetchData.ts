import { lastTime, dataToStorage } from "./dataToStorage";
import { ICountry, fetchData } from "./fetchData";

const sevenDays = 604800000;
const time = new Date().getTime();

export async function checkfetchData() {
  if (
    !localStorage.getItem("Countries") ||
    time - Number(localStorage.getItem(lastTime)) > sevenDays
  ) {
    const data: ICountry[] = await fetchData();
    //console.log("checkfetchData", data);
    dataToStorage(data);
  }

  return true;
}
