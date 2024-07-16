import PropTypes from "prop-types";
import styles from "./ProductCard.module.css";

const MAX_TITLE_LENGTH = 45;
// ProductCard.jsx
export default function ProductCard({ product }) {
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
        <button className={styles.buyButton}>BUY</button>
      </div>
    </div>
  );
}

ProductCard.propTypes = {
  product: PropTypes.object.isRequired,
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
  rate: PropTypes.string.isRequired
}
