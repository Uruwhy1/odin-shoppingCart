import PropTypes from "prop-types";
import styles from "./CartProduct.module.css";

const MAX_TITLE_LENGTH = 65;

export default function ProductCardCart({
  product,
  removeProductInCart,
  updateProductInCart,
}) {
  // Function to truncate the title if it exceeds the maximum length
  const truncateTitle = (title, maxLength) => {
    if (title.length > maxLength) {
      return title.slice(0, maxLength) + "...";
    }
    return title;
  };

  return (
    <tr className={styles.row}>
      <td className={styles.imageCell}>
        <img src={product.image} alt={product.title} className={styles.image} />
      </td>
      <td className={styles.titleCell}>
        <h3 className={styles.title}>
          {truncateTitle(product.title, MAX_TITLE_LENGTH)}
        </h3>
        <div className={styles.ratingContainer}>
          <StarRating rate={product.rating.rate} />
          <span> ({product.rating.count} reviews)</span>
        </div>
      </td>
      <td className={styles.priceCell}>${product.price}</td>
      <td className={styles.quantityCell}>{product.inCart}</td>
      <td className={styles.totalCell}>
        ${(product.price * product.inCart).toFixed(2)}
      </td>
      <td className={styles.actionsCell}>
        <div>
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
      </td>
    </tr>
  );
}

ProductCardCart.propTypes = {
  product: PropTypes.object.isRequired,
  removeProductInCart: PropTypes.func.isRequired,
  updateProductInCart: PropTypes.func.isRequired,
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
  return <div className={styles.starContainer}>{stars}</div>;
}

StarRating.propTypes = {
  rate: PropTypes.number.isRequired,
};
