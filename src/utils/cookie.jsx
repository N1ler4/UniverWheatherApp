import Cookies from "js-cookie";

export const getDataFromCookie = () => {
  return Cookies.get("Country");
};
export const setDataToCookie = (country) => {
  Cookies.set("Country", country);
};
