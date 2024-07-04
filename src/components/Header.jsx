import styles from "./Header.module.css";

import storeLogoLight from "../assets/store-white.png";
import storeLogoDark from "../assets/store-dark.png";

import ShoppingCart from "../assets/shopping-cart.svg?react";
import ModeToggle from "./ModeToggle";

export default function Header({mode, setMode}) {
  const root = document.querySelector("html");



  return (
    <div className={styles.container}>
      <ModeToggle mode={mode} setMode={setMode} />
      <div className={styles.content}>
        <img
          className={styles.logo}
          src={root.classList.contains("dark") ? storeLogoLight : storeLogoDark}
          alt="Store Logo"
        />
        <div className={styles.options}>
          <button className={styles.cart}>
            <ShoppingCart />
          </button>
          <button className={styles.logIn}>Log In</button>
        </div>
      </div>
    </div>
  );
}
