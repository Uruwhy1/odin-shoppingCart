import { Link } from "react-router-dom";
import styles from "./Home.module.css";

import SunIcon from '../assets/sun.svg?react'

export default function Home() {
  return (
    <div className="full-page">
        <ul className={styles.categories}>
          <li>
            <SunIcon />
            <Link to="/">Jewelery</Link>
          </li>
          <li>
          <SunIcon />

            <Link to="/category/technology">Electronics</Link>
          </li>
          <li>
          <SunIcon />

            <Link to="/category/science">Men&apos; Clothing</Link>
          </li>
          <li>
          <SunIcon />
            <Link to="/category/health">Women&apos;s Clothing</Link>
          </li>
        </ul>
      <Link to="/about">About</Link>{" "}
    </div>
  );
}
