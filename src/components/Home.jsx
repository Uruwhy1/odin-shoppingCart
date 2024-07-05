import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="full-page">
      <h1>Home Page</h1>
      <Link to="/about">About</Link>{" "}
    </div>
  );
}
