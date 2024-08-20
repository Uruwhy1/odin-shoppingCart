import { useState } from "react";
import ProductCardCart from "./CartProduct";
import styles from "./Cart.module.css";
import PropTypes from "prop-types";

export default function Cart({
  products,
  removeProductInCart,
  updateProductInCart,
}) {
  const [sortCriteria, setSortCriteria] = useState("title"); // Default sort by title
  const [sortDirection, setSortDirection] = useState("asc"); // Default ascending order

  const filteredProducts = products.filter((product) => product.inCart > 0);

  const handleSort = (criteria) => {
    if (sortCriteria === criteria) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortCriteria(criteria);
      setSortDirection("asc");
    }
  };

  const compareProducts = (productA, productB) => {
    let valueA = productA[sortCriteria];
    let valueB = productB[sortCriteria];

    if (sortCriteria == "total") {
      valueA = productA.price * productA.inCart;
      valueB = productB.price * productB.inCart;
    }

    if (sortDirection === "asc") {
      return valueA > valueB;
    } else {
      return valueA < valueB;
    }
  };

  const sortedProducts = [...filteredProducts].sort(compareProducts);

  return (
    <div className={styles.container}>
      <h1 className={styles.titleContainer}>Shopping Cart</h1>
      <table className={styles.cartTable}>
        <thead>
          <tr>
            <th>IMAGE</th>
            <th
              onClick={() => handleSort("title")}
              className={
                styles.sortable +
                " " +
                (sortCriteria == "title" && styles.active)
              }
            >
              TITLE
              <span className={styles.arrow}>
                {sortCriteria === "title" &&
                  (sortDirection === "asc" ? " ▲" : " ▼")}
              </span>
            </th>
            <th
              onClick={() => handleSort("price")}
              className={
                styles.sortable +
                " " +
                (sortCriteria == "price" && styles.active)
              }
            >
              PRICE
              <span className={styles.arrow}>
                {sortCriteria === "price" &&
                  (sortDirection === "asc" ? " ▲" : " ▼")}
              </span>
            </th>
            <th
              onClick={() => handleSort("inCart")}
              className={
                styles.sortable +
                " " +
                (sortCriteria == "inCart" && styles.active)
              }
            >
              QUANTITY
              <span className={styles.arrow}>
                {sortCriteria === "inCart" &&
                  (sortDirection === "asc" ? " ▲" : " ▼")}
              </span>
            </th>
            <th
              onClick={() => handleSort("total")}
              className={
                styles.sortable +
                " " +
                (sortCriteria == "total" && styles.active)
              }
            >
              TOTAL
              <span className={styles.arrow}>
                {sortCriteria === "total" &&
                  (sortDirection === "asc" ? " ▲" : " ▼")}
              </span>
            </th>
            <th>ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          {sortedProducts.map((product) => (
            <ProductCardCart
              key={product.id}
              product={product}
              updateProductInCart={updateProductInCart}
              removeProductInCart={removeProductInCart}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

Cart.propTypes = {
  products: PropTypes.array.isRequired,
  removeProductInCart: PropTypes.func.isRequired,
  updateProductInCart: PropTypes.func.isRequired,
};
