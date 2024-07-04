import { useState, useEffect } from "react";
import Header from "./components/Header";

export default function App() {

  /* LIGHT/DARK MODE STUFF */
  const [mode, setMode] = useState("light");

  useEffect(() => {
    const userPrefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    if (userPrefersDark) {
      setMode("dark");
    }
  }, []);

  useEffect(() => {
    document.documentElement.className = mode;
  }, [mode]);

  /* --------------------- */
  return (
    <div>
      <Header mode={mode} setMode={setMode} />{" "}
    </div>
  );
}
