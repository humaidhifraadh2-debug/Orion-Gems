import axios from "axios";

const BASE_URL = "https://dev-oriongems.pantheonsite.io//wp-json/wc/store/v1";

export const fetchProducts = async () => {
  const response = await axios.get(`${BASE_URL}/products`);
  return response.data;
};

export const fetchSingleProduct = async (id) => {
  const response = await axios.get(`${BASE_URL}/products/${id}`);
  return response.data;
};
