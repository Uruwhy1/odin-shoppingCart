import MoonIcon from "../assets/moon.svg?react";
import SunIcon from "../assets/sun.svg?react";
import styles from "./ModeToggle.module.css";

import PropTypes from 'prop-types'

export default function ModeToggle({ mode, setMode }) {
  const toggleMode = () => {
    setMode(prevMode => (prevMode === "dark" ? "light" : "dark"));
  };

  return (
    <div
      className={`${styles.modeToggle} ${styles[mode]}`}
      onClick={toggleMode}
    >
      <MoonIcon className={mode === "dark" ? styles.lightUp : ""} />
      <p>|</p>
      <SunIcon className={mode === "light" ? styles.lightUp : ""} />
    </div>
  );
}

ModeToggle.propTypes = {
  mode: PropTypes.string.isRequired,
  setMode: PropTypes.func.isRequired
};