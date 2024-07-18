import PropTypes from "prop-types";
import styles from "./CartSmallProduct.module.css";

const MAX_TITLE_LENGTH = 45;

export default function CartSmallProduct({
  product,
  updateProductInCart,
  removeProductInCart,
}) {
  // Function to truncate the title if it exceeds the maximum length
  const truncateTitle = (title, maxLength) => {
    if (title.length > maxLength) {
      return title.slice(0, maxLength) + "...";
    }
    return title;
  };

  return (
    <div className={styles.card}>
      <img src={product.image} alt={product.title} className={styles.image} />
      <div className={styles.content}>
        <h3 className={styles.title}>
          {truncateTitle(product.title, MAX_TITLE_LENGTH)}
        </h3>
        <div className={styles.ratingContainer}>
          <StarRating rate={product.rating.rate} />
          <span> ({product.rating.count} reviews)</span>
        </div>
      </div>
      <div className={styles.buyContainer}>
        <p className={styles.price}>${product.price}</p>
        {product.inCart > 0 && (
          <span className={styles.inCart}>In Cart: {product.inCart}</span>
        )}
        <button
            onClick={() => {
              removeProductInCart(product.id);
            }}
            className={styles.removeButton + " " + styles.button}
          >
            🗑️
          </button>
          <button
            onClick={() => {
              updateProductInCart(product.id);
            }}
            className={styles.addButton + " " + styles.button}
          >
            ➕
          </button>
      </div>
    </div>
  );
}

CartSmallProduct.propTypes = {
  product: PropTypes.object.isRequired,
  updateProductInCart: PropTypes.func.isRequired,
  removeProductInCart: PropTypes.func.isRequired,
};

function StarRating({ rate }) {
  // Round the rating to nearest half-star
  const roundedRating = Math.round(rate * 2) / 2;
  // Create an array of 5 stars
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (roundedRating >= i) {
      stars.push(
        <span key={i} className={styles.checked + " " + styles.star}>
          ★
        </span>
      );
    } else {
      stars.push(
        <span className={styles.star} key={i}>
          ★
        </span>
      ); // empty star
    }
  }
  return <p>{stars}</p>;
}

StarRating.propTypes = {
  rate: PropTypes.number.isRequired,
};
