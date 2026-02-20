import axios from 'axios';

// API Configuration
const API_URL = import.meta.env.VITE_WOOCOMMERCE_API_URL || 'https://mock.api/wp-json/wc/v3';
const CONSUMER_KEY = import.meta.env.VITE_WOOCOMMERCE_KEY || 'mock_key';
const CONSUMER_SECRET = import.meta.env.VITE_WOOCOMMERCE_SECRET || 'mock_secret';

// Axios Instance
const api = axios.create({
  baseURL: API_URL,
  params: {
    consumer_key: CONSUMER_KEY,
    consumer_secret: CONSUMER_SECRET,
  },
});

// Mock Data for Fallback
const MOCK_PRODUCTS = [
  { id: 1, name: "Ethereal Diamond Ring", price: 4500, regular_price: "4500", sale_price: "", categories: [{ id: 1, name: "Rings" }], images: [{ src: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=2070&auto=format&fit=crop" }], description: "A stunning diamond ring." },
  { id: 2, name: "Celestial Gold Necklace", price: 2800, regular_price: "2800", sale_price: "", categories: [{ id: 2, name: "Necklaces" }], images: [{ src: "https://images.unsplash.com/photo-1599643478518-17488fbbcd75?q=80&w=2070&auto=format&fit=crop" }], description: "Elegant gold necklace." },
  { id: 3, name: "Starlight Earrings", price: 1200, regular_price: "1200", sale_price: "", categories: [{ id: 3, name: "Earrings" }], images: [{ src: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=2070&auto=format&fit=crop" }], description: "Sparkling earrings." },
  { id: 4, name: "Orion Sapphire Bracelet", price: 3400, regular_price: "3400", sale_price: "", categories: [{ id: 4, name: "Bracelets" }], images: [{ src: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=2070&auto=format&fit=crop" }], description: "Luxury sapphire bracelet." },
  { id: 5, name: "Luna Pearl Pendant", price: 950, regular_price: "950", sale_price: "", categories: [{ id: 2, name: "Necklaces" }], images: [{ src: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=2070&auto=format&fit=crop" }], description: "Timeless pearl pendant." },
  { id: 6, name: "Solaris Gold Band", price: 1800, regular_price: "1800", sale_price: "", categories: [{ id: 1, name: "Rings" }], images: [{ src: "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?q=80&w=2080&auto=format&fit=crop" }], description: "Classic gold band." },
];

// Product Service
export const productService = {
  getAll: async () => {
    // In a real app, we would call the API:
    // const response = await api.get('/products');
    // return response.data;
    
    // For now, return mock data
    return new Promise((resolve) => {
      setTimeout(() => resolve(MOCK_PRODUCTS), 800);
    });
  },

  getById: async (id: number) => {
    // const response = await api.get(`/products/${id}`);
    // return response.data;
    
    return new Promise((resolve) => {
      const product = MOCK_PRODUCTS.find(p => p.id === Number(id));
      setTimeout(() => resolve(product), 500);
    });
  },

  getByCategory: async (category: string) => {
    // const response = await api.get(`/products?category=${category}`);
    // return response.data;
    
    return new Promise((resolve) => {
      const filtered = category === 'All' 
        ? MOCK_PRODUCTS 
        : MOCK_PRODUCTS.filter(p => p.categories.some(c => c.name === category));
      setTimeout(() => resolve(filtered), 600);
    });
  }
};

// Cart Service (Placeholder for server-side cart)
export const cartService = {
  sync: async (cartItems: any[]) => {
    // await api.post('/cart/sync', { items: cartItems });
    console.log('Syncing cart with server:', cartItems);
  }
};

export default api;
