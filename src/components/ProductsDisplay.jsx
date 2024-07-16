import { useOutletContext, useParams } from "react-router-dom";
import styles from "./ProductsDisplay.module.css";
import ProductCard from "./ProductCard";

export function Category() {
  const { products } = useOutletContext();
  const { keyword } = useParams();

  // Filter products based on the keyword (assuming keyword matches a category or similar logic)
  const filteredProducts = products.filter((product) =>
    product.category.toLowerCase() === keyword.toLowerCase()
  );

  return (
    <div className={styles.container}>
      <div className={styles.titleContainer}>
        <h1 className={styles.title}>{keyword}</h1>
      </div>
      <div className={styles.cardsContainer}>
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export function Home() {
  const { products } = useOutletContext();

  const getRandomProducts = (products, num) => {
    const shuffled = products.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, num);
  };

  const trendingProducts = getRandomProducts(products, 4);

  return (
    <div className={styles.container}>
      <div className={styles.titleContainer}>
        <h1 className={styles.title}>Trending Items</h1>
      </div>
      <div className={styles.cardsContainer}>
        {trendingProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
