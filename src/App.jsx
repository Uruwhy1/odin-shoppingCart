import { useState, useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Outlet } from "react-router-dom";
import { NavBoxes } from "./components/NavBoxes";
import Cart from "./components/Cart";

export default function App() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [mode, setMode] = useState("light");
  const [view, setView] = useState("buy");

  // Set light/dark mode
  useEffect(() => {
    const userPrefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    if (userPrefersDark) {
      setMode("dark");
    }
  }, []);

  useEffect(() => {
    document.documentElement.className = mode;
  }, [mode]);

  // Load products from localStorage
  useEffect(() => {
    const storedProducts = localStorage.getItem("products");
    if (storedProducts) {
      setProducts(JSON.parse(storedProducts));
    } else {
      fetchItems();
    }
  }, []);

  // Save products to localStorage whenever they change
  useEffect(() => {
    if (products.length > 0) {
      localStorage.setItem("products", JSON.stringify(products));
    }
  }, [products]);

  // Fetch all items at once
  const fetchItems = async () => {
    try {
      const response = await fetch("https://fakestoreapi.com/products");
      const data = await response.json();

      const productsCartProperty = data.map((product) => ({
        ...product,
        inCart: 0,
      }));

      setProducts(productsCartProperty);
    } catch (error) {
      console.error("Error fetching products:", error);
      setError(error.message);
    }
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  // Add and remove products
  const updateProductInCart = (productId) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === productId
          ? { ...product, inCart: product.inCart + 1 }
          : product
      )
    );
  };

  const removeProductInCart = (productId) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === productId
          ? { ...product, inCart: product.inCart - 1 }
          : product
      )
    );
  };

  return (
    <div className="container">
      <Header mode={mode} setMode={setMode} setView={setView} />
      {view === "buy" && (
        <>
          <NavBoxes products={products} />
          <Outlet context={{ products, updateProductInCart }} />
        </>
      )}
      {view === "cart" && (
        <Cart
          products={products}
          setProducts={setProducts}
          updateProductInCart={updateProductInCart}
          removeProductInCart={removeProductInCart}
          setView={setView}
        />
      )}
      <Footer />
    </div>
  );
}
