export default async function fetchItems (endpoint) {
  try {
    const response = await fetch(
      `${"https://fakestoreapi.com/products"}${endpoint}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching products:", error);
    return null;
  }
}