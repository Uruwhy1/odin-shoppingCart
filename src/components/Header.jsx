import styles from "./Header.module.css";

import storeLogoLight from "../assets/store-white.png";
import storeLogoDark from "../assets/store-dark.png";

import ShoppingCart from "../assets/shopping-cart.svg?react";
import ModeToggle from "./ModeToggle";

import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Header({ mode, setMode, setView }) {
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setViewportWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const getImageSrc = () => {
    if (viewportWidth <= 1000 && mode == "light") {
      return storeLogoDark;
    } else if (viewportWidth <= 1000 && mode == "dark") {
      return storeLogoLight;
    }
    return mode === "light" ? storeLogoLight : storeLogoDark;
  };

  return (
    <div className={styles.container + " header"}>
      <div className={styles.content}>
        <Link to="/">
          <img
            className={styles.logo}
            src={getImageSrc()}
            alt="Store Logo"
            onClick={() => setView("buy")}
          />
        </Link>
        <ModeToggle mode={mode} setMode={setMode} />

        <div className={styles.options}>
          <button onClick={() => setView("cart")} className={styles.cart}>
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
  setView: PropTypes.func.isRequired,
};
