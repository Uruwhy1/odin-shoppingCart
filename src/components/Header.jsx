import styles from "./Header.module.css";

import storeLogoLight from "../assets/store-white.png";
import storeLogoDark from "../assets/store-dark.png";

import ShoppingCart from "../assets/shopping-cart.svg?react";
import ModeToggle from "./ModeToggle";

import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export default function Header({ mode, setMode }) {
  return (
    <div className={styles.container + " header"}>
      <ModeToggle mode={mode} setMode={setMode} />
      <div className={styles.content}>
        <Link to="/">
          <img
            className={styles.logo}
            src={mode == "light" ? storeLogoLight : storeLogoDark}
            alt="Store Logo"
          />
        </Link>

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

Header.propTypes = {
  mode: PropTypes.string.isRequired,
  setMode: PropTypes.func.isRequired,
};
