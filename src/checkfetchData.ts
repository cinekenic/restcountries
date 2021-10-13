import { dataCheckLastTime, dataToStorage } from "./dataToStorage";
import { fetchData } from "./fetchData";

const sevenDays = 604800000;
const time = new Date().getTime();

export async function checkfetchData() {
  if (window !== undefined) {
    if (
      !localStorage.getItem("Countries") ||
      time - Number(localStorage.getItem(dataCheckLastTime)) > sevenDays
    ) {
      let data: any = await fetchData();

      console.log("checkfetchData");
      dataToStorage(data["data"]);
    }
  }

  return true;
}
