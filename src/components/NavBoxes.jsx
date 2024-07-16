import { Link } from "react-router-dom";
import styles from "./NavBoxes.module.css";

import ClothesIcon from "../assets/men-clothing.svg?react";
import ClothesIcon2 from "../assets/women-clothing.svg?react";
import ElectronisIcon from "../assets/electronics.svg?react";
import JeweleryIcon from "../assets/jewelry.svg?react";

export function NavBoxes() {
  return (
    <ul className={styles.categories}>
      <Link to="/category/Jewelery">
        <JeweleryIcon style={{ transform: "scale(1.2)" }} />
        <p>Jewelery</p>
      </Link>
      <Link to="/category/Electronics">
        <ElectronisIcon style={{ transform: "scale(1.4)" }} />
        <p>Electronics</p>
      </Link>
      <Link to="/category/Men's Clothing">
        <ClothesIcon style={{ transform: "scale(1.6)" }} />
        <p>Men&apos;s Clothing</p>
      </Link>
      <Link to="/category/Women's Clothing">
        <ClothesIcon2 style={{ transform: "scale(1.6)" }} />
        <p>Women&apos;s Clothing</p>
      </Link>
    </ul>
  );
}
