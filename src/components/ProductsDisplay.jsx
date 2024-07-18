import { useOutletContext, useParams } from "react-router-dom";
import styles from "./ProductsDisplay.module.css";
import ProductCard from "./ProductCard";
import { useEffect, useState } from "react";

export function Category() {
  const { products, updateProductInCart } = useOutletContext();
  const { keyword } = useParams();

  // Filter products based on the keyword (assuming keyword matches a category or similar logic)
  const filteredProducts = products.filter(
    (product) => product.category.toLowerCase() === keyword.toLowerCase()
  );

  return (
      <div className={styles.cardsContainer}>
        {filteredProducts.map((product) => (
          <ProductCard
            updateProductInCart={updateProductInCart}
            key={product.id}
            product={product}
          />
        ))}
      </div>
  );
}

export function Home() {
  const { products, updateProductInCart } = useOutletContext();
  const [trendingProducts, setTrendingProducts] = useState([]);

  useEffect(() => {
    // Get random items based on current date
    const getRandomProducts = (products, num) => {
      const now = new Date();
      const seed =
        now.getFullYear() * 10000 + (now.getMonth() + 1) * 100 + now.getDate();

      const shuffled = [...products].sort((a, b) => {
        const randomA = Math.sin(seed + a.id) * 10000;
        const randomB = Math.sin(seed + b.id) * 10000;
        return randomA - randomB;
      });

      return shuffled.slice(0, num);
    };

    if (products.length > 0) {
      setTrendingProducts(getRandomProducts(products, 4));
    }
  }, [products]);

  return (
    <div className={styles.cardsContainer}>
      {trendingProducts.map((product) => (
        <ProductCard
          updateProductInCart={updateProductInCart}
          key={product.id}
          product={product}
        />
      ))}
    </div>
  );
}
