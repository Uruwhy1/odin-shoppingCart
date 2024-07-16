import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <div className={styles.container}>
      <p>
        <a href="https://github.com/Uruwhy1/odin-shoppingCart">Github</a> | <a href="https://www.theodinproject.com/lessons/node-path-react-new-shopping-cart">The Odin Project</a>
      </p>
    </div>
  );
}
