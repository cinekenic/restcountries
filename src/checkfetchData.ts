import { lastTime, dataToStorage } from "./dataToStorage";
import { ICountry, fetchData } from "./fetchData";

const sevenDays = 604800000;
const time = new Date().getTime();

export async function checkfetchData() {
  if (window !== undefined) {
    if (
      !localStorage.getItem("Countries") ||
      time - Number(localStorage.getItem(lastTime)) > sevenDays
    ) {
      let data: any = await fetchData();

      // console.log("checkfetchData", data);
      console.log("checkfetchData");
      dataToStorage(data["data"]);
    }
  }

  return true;
}
