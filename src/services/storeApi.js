import axios from "axios";

const BASE_URL = "https://dev-oriongems.pantheonsite.io/wp-json/wc/store/v1";

axios.defaults.withCredentials = true;

export const fetchProducts = async (category = "All") => {
  let url = `${BASE_URL}/products`;

  if (category && category !== "All") {
    url += `?category=${category.toLowerCase()}`;
  }

  const response = await axios.get(url);
  return response.data;
};
