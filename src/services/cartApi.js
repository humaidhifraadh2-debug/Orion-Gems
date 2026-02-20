import axios from "axios";

const BASE_URL = "https://dev-oriongems.pantheonsite.io/wp-json/wc/store/v1";

axios.defaults.withCredentials = true;

// Get Cart
export const getCart = async () => {
  const response = await axios.get(`${BASE_URL}/cart`);
  return response.data;
};

// Add to Cart
export const addToCart = async (productId, quantity = 1) => {
  const response = await axios.post(`${BASE_URL}/cart/add-item`, {
    id: productId,
    quantity,
  });
  return response.data;
};

// Remove from Cart
export const removeFromCart = async (itemKey) => {
  const response = await axios.post(`${BASE_URL}/cart/remove-item`, {
    key: itemKey,
  });
  return response.data;
};
