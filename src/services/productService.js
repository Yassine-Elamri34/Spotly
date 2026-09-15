const API_URL = import.meta.env.VITE_API_URL;
console.log("Spotly API:", API_URL);
export const getProducts = async () => {
  const response = await fetch(`${API_URL}/api/products`);

  if (!response.ok) {
    throw new Error("Unable to load products");
  }

  return await response.json();
};
export const searchProducts = async (searchTerm) => {
  const response = await fetch(
    `${API_URL}/api/ai/search?q=${encodeURIComponent(searchTerm)}`
  );

  if (!response.ok) {
    throw new Error("Unable to search products");
  }

  const data = await response.json();

  return data.products;
};