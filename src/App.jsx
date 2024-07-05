import { useState, useEffect } from "react";
import Header from "./components/Header";
import { Outlet } from "react-router-dom";

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
    <div className="container">
      <Header mode={mode} setMode={setMode} />{" "}
      <Outlet />
    </div>
  );
}
