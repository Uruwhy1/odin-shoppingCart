import { useState } from "react";
import ProductCardCart from "./CartProduct";
import styles from "./Cart.module.css";
import PropTypes from "prop-types";

export default function Cart({
  products,
  removeProductInCart,
  updateProductInCart,
  setProducts,
  setView,
}) {
  const [sortCriteria, setSortCriteria] = useState("title");
  const [sortDirection, setSortDirection] = useState("asc");

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

  const handleBuyItems = () => {
    alert("Purchase successful!");
    handleClearCart();
  };

  const handleClearCart = () => {
    setProducts((prevProducts) =>
      prevProducts.map((product) => ({ ...product, inCart: 0 }))
    );
    setView("buy");
  };

  const totalCost = filteredProducts.reduce(
    (total, product) => total + product.price * product.inCart,
    0
  );

  return (
    <div className={styles.container}>
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
      <p className={styles.total}>Total: ${totalCost.toFixed(2)}</p>
      <div className={styles.buttons}>
        <button onClick={handleBuyItems}>Order Items</button>
        <button onClick={handleClearCart}>Clear Cart</button>
      </div>
    </div>
  );
}

Cart.propTypes = {
  products: PropTypes.array.isRequired,
  removeProductInCart: PropTypes.func.isRequired,
  updateProductInCart: PropTypes.func.isRequired,
  setProducts: PropTypes.func.isRequired,
  setView: PropTypes.func.isRequired,
};
