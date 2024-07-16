import { useState, useEffect } from "react";
import Header from "./components/Header";
import { Outlet } from "react-router-dom";
import { NavBoxes } from "./components/NavBoxes";

export default function App() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [mode, setMode] = useState("light")

  // Set light/dark mode
  useEffect(() => {
    const userPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (userPrefersDark) {
      setMode("dark");
    }
  }, []);

  useEffect(() => {
    document.documentElement.className = mode;
  }, [mode]);

  // Fetch all items at once
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
        setError(error.message);
      }
    };

    fetchItems();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container">
      <Header mode={mode} setMode={setMode} />
      <NavBoxes products={products} />
      <Outlet context={{ products }} />
    </div>
  );
}
